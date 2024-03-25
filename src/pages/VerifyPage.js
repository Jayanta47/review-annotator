// pages/VerifyPage.js
import React, { useState, useEffect } from 'react';
import ReactDiffViewer from 'react-diff-viewer';
import './VerifyPage.css'; // Importing CSS for styling
import axios from 'axios';

function VerifyPage() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [nameError, setNameError] = useState('');
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    axios.get('http://127.0.0.1:5000/api/data/evaluation')
      .then(response => {
        setLoading(false);
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Run effect only once when component mounts

  const handleConfirmation = (index, selected_by, selected_prompt) => {
    if (!username.trim()) {
      setNameError('Username is required.');
    }
    else {
      axios.post('http://127.0.0.1:5000/api/data/save/evaluation', { index, selected_by, selected_prompt })
      .then(response => {
        // Assuming successful response, navigate back to the previous page
        window.location.reload();
      })
      .catch(error => {
        console.error('Error selecting:', error);
      });
    }
  };

  return (
    <div className="annotate-container">
      <h2>Welcome, {username || 'Guest'}</h2>
      {nameError && <div className="error-message">{nameError}</div>}
      <div className="input-container">
        <label htmlFor="usernameInput">Enter your username: </label>
        <input
          id="usernameInput"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading} // Disable input while loading
        />
      </div>
      {loading ? (
        <div>Loading...</div> // Display loading indicator/message while loading
      ) : (
        <>
          <div className="diff-viewer">
            <ReactDiffViewer oldValue={data.old_code} newValue={data.new_code} splitView={true} />
          </div>
          <div className="text-boxes-container">
            <div className="text-box">
              <p>{data.syn_review_1}</p>
            </div>
          </div>
          <div className="Button-container">
            <button className="confirmation-button yes" onClick={() => handleConfirmation(data.index, username)} disabled={loading}>Yes</button>
            <button className="confirmation-button no" onClick={() => handleConfirmation(data.index, username)} disabled={loading}>No</button>
          </div>
        </>
      )}
    </div>
  );
}

export default VerifyPage;
