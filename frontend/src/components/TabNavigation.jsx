// src/components/TabNavigation.jsx
import React from 'react';

const TabNavigation = ({ activeTab, onTabChange }) => {
  const tabStyle = (tabName) => ({
    padding: '10px 20px',
    cursor: 'pointer',
    borderBottom: activeTab === tabName ? '2px solid #007bff' : '2px solid transparent',
    backgroundColor: activeTab === tabName ? '#e0f2ff' : 'transparent',
    fontWeight: activeTab === tabName ? 'bold' : 'normal',
    color: activeTab === tabName ? '#007bff' : '#555',
    transition: 'all 0.3s ease',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
  });

  return (
    <nav style={{ display: 'flex', borderBottom: '1px solid #ddd', marginBottom: '20px' }}>
      <div style={tabStyle('books')} onClick={() => onTabChange('books')}>
        Books Management
      </div>
      <div style={tabStyle('addBook')} onClick={() => onTabChange('addBook')}>
        Add New Book
      </div>
      <div style={tabStyle('students')} onClick={() => onTabChange('students')}>
        Student Operations
      </div>
    </nav>
  );
};

export default TabNavigation;