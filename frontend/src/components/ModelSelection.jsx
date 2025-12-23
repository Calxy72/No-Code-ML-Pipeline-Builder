import React, { useState } from 'react';
import axios from 'axios';

const ModelSelection = ({ splitData, targetColumn, onComplete }) => {
  const [selectedModel, setSelectedModel] = useState('');
  const [isTraining, setIsTraining] = useState(false);
  const [modelDetails, setModelDetails] = useState({
    logistic_regression: {
      name: 'Logistic Regression',
      description: 'Linear model for binary classification',
      pros: ['Fast training', 'Good for linearly separable data', 'Provides probability estimates'],
      cons: ['Assumes linear relationship', 'May underfit complex data']
    },
    decision_tree: {
      name: 'Decision Tree',
      description: 'Tree-based model for classification and regression',
      pros: ['Easy to interpret', 'Handles non-linear data', 'No feature scaling needed'],
      cons: ['Prone to overfitting', 'Can be unstable']
    }
  });

  const handleModelSelect = (model) => {
    setSelectedModel(model);
  };

  const handleTrainModel = async () => {
    if (!selectedModel) {
      alert('Please select a model');
      return;
    }

    setIsTraining(true);
    try {
      const response = await axios.post('http://localhost:5000/train', {
        model_name: selectedModel,
        train_path: splitData.train_path,
        test_path: splitData.test_path,
        target_column: targetColumn
      });

      if (response.data.success) {
        alert('Model trained successfully!');
        onComplete(response.data.results);
      } else {
        alert('Training failed: ' + response.data.error);
      }
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setIsTraining(false);
    }
  };

  return (
    <div className="model-selection-container">
      <h3>Step 4: Model Selection & Training</h3>
      <p className="subtitle">Choose a machine learning model to train on your data</p>
      
      <div className="split-info">
        <div className="info-card">
          <div className="info-label">Training Samples</div>
          <div className="info-value">{splitData.train_size}</div>
        </div>
        <div className="info-card">
          <div className="info-label">Testing Samples</div>
          <div className="info-value">{splitData.test_size}</div>
        </div>
        <div className="info-card">
          <div className="info-label">Target Column</div>
          <div className="info-value">{targetColumn}</div>
        </div>
      </div>

      <div className="model-options">
        <div className="model-card">
          <div className="model-header">
            <input
              type="radio"
              id="logistic_regression"
              name="model"
              checked={selectedModel === 'logistic_regression'}
              onChange={() => handleModelSelect('logistic_regression')}
            />
            <label htmlFor="logistic_regression">
              <h4>Logistic Regression</h4>
              <span className="model-type">Linear Classifier</span>
            </label>
          </div>
          <div className="model-body">
            <p>{modelDetails.logistic_regression.description}</p>
            <div className="pros-cons">
              <div className="pros">
                <strong>Pros:</strong>
                <ul>
                  {modelDetails.logistic_regression.pros.map((pro, idx) => (
                    <li key={idx}>✓ {pro}</li>
                  ))}
                </ul>
              </div>
              <div className="cons">
                <strong>Cons:</strong>
                <ul>
                  {modelDetails.logistic_regression.cons.map((con, idx) => (
                    <li key={idx}>⚠️ {con}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="model-card">
          <div className="model-header">
            <input
              type="radio"
              id="decision_tree"
              name="model"
              checked={selectedModel === 'decision_tree'}
              onChange={() => handleModelSelect('decision_tree')}
            />
            <label htmlFor="decision_tree">
              <h4>Decision Tree</h4>
              <span className="model-type">Tree-based Classifier</span>
            </label>
          </div>
          <div className="model-body">
            <p>{modelDetails.decision_tree.description}</p>
            <div className="pros-cons">
              <div className="pros">
                <strong>Pros:</strong>
                <ul>
                  {modelDetails.decision_tree.pros.map((pro, idx) => (
                    <li key={idx}>✓ {pro}</li>
                  ))}
                </ul>
              </div>
              <div className="cons">
                <strong>Cons:</strong>
                <ul>
                  {modelDetails.decision_tree.cons.map((con, idx) => (
                    <li key={idx}>⚠️ {con}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedModel && (
        <div className="model-summary">
          <h4>Selected Model: {modelDetails[selectedModel].name}</h4>
          <p>This model will be trained on {splitData.train_size} samples and evaluated on {splitData.test_size} samples.</p>
        </div>
      )}

      <div className="action-buttons">
        <button 
          onClick={handleTrainModel} 
          disabled={isTraining || !selectedModel}
          className="train-btn"
        >
          {isTraining ? 'Training Model...' : 'Train Selected Model'}
        </button>
      </div>
    </div>
  );
};

export default ModelSelection;