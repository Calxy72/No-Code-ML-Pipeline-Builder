import React, { useState } from 'react';
import axios from 'axios';

const TrainTestSplit = ({ columns, filepath, onComplete }) => {
  const [testSize, setTestSize] = useState(0.2);
  const [targetColumn, setTargetColumn] = useState('');
  const [isSplitting, setIsSplitting] = useState(false);

  const handleTestSizeChange = (e) => {
    setTestSize(parseFloat(e.target.value));
  };

  const handleTargetChange = (e) => {
    setTargetColumn(e.target.value);
  };

  const handleSplitData = async () => {
    if (!targetColumn) {
      alert('Please select a target column');
      return;
    }

    setIsSplitting(true);
    try {
      const response = await axios.post('http://localhost:5000/split', {
        filepath: filepath,
        test_size: testSize,
        target_column: targetColumn
      });

      if (response.data.success) {
        // Store target column for later use
        localStorage.setItem('targetColumn', targetColumn);
        alert(`Data split successfully! Training: ${response.data.split.train_size} samples, Testing: ${response.data.split.test_size} samples`);
        onComplete(response.data.split);
      } else {
        alert('Split failed: ' + response.data.error);
      }
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setIsSplitting(false);
    }
  };

  return (
    <div className="split-container">
      <h3>Step 3: Train-Test Split</h3>
      <p className="subtitle">Split your data into training and testing sets</p>
      
      <div className="split-options">
        <div className="form-group">
          <label htmlFor="testSize">Test Set Size: <strong>{Math.round(testSize * 100)}%</strong></label>
          <input
            type="range"
            id="testSize"
            min="0.1"
            max="0.5"
            step="0.05"
            value={testSize}
            onChange={handleTestSizeChange}
          />
          <div className="slider-labels">
            <span>10%</span>
            <span>30%</span>
            <span>50%</span>
          </div>
          <small className="hint">
            Training set: {Math.round((1 - testSize) * 100)}% ({Math.round((1 - testSize) * 100)} samples per 100)
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="targetColumn">Select Target Column:</label>
          <select
            id="targetColumn"
            value={targetColumn}
            onChange={handleTargetChange}
          >
            <option value="">-- Select a column --</option>
            {columns.map((column, index) => (
              <option key={index} value={column}>
                {column}
              </option>
            ))}
          </select>
          <small className="hint">
            The target column is what you want to predict
          </small>
        </div>
      </div>

      <div className="split-visualization">
        <h4>Split Visualization:</h4>
        <div className="split-bars">
          <div className="train-bar" style={{ width: `${(1 - testSize) * 100}%` }}>
            <span>Training Set ({Math.round((1 - testSize) * 100)}%)</span>
          </div>
          <div className="test-bar" style={{ width: `${testSize * 100}%` }}>
            <span>Test Set ({Math.round(testSize * 100)}%)</span>
          </div>
        </div>
      </div>

      <div className="split-details">
        <div className="detail-card">
          <div className="detail-label">Training Set</div>
          <div className="detail-value">{Math.round((1 - testSize) * 100)}%</div>
          <div className="detail-desc">Used to train the model</div>
        </div>
        <div className="detail-card">
          <div className="detail-label">Test Set</div>
          <div className="detail-value">{Math.round(testSize * 100)}%</div>
          <div className="detail-desc">Used to evaluate the model</div>
        </div>
      </div>

      <div className="action-buttons">
        <button 
          onClick={handleSplitData} 
          disabled={isSplitting || !targetColumn}
          className="split-btn"
        >
          {isSplitting ? 'Splitting...' : 'Split Data'}
        </button>
      </div>
    </div>
  );
};

export default TrainTestSplit;