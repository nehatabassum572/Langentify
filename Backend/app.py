from flask import Flask, request, jsonify, render_template
import pickle
import os

app = Flask(__name__,
          template_folder="../Frontend/templates",
          static_folder="../Frontend/static")
# Load model
MODEL_PATH = os.path.join('Backend', 'model', 'language_detector_pipeline.pkl')
with open(MODEL_PATH, 'rb') as f:
    pipeline = pickle.load(f)

# Homepage (serves frontend)
@app.route('/')
def home():
    return render_template('index.html')

# API endpoint for predictions
@app.route('/predict', methods=['POST'])
def predict():
    text = request.json.get('text', '')
    lang = pipeline.predict([text])[0]
    proba = pipeline.predict_proba([text]).max()
    return jsonify({
        'language': str(lang),
        'confidence': float(proba)
    })

if __name__ == '__main__':
    app.run(debug=True)