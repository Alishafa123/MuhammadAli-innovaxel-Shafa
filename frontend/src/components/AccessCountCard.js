import React, { useState } from 'react';
import styles from '../style';

const AccessCountCard = () => {
  const [shortCode, setShortCode] = useState('');
  const [accessCount, setAccessCount] = useState(null);
  const [error, setError] = useState('');

  const fetchAccessCount = async () => {
    setError('');
    setAccessCount(null);
    try {
      const res = await fetch(`http://localhost:8000/shorten/${shortCode}/stats`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setAccessCount(data.accessCount);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.card}>
      <h2>URL Access Count</h2>
      <input
        type="text"
        placeholder="Enter short code"
        value={shortCode}
        onChange={(e) => setShortCode(e.target.value)}
        style={styles.input}
      />
      <button onClick={fetchAccessCount} style={styles.button}>
        Get Count
      </button>
      {accessCount !== null && (
        <p><strong>Access Count:</strong> {accessCount}</p>
      )}
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

export default AccessCountCard;
