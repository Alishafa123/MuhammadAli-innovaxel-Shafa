import React, { useState } from 'react';
import styles from '../style';

const UpdateShortUrl = () => {
  const [shortCode, setShortCode] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleUpdate = async () => {
    setMessage('');
    setError('');
    const updatedUrl = newUrl.startsWith('http') ? newUrl : `https://${newUrl}`;
    try {
      const res = await fetch(`http://localhost:8000/shorten/${shortCode}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: updatedUrl })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Update failed');
      setMessage('URL updated successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.card}>
      <h2>Update Short URL</h2>
      <input
        type="text"
        placeholder="Enter short code"
        value={shortCode}
        onChange={(e) => setShortCode(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Enter new long URL"
        value={newUrl}
        onChange={(e) => setNewUrl(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleUpdate} style={styles.button}>Update</button>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

export default UpdateShortUrl;
