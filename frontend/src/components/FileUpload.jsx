import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const FileUpload = ({ onUploadComplete }) => {
  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('${import.meta.env.VITE_API_URL}/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      onUploadComplete(response.data);
    } catch (error) {
      alert('Upload failed: ' + error.response?.data?.error || error.message);
    }
  }, [onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    }
  });

  return (
    <div className="upload-container">
      <h3>Step 1: Upload Dataset</h3>
      <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the file here...</p>
        ) : (
          <div>
            <p>Drag & drop a CSV or Excel file here, or click to select</p>
            <small>Supports .csv, .xls, .xlsx</small>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;