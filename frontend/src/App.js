import React from 'react';
import './App.css';
import CreateShortUrl from './components/CreateShortUrl';
import GetOriginalUrl from './components/GetOriginalUrl';
import UpdateShortUrl from './components/UpdateShortUrl';
import DeleteShortUrl from './components/DeleteShortUrl';

function App() {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>🔗 URL Shortener Dashboard</h1>
      <div className="grid-container">
        <CreateShortUrl />
        <GetOriginalUrl />
        <UpdateShortUrl />
        <DeleteShortUrl />
      </div>
    </div>
  );
}

export default App;
