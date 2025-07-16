import React from 'react';
import CreateShortUrl from './components/CreateShortUrl';
import GetOriginalUrl from './components/GetOriginalUrl';

function App() {
  return (
    <div style={{ backgroundColor: '#e9eff6', minHeight: '100vh', padding: '40px' }}>
      <h1 style={{ textAlign: 'center' }}>🔗 URL Shortener</h1>
      <CreateShortUrl />
      <GetOriginalUrl />
    </div>
  );
}

export default App;
