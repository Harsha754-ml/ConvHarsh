import os
import uuid
import subprocess
from pathlib import Path

from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from starlette.background import BackgroundTask
import fitz
from docx import Document

app = FastAPI(title="AllConV Backend")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

BASE = Path(__file__).resolve().parent
TEMP = BASE / "temp"
OUT  = BASE / "output"

TEMP.mkdir(exist_ok=True)
OUT.mkdir(exist_ok=True)

VIDEO_EXT = {".mp4", ".mkv", ".mov", ".avi", ".webm", ".flv"}
AUDIO_EXT = {".mp3", ".wav", ".aac", ".ogg", ".m4a", ".flac"}
IMG_EXT   = {".png", ".jpg", ".jpeg", ".webp", ".bmp", ".tiff"}
PDF_EXT   = {".pdf"}

def run(cmd):
    print("RUN:", " ".join(cmd))
    p = subprocess.run(cmd, capture_output=True, text=True)
    return p.returncode == 0, p.stderr

def convert_pdf_to_docx(src, dst):
    try:
        pdf = fitz.open(str(src))
        doc = Document()

        for page in pdf:
            text = page.get_text()
            doc.add_paragraph(text if text.strip() else "[Page contains images only]")
        doc.save(str(dst))
        pdf.close()
        return True, ""
    except Exception as e:
        return False, str(e)

@app.post("/convert")
async def convert_endpoint(
    file: UploadFile = File(...),
    target: str = Form(...),
    use_gpu: bool = Form(True)
):
    uid = uuid.uuid4().hex
    src_ext = Path(file.filename).suffix.lower()
    original_filename = Path(file.filename).stem

    src_path = TEMP / f"{uid}{src_ext}"
    dst_path = None # Initialize dst_path

    try:
        with open(src_path, "wb") as f:
            f.write(await file.read())

        target = target.lstrip(".").lower()
        target_ext = f".{target}"
        dst_path = OUT / f"{uid}.{target}"

        ok, err = False, ""

        # VIDEO/AUDIO
        if src_ext in VIDEO_EXT or src_ext in AUDIO_EXT:
            cmd = ["ffmpeg", "-i", str(src_path)]
            if target_ext in AUDIO_EXT:
                cmd.extend(["-vn"])
                audio_codecs = {".mp3": "libmp3lame", ".aac": "aac", ".flac": "flac", ".ogg": "libvorbis", ".wav": "pcm_s16le", ".m4a": "aac"}
                codec = audio_codecs.get(target_ext)
                if codec:
                    cmd.extend(["-c:a", codec])
            elif target_ext in VIDEO_EXT:
                if use_gpu:
                    cmd.extend(["-hwaccel", "cuda", "-c:v", "h264_nvenc"])
                else:
                    cmd.extend(["-c:v", "libx264"])
                cmd.extend(["-c:a", "aac"])
            
            cmd.extend(["-y", str(dst_path)])
            ok, err = run(cmd)

        # IMAGES
        elif src_ext in IMG_EXT:
            ok, err = run(["magick", str(src_path), str(dst_path)])

        # PDF → DOCX
        elif src_ext in PDF_EXT and target == "docx":
            ok, err = convert_pdf_to_docx(src_path, dst_path)

        else:
            return JSONResponse(
                status_code=400,
                content={"error": f"Unsupported conversion: {src_ext} → .{target}"}
            )

        if not ok:
            return JSONResponse(status_code=500, content={"error": err})
        
        download_filename = f"{original_filename}.{target}"
        # Use BackgroundTask to delete the file after sending the response
        return FileResponse(
            str(dst_path), 
            filename=download_filename,
            background=BackgroundTask(os.remove, str(dst_path))
        )

    except Exception as e:
        # Generic catch-all for other errors
        return JSONResponse(status_code=500, content={"error": str(e)})

    finally:
        # Cleanup source and destination files in case of error or completion
        if src_path.exists():
            os.remove(src_path)
        # The destination file is handled by BackgroundTask on success,
        # but we should clean it up if an error occurs before the response is sent.
        if 'ok' in locals() and not ok and dst_path and dst_path.exists():
             os.remove(dst_path)
