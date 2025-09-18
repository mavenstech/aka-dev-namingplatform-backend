import React, { useState } from 'react';
import Modal from 'react-modal';
import { api } from '../services/api';
import '../styles/Modal.css';

const SearchNamesModal = ({ isOpen, onRequestClose, onSearchResults }) => {
  // State for form data
  const [formData, setFormData] = useState({
    category: '',
    features: []
  });
  
  // State for UI
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Available categories (same as CreateNameModal)
  const availableCategories = [
    'aitechnology',
    'beauty',
    'beveragesna',
    'confectionary',
    'energyutilities',
    'entertainment',
    'fashion',
    'financeinvestment',
    'fragrance',
    'grocery',
    'healthpharma',
    'insurance',
    'neobanksfintech',
    'personalcare',
    'pets',
    'propertyrealest',
    'retailecomm',
    'sportfitness',
    'technology',
    'telcointernet',
    'travelhospitality',
    'wellness'
  ];

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

    try {
      // Prepare the search criteria
      const searchCriteria = {};
      
      // Add category if selected
      if (formData.category) {
        searchCriteria.category = formData.category;
      }
      
      // Add features as boolean object if any selected
      if (formData.features.length > 0) {
        const namefeatures = {};
        availableFeatures.forEach(feature => {
          namefeatures[feature] = formData.features.includes(feature);
        });
        searchCriteria.namefeatures = namefeatures;
      }

      // Call the search API
      const response = await api.search.searchNames(searchCriteria);
      
      // Handle the API response
      let namesList = [];
      if (response.success && response.data) {
        namesList = response.data;
      } else if (Array.isArray(response)) {
        namesList = response;
      } else if (response.names) {
        namesList = response.names;
      }
      
      // Pass results to parent component
      onSearchResults(namesList, searchCriteria);
      
      // Close modal after successful search
      handleClose();
      
    } catch (err) {
      setError('Failed to search names. Please try again.');
      console.error('Error searching names:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setFormData({
      category: '',
      features: []
    });
    setError(null);
  };

  // Handle modal close
  const handleClose = () => {
    if (!loading) {
      setFormData({
        category: '',
        features: []
      });
      setError(null);
      onRequestClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Search Names"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="modal-header">
        <h2>Search Names</h2>
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

        <div className="form-group">
          <label htmlFor="search-category">Category</label>
          <select
            id="search-category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            disabled={loading}
            className="form-input"
          >
            <option value="">All categories...</option>
            {availableCategories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Features</label>
          <div className="features-grid">
            {availableFeatures.map(feature => (
              <div key={feature} className="feature-checkbox">
                <input
                  type="checkbox"
                  id={`search-feature-${feature}`}
                  checked={formData.features.includes(feature)}
                  onChange={() => handleFeatureChange(feature)}
                  disabled={loading}
                />
                <label htmlFor={`search-feature-${feature}`}>
                  {featureDisplayNames[feature] || feature}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-actions">
          <button
            type="button"
            onClick={handleClearFilters}
            disabled={loading}
            className="button button-secondary"
          >
            Clear Filters
          </button>
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
            disabled={loading}
            className="button button-primary"
          >
            {loading ? 'Searching...' : 'Search Names'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SearchNamesModal;