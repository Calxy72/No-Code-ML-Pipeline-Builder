# No-Code ML Pipeline Builder

A web-based, no-code Machine Learning pipeline builder that allows users to create and run simple ML workflows without writing any code.

## ✨ Features

- **Dataset Upload**: Upload CSV or Excel files
- **Data Preprocessing**: Apply standardization or normalization
- **Train-Test Split**: Split dataset with customizable ratios
- **Model Selection**: Choose between Logistic Regression and Decision Tree
- **Visual Results**: View accuracy metrics and visualizations
- **Pipeline Flow**: Step-by-step visual pipeline builder

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- Python 3.8+
- Git

### Installation

1. **Clone the repository**

```bash
    git clone https://github.com/yourusername/no-code-ml-builder.git
    cd no-code-ml-builder

    cd backend
    python -m venv venv

    # Windows
    venv\Scripts\activate
    # Mac/Linux
    source venv/bin/activate

    pip install -r requirements.txt


    cd ../frontend
    npm install


    # Terminal 1: Start backend
    cd backend
    python app.py

    # Terminal 2: Start frontend
    cd frontend
    npm run dev

    no-code-ml-builder/
    ├── frontend/
    │   ├── public/
    │   │   ├── index.html
    │   │   └── favicon.ico
    │   ├── src/
    │   │   ├── components/
    │   │   │   ├── FileUpload.jsx
    │   │   │   ├── DataPreview.jsx
    │   │   │   ├── Preprocessing.jsx
    │   │   │   ├── TrainTestSplit.jsx
    │   │   │   ├── ModelSelection.jsx
    │   │   │   ├── Results.jsx
    │   │   │   └── PipelineFlow.jsx
    │   │   ├── pages/
    │   │   │   └── Builder.jsx
    │   │   ├── App.jsx
    │   │   ├── App.css
    │   │   └── index.js
    │   ├── package.json
    │   └── README.md
    ├── backend/
    │   ├── app.py
    │   ├── requirements.txt
    │   ├── utils/
    │   │   ├── data_processor.py
    │   │   └── model_trainer.py
    │   └── README.md
    ├── .gitignore
    └──README.md
```


## 📦 Dependencies(Backend)

- Flask - Web framework
- Flask-CORS - Cross-origin support
- Pandas - Data manipulation
- Scikit-learn - Machine learning
- NumPy - Numerical operations
- Openpyxl - Excel file support

## 🚀 Running the Server

```bash
# Install dependencies
pip install -r requirements.txt

# Run the server
python app.py

# Server runs on http://localhost:5000
```


## 📦 Dependencies(Frontend)

- React 18
- Axios - HTTP client
- React Dropzone - File uploads
- Chart.js - Data visualization
- React Chart.js 2 - Chart.js React wrapper

## 🚀 Development

```bash
npm install          # Install dependencies
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
```


# Citation

If you use this in your work, please cite:

Demand Prediction System with XGBoost. (2024). GitHub Repository.

# Contact

For questions or issues, please open an issue on the GitHub repository.

