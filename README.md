# AllConV - All-in-One Converter

AllConV is a full-stack application designed to provide versatile file conversion capabilities. It features a Python backend built with FastAPI for robust processing and a modern React frontend styled with Tailwind CSS for an intuitive user experience.

## Features

- **Frontend:**
  - Modern, responsive user interface built with React.
  - Styled using Tailwind CSS for a sleek and customizable design.
  - Interactive file upload and conversion status display.
  - Supports multiple themes (Light, Dark, Neon, Glass, Amoled).

- **Backend:**
  - High-performance API developed with FastAPI (Python).
  - Handles various file conversion tasks (e.g., PDF to DOCX).
  - Secure and efficient processing of user requests.

## Technologies Used

### Frontend

- **React:** A JavaScript library for building user interfaces.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **Craco:** For easy configuration of Create React App.
- **Framer Motion:** For animations.

### Backend

- **Python:** The primary programming language.
- **FastAPI:** A modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints.
- **Pydantic:** Data validation and settings management using Python type hints.
- **python-docx:** For creating and updating Microsoft Word (.docx) files.
- **PyMuPDF (fitz):** For working with PDF documents.

## Project Structure

```
.
├── backend/
│   ├── main.py             # FastAPI application entry point
│   ├── requirements.txt    # Python dependencies
│   ├── output/             # Stores converted output files
│   └── temp/               # Stores temporary files during conversion
├── frontend/
│   ├── allconv-ui/         # React application source code
│   │   ├── public/         # Static assets
│   │   ├── src/            # React components, styles, etc.
│   │   ├── craco.config.js # CRACO configuration
│   │   ├── package.json    # Frontend dependencies and scripts
│   │   └── tailwind.config.js # Tailwind CSS configuration
│   └── package.json        # Frontend workspace dependencies (if applicable)
├── .gitignore              # Specifies intentionally untracked files to ignore
└── tailwind.config.js      # (Moved to frontend/allconv-ui/tailwind.config.js)
```

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

- Node.js (LTS recommended)
- npm or Yarn
- Python 3.8+
- pip

### 1. Clone the repository

```bash
git clone https://github.com/Harsha754-ml/ConvHarsh.git
cd ConvHarsh
```

### 2. Backend Setup

Navigate to the `backend` directory, create a virtual environment, install dependencies, and run the FastAPI application.

```bash
cd backend
python -m venv venv
./venv/Scripts/activate # On Windows
source venv/bin/activate # On macOS/Linux
pip install -r requirements.txt
uvicorn main:app --reload
```
The backend API will be available at `http://127.0.0.1:8000`.

### 3. Frontend Setup

In a new terminal, navigate to the `frontend/allconv-ui` directory, install dependencies, and start the React development server.

```bash
cd frontend/allconv-ui
npm install # or yarn install
npm start   # or yarn start
```
The frontend application will typically open in your browser at `http://localhost:3000`.

## Usage

Once both the backend and frontend servers are running:
1.  Open your web browser and navigate to `http://localhost:3000`.
2.  Use the intuitive UI to upload files and select your desired conversion options.
3.  The converted files will be processed by the backend and available for download through the frontend.

## Contributing

Contributions are welcome! Please feel free to fork the repository, make changes, and submit pull requests.

## License

[Specify your license here, e.g., MIT License]

## Contact

[Your Name/Email/GitHub Profile]
