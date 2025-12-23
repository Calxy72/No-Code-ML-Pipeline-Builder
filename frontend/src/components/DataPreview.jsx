import React from 'react';

const DataPreview = ({ data }) => {
  if (!data) return null;

  return (
    <div className="data-preview">
      <h3>Dataset Overview</h3>
      <div className="stats">
        <div className="stat">
          <span className="stat-label">Rows:</span>
          <span className="stat-value">{data.rows}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Columns:</span>
          <span className="stat-value">{data.columns}</span>
        </div>
      </div>
      
      <h4>Columns:</h4>
      <div className="columns-list">
        {data.column_names.map((col, idx) => (
          <span key={idx} className="column-tag">{col}</span>
        ))}
      </div>
      
      <h4>Preview:</h4>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {data.column_names.map((col, idx) => (
                <th key={idx}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.preview.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {data.column_names.map((col, colIdx) => (
                  <td key={colIdx}>{row[col]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataPreview;