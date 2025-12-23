import React from 'react';

const PipelineFlow = ({ steps, currentStep }) => {
  const stepLabels = ['Upload', 'Preprocess', 'Split', 'Model', 'Results'];
  
  return (
    <div className="pipeline-flow">
      <h3>ML Pipeline Flow</h3>
      <div className="steps">
        {stepLabels.map((label, index) => (
          <div key={index} className={`step ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}>
            <div className="step-circle">{index + 1}</div>
            <div className="step-label">{label}</div>
            {index < stepLabels.length - 1 && <div className="step-connector"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PipelineFlow;