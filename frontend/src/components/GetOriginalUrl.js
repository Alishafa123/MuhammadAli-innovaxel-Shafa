import React, { useState } from 'react';

const GetOriginalUrl = () => {
  const [shortCode, setShortCode] = useState('');
  const [urlData, setUrlData] = useState(null);
  const [error, setError] = useState('');

  const handleFetch = async () => {
    setError('');
    setUrlData(null);

    if (!shortCode.trim()) {
      setError('Please enter a short code.');
      return;
    }

    try {
      const res = await fetch(`http://localhost:8000/shorten/${shortCode}`);
      
      // Check if response is actually JSON
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Unexpected response: Not JSON');
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
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

      {urlData && (
        <p>
          Original URL:{" "}
          <a
            href={
              urlData.url.startsWith('http')
                ? urlData.url
                : `https://${urlData.url}`
            }
            target="_blank"
            rel="noreferrer"
          >
            {urlData.url}
          </a>
        </p>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default GetOriginalUrl;
