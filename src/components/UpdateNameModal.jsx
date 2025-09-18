import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { api } from '../services/api';
import '../styles/Modal.css';

const UpdateNameModal = ({ isOpen, onRequestClose, name, onNameUpdated }) => {
  // State for form data
  const [formData, setFormData] = useState({
    nameid: '',
    name: '',
    category: '',
    notes: '',
    features: []
  });
  
  // State for UI
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Available features based on API response structure
  const availableFeatures = [
    'realword',
    'composite',
    'lightlycoined',
    'coined',
    'alphanumeric',
    'oneword',
    'twowords',
    'professional',
    'personable',
    'hightech',
    'sensory',
    'accessible',
    'sophisticated',
    'trusted',
    'optimistic',
    'descriptive',
    'playful'
  ];

  // Feature display names for better UX
  const featureDisplayNames = {
    'realword': 'Real Word',
    'composite': 'Composite',
    'lightlycoined': 'Lightly Coined',
    'coined': 'Coined',
    'alphanumeric': 'Alphanumeric',
    'oneword': 'One Word',
    'twowords': 'Two Words',
    'professional': 'Professional',
    'personable': 'Personable',
    'hightech': 'High Tech',
    'sensory': 'Sensory',
    'accessible': 'Accessible',
    'sophisticated': 'Sophisticated',
    'trusted': 'Trusted',
    'optimistic': 'Optimistic',
    'descriptive': 'Descriptive',
    'playful': 'Playful'
  };

  // Initialize form data when name prop changes
  useEffect(() => {
    if (name) {
      let featuresArray = [];
      
      // Handle namefeatures object from API
      if (name.namefeatures && typeof name.namefeatures === 'object') {
        featuresArray = Object.keys(name.namefeatures).filter(key => name.namefeatures[key] === true);
      } else if (Array.isArray(name.features)) {
        featuresArray = name.features;
      } else if (typeof name.features === 'string') {
        featuresArray = name.features.split(', ').filter(f => f.trim());
      }
      
      setFormData({
        nameid: name.nameid || name.id || '',
        name: name.name || '',
        category: name.category || '',
        notes: name.notes || '',
        features: featuresArray
      });
    }
    setError(null);
    setSuccess(false);
  }, [name]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle feature checkbox changes
  const handleFeatureChange = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Prepare the data for API call with namefeatures object
      const namefeatures = {};
      availableFeatures.forEach(feature => {
        namefeatures[feature] = formData.features.includes(feature);
      });
      
      const updateData = {
        nameid: formData.nameid,
        name: formData.name,
        category: formData.category,
        notes: formData.notes,
        namefeatures: namefeatures
      };

      // Call the update API
      await api.names.updateName(updateData);
      
      setSuccess(true);
      
      // Call the parent's callback after a brief delay to show success message
      setTimeout(() => {
        onNameUpdated();
      }, 1000);
      
    } catch (err) {
      setError('Failed to update name. Please try again.');
      console.error('Error updating name:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle modal close
  const handleClose = () => {
    if (!loading) {
      setFormData({
        nameid: '',
        name: '',
        category: '',
        notes: '',
        features: []
      });
      setError(null);
      setSuccess(false);
      onRequestClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Update Name"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="modal-header">
        <h2>Update Name</h2>
        <button 
          onClick={handleClose}
          className="modal-close-button"
          disabled={loading}
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit} className="modal-form">
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {success && (
          <div className="success-message">
            Name updated successfully!
          </div>
        )}

        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            disabled={loading}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            disabled={loading}
            className="form-input"
            placeholder="e.g., Technology, Fashion, Food"
          />
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            disabled={loading}
            className="form-textarea"
            rows="4"
            placeholder="Additional notes about this name..."
          />
        </div>

        <div className="form-group">
          <label>Features</label>
          <div className="features-grid">
            {availableFeatures.map(feature => (
              <div key={feature} className="feature-checkbox">
                <input
                  type="checkbox"
                  id={`feature-${feature}`}
                  checked={formData.features.includes(feature)}
                  onChange={() => handleFeatureChange(feature)}
                  disabled={loading}
                />
                <label htmlFor={`feature-${feature}`}>
                  {featureDisplayNames[feature] || feature}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-actions">
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="button button-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || !formData.name || !formData.category}
            className="button button-primary"
          >
            {loading ? 'Updating...' : 'Update Name'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateNameModal;