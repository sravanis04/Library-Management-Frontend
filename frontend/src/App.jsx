import React, { useState } from 'react';
import TabNavigation from './components/TabNavigation';
import BookListSection from './components/BookListSection';
import AddBookForm from './components/AddBookForm';
import StudentOperationsSection from './components/StudentOperationsSection';
import { SpeedInsights } from "@vercel/speed-insights/next"
const App = () => {
  const [activeTab, setActiveTab] = useState('books');
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshBooks = () => setRefreshKey((prev) => prev + 1);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#007bff' }}>
        📚 Library Management System
      </h1>
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'books' && <BookListSection key={refreshKey} />}
      {activeTab === 'addBook' && <AddBookForm onBookAdded={refreshBooks} />}
      {activeTab === 'students' && <StudentOperationsSection refreshBooks={refreshBooks} />}
    </div>
  );
};

export default App;
