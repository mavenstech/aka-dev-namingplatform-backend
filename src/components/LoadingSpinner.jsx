import React from 'react';
import '../styles/LoadingSpinner.css';

const LoadingSpinner = ({ size = 'medium', color = '#007bff', message = '' }) => {
  const sizeClass = `spinner-${size}`;
  
  return (
    <div className="loading-container">
      <div 
        className={`loading-spinner ${sizeClass}`}
        style={{ borderTopColor: color }}
        role="status"
        aria-label="Loading"
      />
      {message && (
        <p className="loading-message" aria-live="polite">
          {message}
        </p>
      )}
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;