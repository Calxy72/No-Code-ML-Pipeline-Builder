import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';
import DataPreview from '../components/DataPreview';
import Preprocessing from '../components/Preprocessing';
import TrainTestSplit from '../components/TrainTestSplit';
import ModelSelection from '../components/ModelSelection';
import Results from '../components/Results';
import PipelineFlow from '../components/PipelineFlow';
import '../App.css';

const Builder = () => {
  const [step, setStep] = useState(0);
  const [datasetInfo, setDatasetInfo] = useState(null);
  const [processedData, setProcessedData] = useState(null);
  const [splitData, setSplitData] = useState(null);
  const [modelResults, setModelResults] = useState(null);
  const [filepath, setFilepath] = useState('');

  const handleUploadComplete = (data) => {
    if (data.success) {
      setDatasetInfo(data.data);
      setFilepath(data.filepath);
      setStep(1);
    }
  };

  const handlePreprocessComplete = (data) => {
    setProcessedData(data);
    setStep(2);
  };

  const handleSplitComplete = (data) => {
    setSplitData(data);
    setStep(3);
  };

  const handleModelComplete = (results) => {
    setModelResults(results);
    setStep(4);
  };

  const resetPipeline = () => {
    setStep(0);
    setDatasetInfo(null);
    setProcessedData(null);
    setSplitData(null);
    setModelResults(null);
    setFilepath('');
  };

  return (
    <div className="builder-container">
      <header>
        <h1>No-Code ML Pipeline Builder</h1>
        <p>Build machine learning models without writing any code</p>
      </header>
      
      <PipelineFlow steps={5} currentStep={step} />
      
      <div className="main-content">
        <div className="step-content">
          {step === 0 && <FileUpload onUploadComplete={handleUploadComplete} />}
          {step === 1 && datasetInfo && (
            <>
              <DataPreview data={datasetInfo} />
              <Preprocessing 
                columns={datasetInfo.column_names}
                filepath={filepath}
                onComplete={handlePreprocessComplete}
              />
            </>
          )}
          {step === 2 && (
            <TrainTestSplit 
              columns={datasetInfo.column_names}
              filepath={filepath}
              onComplete={handleSplitComplete}
            />
          )}
          {step === 3 && splitData && (
            <ModelSelection 
              splitData={splitData}
              targetColumn={localStorage.getItem('targetColumn')}
              onComplete={handleModelComplete}
            />
          )}
          {step === 4 && modelResults && (
            <Results 
              results={modelResults}
              onReset={resetPipeline}
            />
          )}
        </div>
      </div>
      
      <div className="navigation">
        {step > 0 && step < 4 && (
          <button onClick={() => setStep(step - 1)}>Previous</button>
        )}
        {step === 4 && (
          <button onClick={resetPipeline}>Start New Pipeline</button>
        )}
      </div>
    </div>
  );
};

export default Builder;