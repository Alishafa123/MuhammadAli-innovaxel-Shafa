import React, { useState } from 'react';

const GetOriginalUrl = () => {
  const [shortCode, setShortCode] = useState('');
  const [urlData, setUrlData] = useState(null);
  const [error, setError] = useState('');

  const handleFetch = async () => {
    setError('');
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/shorten/${shortCode}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setUrlData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Get Original URL</h2>
      <input
        type="text"
        placeholder="Enter short code"
        value={shortCode}
        onChange={(e) => setShortCode(e.target.value)}
      />
      <button onClick={handleFetch}>Get Original</button>
      {urlData && <p>Original URL: <a href={urlData.url} target="_blank" rel="noreferrer">{urlData.url}</a></p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default GetOriginalUrl;
