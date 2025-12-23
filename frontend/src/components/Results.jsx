import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Results = ({ results, onReset }) => {
  if (!results) return null;

  const { model_name, accuracy, classification_report, feature_importance, predictions_sample } = results;

  // Prepare accuracy chart data
  const accuracyData = {
    labels: ['Accuracy'],
    datasets: [
      {
        label: 'Model Accuracy',
        data: [accuracy * 100],
        backgroundColor: ['#36A2EB'],
        borderColor: ['#36A2EB'],
        borderWidth: 1,
      }
    ]
  };

  // Prepare feature importance chart data
  const features = Object.keys(feature_importance);
  const importanceValues = Object.values(feature_importance);
  
  const featureImportanceData = {
    labels: features,
    datasets: [
      {
        label: 'Feature Importance',
        data: importanceValues,
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
          '#9966FF', '#FF9F40', '#FF6384', '#36A2EB'
        ],
      }
    ]
  };

  // Prepare confusion matrix data (simplified)
  const confusionMatrixData = {
    labels: ['Predicted 0', 'Predicted 1'],
    datasets: [
      {
        label: 'Actual 0',
        data: [classification_report['0']?.support * 0.8 || 50, classification_report['0']?.support * 0.2 || 12],
        backgroundColor: '#FF6384'
      },
      {
        label: 'Actual 1',
        data: [classification_report['1']?.support * 0.2 || 10, classification_report['1']?.support * 0.8 || 40],
        backgroundColor: '#36A2EB'
      }
    ]
  };

  const accuracyOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Model Accuracy'
      }
    }
  };

  return (
    <div className="results-container">
      <h3>Step 5: Results & Evaluation</h3>
      <p className="subtitle">Your model has been trained and evaluated successfully!</p>
      
      <div className="results-summary">
        <div className="summary-card">
          <div className="summary-icon">📊</div>
          <div className="summary-content">
            <h4>Model Performance</h4>
            <div className="accuracy-display">
              <span className="accuracy-label">Accuracy:</span>
              <span className="accuracy-value">{(accuracy * 100).toFixed(2)}%</span>
            </div>
            <p>Trained on {model_name === 'logistic_regression' ? 'Logistic Regression' : 'Decision Tree'}</p>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h4>Model Accuracy</h4>
          <div style={{ height: '300px' }}>
            <Bar data={accuracyData} options={accuracyOptions} />
          </div>
        </div>

        {features.length > 0 && (
          <div className="chart-card">
            <h4>Feature Importance</h4>
            <div style={{ height: '300px' }}>
              <Bar data={featureImportanceData} options={{ responsive: true }} />
            </div>
          </div>
        )}
      </div>

      <div className="detailed-results">
        <div className="classification-report">
          <h4>Classification Report</h4>
          <table>
            <thead>
              <tr>
                <th>Class</th>
                <th>Precision</th>
                <th>Recall</th>
                <th>F1-Score</th>
                <th>Support</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(classification_report).map(([className, metrics]) => {
                if (className === 'accuracy' || className === 'macro avg' || className === 'weighted avg') return null;
                
                return (
                  <tr key={className}>
                    <td>{className}</td>
                    <td>{metrics.precision?.toFixed(3) || 'N/A'}</td>
                    <td>{metrics.recall?.toFixed(3) || 'N/A'}</td>
                    <td>{metrics['f1-score']?.toFixed(3) || 'N/A'}</td>
                    <td>{metrics.support || 'N/A'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="predictions-preview">
          <h4>Sample Predictions</h4>
          <div className="predictions-list">
            {predictions_sample && predictions_sample.map((pred, idx) => (
              <div key={idx} className="prediction-item">
                <span className="prediction-index">#{idx + 1}</span>
                <span className="prediction-value">Predicted: <strong>{pred}</strong></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="conclusion">
        <h4>Conclusion</h4>
        <p>
          The model achieved an accuracy of <strong>{(accuracy * 100).toFixed(2)}%</strong> on the test set.
          {accuracy > 0.8 ? ' This is an excellent result!' : 
           accuracy > 0.6 ? ' This is a good result.' : 
           ' Consider trying different preprocessing or model options.'}
        </p>
        <p>
          <strong>Next steps:</strong> You can try different preprocessing techniques, adjust the train-test split ratio,
          or experiment with different models to improve performance.
        </p>
      </div>

      <div className="action-buttons">
        <button onClick={onReset} className="reset-btn">
          🚀 Start New Pipeline
        </button>
        <button className="export-btn" onClick={() => alert('Export feature coming soon!')}>
          📥 Export Results
        </button>
      </div>
    </div>
  );
};

export default Results;