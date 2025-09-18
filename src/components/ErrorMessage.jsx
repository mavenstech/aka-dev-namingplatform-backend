import React from 'react';
import '../styles/ErrorMessage.css';

const ErrorMessage = ({ 
  message, 
  type = 'error', 
  onRetry = null, 
  onDismiss = null, 
  showIcon = true 
}) => {
  const iconMap = {
    error: '⚠️',
    warning: '⚠️',
    info: 'ℹ️',
    success: '✅'
  };

  return (
    <div className={`error-message ${type}`} role="alert">
      <div className="error-content">
        {showIcon && (
          <span className="error-icon" aria-hidden="true">
            {iconMap[type]}
          </span>
        )}
        <span className="error-text">{message}</span>
      </div>
      
      <div className="error-actions">
        {onRetry && (
          <button 
            onClick={onRetry} 
            className="error-button retry-button"
            type="button"
          >
            Retry
          </button>
        )}
        {onDismiss && (
          <button 
            onClick={onDismiss} 
            className="error-button dismiss-button"
            type="button"
            aria-label="Dismiss error message"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;