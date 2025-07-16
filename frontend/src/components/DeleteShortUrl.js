import React, { useState } from 'react';
import styles from '../style';

const DeleteShortUrl = () => {
  const [shortCode, setShortCode] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleDelete = async () => {
    setMessage('');
    setError('');
    try {
      const res = await fetch(`http://localhost:8000/shorten/${shortCode}`, {
        method: 'DELETE'
      });
      if (res.status === 204) {
        setMessage('URL deleted successfully!');
      } else {
        const data = await res.json();
        throw new Error(data.error || 'Deletion failed');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.card}>
      <h2>Delete Short URL</h2>
      <input
        type="text"
        placeholder="Enter short code"
        value={shortCode}
        onChange={(e) => setShortCode(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleDelete} style={styles.button}>Delete</button>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

export default DeleteShortUrl;
