import React, { useState } from 'react';
import styles from '../style';


const CreateShortUrl = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortCode, setShortCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    const normalizedUrl = longUrl.startsWith('http') ? longUrl : `https://${longUrl}`;
    try {
      const res = await fetch(`http://localhost:8000/shorten`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: normalizedUrl })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setShortCode(data.shortCode);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.card}>
      <h2>Create Short URL</h2>
      <input
        type="text"
        placeholder="Enter long URL"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleSubmit} style={styles.button}>Shorten</button>
      {shortCode && (
        <p>
          Short URL:{' '}
          <a href={`http://localhost:8000/shorten/${shortCode}`} target="_blank" rel="noreferrer">
            {shortCode}
          </a>
        </p>
      )}
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

export default CreateShortUrl;
