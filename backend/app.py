from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import os
from werkzeug.utils import secure_filename
from utils.data_processor import DataProcessor
from utils.model_trainer import ModelTrainer

app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = "/tmp/uploads"
ALLOWED_EXTENSIONS = {'csv', 'xlsx', 'xls'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/")
def home():
    return {"status": "ok", "message": "Backend is running"}

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        try:
            # Read file
            if filename.endswith('.csv'):
                df = pd.read_csv(filepath)
            else:
                df = pd.read_excel(filepath)
            
            # Basic info
            info = {
                'rows': len(df),
                'columns': len(df.columns),
                'column_names': df.columns.tolist(),
                'preview': df.head().to_dict('records'),
                'dtypes': df.dtypes.astype(str).to_dict()
            }
            
            return jsonify({'success': True, 'data': info, 'filepath': filepath})
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    return jsonify({'error': 'Invalid file type'}), 400

@app.route('/preprocess', methods=['POST'])
def preprocess_data():
    data = request.json
    filepath = data.get('filepath')
    method = data.get('method')
    columns = data.get('columns', [])
    
    try:
        processor = DataProcessor(filepath)
        processed_df = processor.apply_preprocessing(method, columns)
        processed_path = filepath.replace('.', '_processed.')
        processed_df.to_csv(processed_path, index=False)
        
        return jsonify({
            'success': True,
            'processed_path': processed_path,
            'preview': processed_df.head().to_dict('records')
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/split', methods=['POST'])
def split_data():
    data = request.json
    filepath = data.get('filepath')
    test_size = data.get('test_size', 0.2)
    target_column = data.get('target_column')
    
    try:
        processor = DataProcessor(filepath)
        split_info = processor.train_test_split(test_size, target_column)
        
        return jsonify({'success': True, 'split': split_info})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/train', methods=['POST'])
def train_model():
    data = request.json
    model_name = data.get('model_name')
    train_path = data.get('train_path')
    test_path = data.get('test_path')
    target_column = data.get('target_column')
    
    try:
        trainer = ModelTrainer()
        results = trainer.train_model(model_name, train_path, test_path, target_column)
        
        return jsonify({'success': True, 'results': results})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run()