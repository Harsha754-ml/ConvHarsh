import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import Logo from './components/Logo';
import { ThemeToggle } from './components/ui/ThemeToggle';
import BackgroundController from './components/background/BackgroundController';
import { GlassCard } from './components/ui/GlassCard';
import { DropZone } from './components/ui/DropZone';
import { AnimatedButton } from './components/ui/AnimatedButton';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { ScrambleText } from './components/ui/ScrambleText';
import { FadeSlideIn } from './components/ui/FadeSlideIn.jsx'; // Corrected extension

const TARGET_FORMATS = {
  video: ["mp4", "mkv", "mov", "avi", "webm"],
  audio: ["mp3", "wav", "aac", "ogg", "flac", "m4a"],
  image: ["png", "jpg", "jpeg", "webp", "bmp", "tiff"],
  document: ["docx"]
};

const EXT_TO_TYPE = {
  '.mp4': 'video', '.mkv': 'video', '.avi': 'video', '.mov': 'video', '.webm': 'video', '.flv': 'video',
  '.mp3': 'audio', '.wav': 'audio', '.aac': 'audio', '.ogg': 'audio', '.m4a': 'audio', '.flac': 'audio',
  '.png': 'image', '.jpg': 'image', '.jpeg': 'image', '.webp': 'image', '.bmp': 'image', '.tiff': 'image',
  '.pdf': 'document'
};

const Header = () => (
  <header className="header flex justify-between items-center px-4 py-3 bg-bg-card backdrop-blur-md border-b border-border-color fixed w-full top-0 z-10 animate-slideDown">
    <div className="flex items-center">
      <Logo />
      <span className="app-title ml-3 text-xl font-bold text-primary tracking-wider font-space-mono">HarshconV</span>
    </div>
    <ThemeToggle />
  </header>
);

const Footer = () => (
  <footer className="footer py-6 text-center text-secondary text-sm border-t border-border-color bg-bg-card backdrop-blur-md mt-auto">
    <p>© 2025 HarshconV - Local Conversion Protocol.</p>
  </footer>
);

function Converter() {
  const [file, setFile] = useState(null);
  const [target, setTarget] = useState('');
  const [useGpu, setUseGpu] = useState(true);
  const [progress, setProgress] = useState(0);
  const [converting, setConverting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const getTargetOptions = useCallback(() => {
    if (!file) return [];
    const fileExt = '.' + file.name.split('.').pop().toLowerCase();
    const fileType = EXT_TO_TYPE[fileExt];

    if (fileType === 'document' && fileExt === '.pdf') return TARGET_FORMATS.document;
    if (fileType) return [...TARGET_FORMATS[fileType]];
    return [];
  }, [file]);
  
  useEffect(() => {
    if (file) {
      setShowDetails(true);
      const options = getTargetOptions();
      setTarget(options[0] || '');
    } else {
      setShowDetails(false);
    }
  }, [file, getTargetOptions]);

  const handleFileChange = (selectedFile) => {
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
      setResult(null);
      setProgress(0);
    }
  };

  const handleConvert = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('target', target);
    formData.append('use_gpu', useGpu);

    setConverting(true);
    setError(null);
    setResult(null);
    setProgress(0);

    try {
      const response = await axios.post('http://127.0.0.1:8000/convert', formData, {
        responseType: 'blob',
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / e.total);
          setProgress(percent < 100 ? percent : 99);
        },
      });

      const blob = new Blob([response.data]);
      const downloadUrl = window.URL.createObjectURL(blob);
      const disposition = response.headers['content-disposition'];
      let filename = `converted.${target}`;
      if (disposition) {
          const match = disposition.match(/filename="?(.+)"?/);
          if (match?.[1]) filename = match[1];
      }
      
      setResult({ url: downloadUrl, name: filename });
      setProgress(100);
    } catch (err) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          setError(JSON.parse(reader.result).error || "Unknown conversion error.");
        } catch {
          setError("Conversion protocol failed.");
        }
      };
      if (err.response?.data) {
        reader.readAsText(err.response.data);
      } else {
        setError("Network link severed.");
      }
    } finally {
      setConverting(false);
    }
  };
  
  return (
    <GlassCard className="max-w-md w-full mx-auto p-6 space-y-6 text-center animate-popIn">
        <DropZone onFileSelected={handleFileChange} />
        
        {showDetails && (
          <FadeSlideIn stagger={0.1} delay={0.2} className="space-y-4">
            <p className="file-info text-secondary text-sm animate-fade-slide-in">Source: <span className="text-primary font-medium">{file?.name}</span></p>
            
            <div className="options-grid grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-slide-in">
              <div className="form-group flex flex-col items-start">
                <label htmlFor="target-format" className="text-secondary text-sm mb-1">Target Format</label>
                <select id="target-format" value={target} onChange={(e) => setTarget(e.target.value)} className="w-full p-2 rounded-md bg-bg-main border border-border-color text-primary focus:ring-2 focus:ring-accent focus:outline-none transition-all duration-200">
                  {getTargetOptions().map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <div className="form-group flex flex-col items-start">
                <label className="text-secondary text-sm mb-1">Hardware Acceleration</label>
                <div className="toggle-switch flex items-center justify-between w-full p-2 rounded-md bg-bg-main border border-border-color">
                  <span className="text-primary text-sm">NVENC Core</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={useGpu} onChange={() => setUseGpu(!useGpu)} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-dark rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                  </label>
                </div>
              </div>
            </div>
            <AnimatedButton onClick={handleConvert} disabled={!file || converting} className="w-full py-3 rounded-md text-lg font-bold">
              {converting ? `Processing... ${progress}%` : 'INITIATE CONVERSION'}
            </AnimatedButton>
          </FadeSlideIn>
        )}

        {converting && <LoadingSpinner className="mt-4" />}
        {error && <div className="error-container mt-4 p-3 rounded-md bg-error/20 text-error border border-error animate-fade-slide-in">Error: {error}</div>}
        {result && (
          <div className="result-container mt-4 flex flex-col items-center animate-fade-slide-in">
            <p className="text-primary mb-2">Conversion Complete.</p>
            <AnimatedButton href={result.url} download={result.name} as="a" className="px-6 py-3 rounded-md font-bold">DOWNLOAD</AnimatedButton>
          </div>
        )}
    </GlassCard>
  );
}

function App() {
  return (
    <div className="App min-h-screen bg-bg-main text-primary">
      <BackgroundController />
      <Header />
      <main className="main-content flex-grow flex flex-col items-center justify-center p-8 pt-24">
        <h1 className="hero-title text-5xl font-extrabold text-primary mb-4 font-space-mono">
          <ScrambleText text="HarshconV" revealSpeed={50} scrambleDuration={2000} delay={500} />
        </h1>
        <p className="hero-subtitle text-lg text-secondary mb-10 max-w-2xl">
          Harnessing local computing power for fast, secure, and entirely private file conversion.
        </p>
        <Converter />
      </main>
      <Footer />
    </div>
  );
}

export default App;