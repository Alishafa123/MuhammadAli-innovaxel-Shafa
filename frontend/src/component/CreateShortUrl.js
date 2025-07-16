import React, { useState } from 'react';

const CreateShortUrl = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortCode, setShortCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/shorten`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: longUrl })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setShortCode(data.shortCode);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Create Short URL</h2>
      <input
        type="text"
        placeholder="Enter long URL"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
      />
      <button onClick={handleSubmit}>Shorten</button>
      {shortCode && (
        <p>Short URL: <a href={`${process.env.REACT_APP_API_BASE_URL}/shorten/${shortCode}`} target="_blank" rel="noreferrer">{shortCode}</a></p>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CreateShortUrl;
