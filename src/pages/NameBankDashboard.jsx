import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import Modal from 'react-modal';
import { api } from '../services/api';
import UpdateNameModal from '../components/UpdateNameModal';
import CreateNameModal from '../components/CreateNameModal';
import SearchNamesModal from '../components/SearchNamesModal';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import '../styles/NameBankDashboard.css';

// Set the modal app element for accessibility
Modal.setAppElement('#root');

const NameBankDashboard = () => {
  // State management
  const [names, setNames] = useState([]);
  const [filteredNames, setFilteredNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedName, setSelectedName] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [activeSearchCriteria, setActiveSearchCriteria] = useState(null);

  // Fetch names on component mount
  useEffect(() => {
    fetchNames();
  }, []);

  // Filter names based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredNames(names);
    } else {
      const filtered = names.filter(name =>
        name.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        name.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredNames(filtered);
    }
  }, [names, searchTerm]);

  // Fetch names from API
  const fetchNames = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.search.searchNames({ limit: 50 });
      console.log('API Response:', response); // Debug log
      
      // Handle the actual API response structure
      let namesList = [];
      if (response.success && response.data) {
        namesList = response.data;
      } else if (Array.isArray(response)) {
        namesList = response;
      } else if (response.names) {
        namesList = response.names;
      }
      
      setNames(namesList);
    } catch (err) {
      setError('Failed to fetch names. Please try again.');
      console.error('Error fetching names:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle clear search input
  const handleClearSearchInput = () => {
    setSearchTerm('');
  };

  // Handle update action
  const handleUpdateClick = (name) => {
    setSelectedName(name);
    setIsUpdateModalOpen(true);
  };

  // Handle create action
  const handleCreateClick = () => {
    setIsCreateModalOpen(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsUpdateModalOpen(false);
    setIsCreateModalOpen(false);
    setSelectedName(null);
  };

  // Handle successful name update
  const handleNameUpdated = () => {
    fetchNames(); // Refresh the list
    handleModalClose();
  };

  // Handle successful name creation
  const handleNameCreated = () => {
    fetchNames(); // Refresh the list
    handleModalClose();
  };

  // Handle search modal actions
  const handleSearchClick = () => {
    setIsSearchModalOpen(true);
  };

  const handleSearchResults = (searchResults) => {
    setNames(searchResults);
    setActiveSearchCriteria(searchResults.length > 0 ? 'Active search results' : 'No results found');
    setIsSearchModalOpen(false);
  };

  const handleSearchModalClose = () => {
    setIsSearchModalOpen(false);
  };

  const handleClearSearch = () => {
    setActiveSearchCriteria(null);
    fetchNames(); // Fetch all names again
  };

  // Define table columns
  const columns = [
    {
      name: 'Name ID',
      selector: row => row.nameid || row.id,
      sortable: true,
      width: '100px',
    },
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
      wrap: true,
      width: '200px',
    },
    {
      name: 'Category',
      selector: row => row.category,
      sortable: true,
      width: '150px',
    },
    {
      name: 'Features',
      selector: row => row.namefeatures || row.features,
      cell: row => {
        const features = row.namefeatures || row.features;
        let displayFeatures = 'None';
        
        if (Array.isArray(features)) {
          displayFeatures = features.join(', ');
        } else if (typeof features === 'object' && features !== null) {
          // Handle namefeatures object with boolean values
          const trueFeatures = Object.keys(features).filter(key => features[key] === true);
          displayFeatures = trueFeatures.length > 0 ? trueFeatures.join(', ') : 'None';
        } else if (typeof features === 'string') {
          displayFeatures = features;
        }
        
        return (
          <div className="features-cell">
            {displayFeatures}
          </div>
        );
      },
      wrap: true,
    },
    {
      name: 'Notes',
      selector: row => row.notes,
      cell: row => (
        <div className="notes-cell" title={row.notes}>
          {row.notes && row.notes.length > 50 
            ? `${row.notes.substring(0, 50)}...` 
            : row.notes || 'No notes'
          }
        </div>
      ),
      wrap: true,
      width: '300px',
    },
    {
      name: 'Actions',
      cell: row => (
        <button
          className="action-button"
          onClick={() => handleUpdateClick(row)}
          title="Edit Name"
          aria-label={`Edit ${row.name}`}
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
      ),
      width: '100px',
      center: true,
    },
  ];

  // Custom styles for DataTable
  const customStyles = {
    headRow: {
      style: {
        backgroundColor: '#f8f9fa',
        borderTopStyle: 'solid',
        borderTopWidth: '1px',
        borderTopColor: '#e9ecef',
      },
    },
    headCells: {
      style: {
        '&:not(:last-of-type)': {
          borderRightStyle: 'solid',
          borderRightWidth: '1px',
          borderRightColor: '#e9ecef',
        },
        fontWeight: '600',
        fontSize: '14px',
      },
    },
    cells: {
      style: {
        '&:not(:last-of-type)': {
          borderRightStyle: 'solid',
          borderRightWidth: '1px',
          borderRightColor: '#e9ecef',
        },
        fontSize: '13px',
      },
    },
  };

  return (
    <div className="name-bank-dashboard">
      <div className="dashboard-header">
        <h2></h2>
        <div className="dashboard-actions">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by name or category..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={handleClearSearchInput}
                className="clear-search-icon"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
          <div className="button-group">
            <button 
              onClick={handleSearchClick}
              className="search-button"
            >
              Advanced Search
            </button>
            <button 
              onClick={handleCreateClick}
              className="create-button"
            >
              Create New Name
            </button>
          </div>
        </div>
      </div>

      {activeSearchCriteria && (
        <div className="search-status">
          <span className="search-status-text">
            {activeSearchCriteria}
          </span>
          <button 
            onClick={handleClearSearch}
            className="clear-search-button"
          >
            Clear Search
          </button>
        </div>
      )}

      {error && (
        <ErrorMessage 
          message={error}
          type="error"
          onRetry={fetchNames}
          onDismiss={() => setError(null)}
        />
      )}

      <div className="table-container">
        {loading && names.length === 0 ? (
          <LoadingSpinner 
            size="large" 
            message="Loading names..." 
          />
        ) : (
          <DataTable
            columns={columns}
            data={filteredNames}
            progressPending={loading && names.length > 0}
            progressComponent={
              <LoadingSpinner 
                size="medium" 
                message="Refreshing data..." 
              />
            }
            pagination
            paginationPerPage={50}
            paginationRowsPerPageOptions={[25, 50, 100]}
            sortIcon={<div>↕</div>}
            customStyles={customStyles}
            noDataComponent={
              searchTerm ? 
                `No names found matching "${searchTerm}"` : 
                "No names available"
            }
            responsive
            striped
            highlightOnHover
          />
        )}
      </div>

      {/* Update Name Modal */}
      <UpdateNameModal
        isOpen={isUpdateModalOpen}
        onRequestClose={handleModalClose}
        name={selectedName}
        onNameUpdated={handleNameUpdated}
      />

      {/* Create Name Modal */}
      <CreateNameModal
        isOpen={isCreateModalOpen}
        onRequestClose={handleModalClose}
        onNameCreated={handleNameCreated}
      />

      {/* Search Names Modal */}
      <SearchNamesModal
        isOpen={isSearchModalOpen}
        onRequestClose={handleSearchModalClose}
        onSearchResults={handleSearchResults}
      />
    </div>
  );
};

export default NameBankDashboard;