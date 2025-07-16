import styles from '../style';
import React, { useState } from 'react';

const GetOriginalUrl = () => {
  const [shortCode, setShortCode] = useState('');
  const [urlData, setUrlData] = useState(null);
  const [error, setError] = useState('');

  const handleFetch = async () => {
    setError('');
    setUrlData(null);
    try {
      const res = await fetch(`http://localhost:8000/shorten/${shortCode}`);
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
    <div style={styles.card}>
      <h2>Get Original URL</h2>
      <input
        type="text"
        placeholder="Enter short code"
        value={shortCode}
        onChange={(e) => setShortCode(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleFetch} style={styles.button}>Get Original</button>
      {urlData && (
        <p>
          Original URL:{' '}
          <a
            href={urlData.url.startsWith('http') ? urlData.url : `${urlData.url}`}
            target="_blank"
            rel="noreferrer"
          >
            {urlData.url}
          </a>
        </p>
      )}
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

export default GetOriginalUrl;
