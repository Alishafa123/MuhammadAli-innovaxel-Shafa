import React from 'react';
import CreateShortUrl from './components/CreateShortUrl';
import GetOriginalUrl from './components/GetOriginalUrl';

function App() {
  return (
    <div className="App">
      <h1>URL Shortener</h1>
      <CreateShortUrl />
      <hr />
      <GetOriginalUrl />
    </div>
  );
}

export default App;