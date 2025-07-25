# Langentify
Langentify is a production-ready language detection engine that instantly identifies texts across 16 languages. It combines optimized feature extraction with a lightweight model architecture for fast, accurate predictions in web applications.

## Overview
A machine learning-powered web application that detects the language of input text across **16 languages** with **95% accuracy**. The system consists of:
- Custom-trained language identification model 
- Flask REST API backend
- Interactive frontend with real-time validation

**Supported Languages**: English, Portuguese, French, Dutch, Spanish, Russian, Danish, Italian, Turkish, Swedish, German, Arabic, Malayalam, Kannada, Tamil, Greek

## Technical Stack
- **Backend**: Python, Flask, Scikit-learn
- **Frontend**: HTML, CSS, JavaScript
- **Deployment**: Docker, Gunicorn
- **Model**: https://github.com/nehatabassum572/Language-Detection-using-ML

## Installation

### Prerequisites
- Python 3.8+
- Node.js (for frontend)
- Docker (optional)

### Steps
1. **Clone this repository**:
   ```bash
   git clone https://github.com/yourusername/language-detection-webapp.git
   cd language-detection-webapp
    ```

2. **Set up Python environment**:
    ```bash
    python -m venv venv
    source venv/bin/activate  # Linux/Mac
    venv\Scripts\activate    # Windows
    pip install -r requirements.txt
     ```
3. **Run the application**:
    ```bash
   flask run
   Access at: http://localhost:5000
     ```
## Usage
1. Type or paste text into the input box (max 200 words)
2. Click "Detect Language"
3. View results with confidence score
   
## Model Details
The language detection model is developed separately and available in:
https://github.com/nehatabassum572/Language-Detection-using-ML
