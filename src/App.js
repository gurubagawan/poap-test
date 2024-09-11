import React, { useState } from 'react';
import { PoapDisplay } from './PoapDisplay';
import { validateInput } from './utils/validation';

function App() {
  const [identifier, setIdentifier] = useState('');
  const [poaps, setPoaps] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchPOAPs = async (address) => {
    const url = `${apiUrl}/actions/scan/${address}`;
    setLoading(true);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error ${response.status}: ${errorData.message || response.statusText}`);
      }

      const data = await response.json();
      if (data.length === 0) {
        setError('No POAPs found for this user')
      }
      setPoaps(data)
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (identifier === '' || !validateInput(identifier)) {
      setError('Please enter a valid identifier (address, ENS, or email)');
      return;
    }

    setError('');
    setPoaps([]);
    fetchPOAPs(identifier);
  };

  const handleReset = () => {
    setIdentifier('');
    setPoaps([]);
    setError('');
    setLoading(false)
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} >
        <input
          type="text"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value.trim())}
          placeholder="Address, ENS, or email"
          className="input"
        />
        <button type="submit" className="button">Search</button>
        <button type="button" className="button" onClick={handleReset}>Reset</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <div className="container">
        {poaps?.length > 0 && <PoapDisplay poaps={poaps} />}
      </div>
    </div>
  );
}

export default App;
