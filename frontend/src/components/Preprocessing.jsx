import React, { useState } from 'react';
import axios from 'axios';

const Preprocessing = ({ columns, filepath, onComplete }) => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleMethodChange = (e) => {
    setSelectedMethod(e.target.value);
  };

  const handleColumnToggle = (column) => {
    if (selectedColumns.includes(column)) {
      setSelectedColumns(selectedColumns.filter(col => col !== column));
    } else {
      setSelectedColumns([...selectedColumns, column]);
    }
  };

  const handleApplyPreprocessing = async () => {
    if (!selectedMethod) {
      alert('Please select a preprocessing method');
      return;
    }

    if (selectedColumns.length === 0) {
      alert('Please select at least one column');
      return;
    }

    setIsProcessing(true);
    try {
      const response = await axios.post('http://localhost:5000/preprocess', {
        filepath: filepath,
        method: selectedMethod,
        columns: selectedColumns
      });

      if (response.data.success) {
        alert('Preprocessing applied successfully!');
        onComplete(response.data);
      } else {
        alert('Preprocessing failed: ' + response.data.error);
      }
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSkip = () => {
    onComplete({ skipped: true });
  };

  return (
    <div className="preprocessing-container">
      <h3>Step 2: Data Preprocessing</h3>
      <p className="subtitle">Apply preprocessing techniques to your data (Optional)</p>
      
      <div className="form-group">
        <label>Select Preprocessing Method:</label>
        <div className="method-options">
          <div className="method-option">
            <input
              type="radio"
              id="standardization"
              name="method"
              value="standardization"
              checked={selectedMethod === 'standardization'}
              onChange={handleMethodChange}
            />
            <label htmlFor="standardization">
              <strong>Standardization (Z-score)</strong>
              <p>Transforms data to have mean=0 and std=1</p>
            </label>
          </div>
          
          <div className="method-option">
            <input
              type="radio"
              id="normalization"
              name="method"
              value="normalization"
              checked={selectedMethod === 'normalization'}
              onChange={handleMethodChange}
            />
            <label htmlFor="normalization">
              <strong>Normalization (Min-Max)</strong>
              <p>Scales data to range [0, 1]</p>
            </label>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>Select Columns to Process:</label>
        <div className="columns-selection">
          {columns.map((column, index) => (
            <div key={index} className="column-checkbox">
              <input
                type="checkbox"
                id={`col-${index}`}
                checked={selectedColumns.includes(column)}
                onChange={() => handleColumnToggle(column)}
              />
              <label htmlFor={`col-${index}`}>{column}</label>
            </div>
          ))}
        </div>
        <small className="hint">
          Only select numerical columns. Selected: {selectedColumns.length} column(s)
        </small>
      </div>

      <div className="preview-info">
        <h4>Preprocessing Summary:</h4>
        {selectedMethod && (
          <div className="summary">
            <p><strong>Method:</strong> {selectedMethod === 'standardization' ? 'Standardization (Z-score)' : 'Normalization (Min-Max)'}</p>
            <p><strong>Columns to process:</strong> {selectedColumns.join(', ') || 'None selected'}</p>
          </div>
        )}
      </div>

      <div className="action-buttons">
        <button onClick={handleSkip} className="skip-btn">
          Skip Preprocessing
        </button>
        <button 
          onClick={handleApplyPreprocessing} 
          disabled={isProcessing || !selectedMethod || selectedColumns.length === 0}
          className="apply-btn"
        >
          {isProcessing ? 'Processing...' : 'Apply Preprocessing'}
        </button>
      </div>
    </div>
  );
};

export default Preprocessing;