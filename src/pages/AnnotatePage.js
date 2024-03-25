// pages/AnnotatePage.js
import React, { useState, useEffect } from 'react';
import ReactDiffViewer from 'react-diff-viewer';
import './AnnotatePage.css'; // Importing CSS for styling
import axios from 'axios';

function AnnotatePage() {
  const [username, setUsername] = useState('');
  const [selection, setSelection] = useState('');
  // const [oldCode, setOldCode] = useState('');
  // const [newCode, setNewCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [nameError, setNameError] = useState('');
  const [data, setData] = useState(null);

  // useEffect(() => {
    
  //   // Simulate loading from a file with a 2-second delay
  //   setTimeout(() => {
  //     // Mocked file content
  //     const mockedOldCode = `
  //       const a = 10
  //       const b = 10
  //       const c = () => console.log('foo')

  //       if(a > 10) {
  //         console.log('bar')
  //       }

  //       console.log('done')
  //     `;
  //     const mockedNewCode = `
  //       const a = 10
  //       const boo = 10

  //       if(a === 10) {
  //         console.log('bar')
  //       }
  //     `;
      
  //     // Set the loaded codes
  //     setOldCode(mockedOldCode);
  //     setNewCode(mockedNewCode);
  //     // Set loading to false after the file is loaded
  //     setLoading(false);
  //   }, 2000);
  // }, []);

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    axios.get('http://127.0.0.1:5000/api/data/prompt')
      .then(response => {
        setLoading(false);
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Run effect only once when component mounts

  const handleSaveSelection = (value) => {
    setSelection(value);
  };

  const handleConfirmation = (index, selected_by, selected_prompt) => {
    if (!username.trim()) {
      setNameError('Username is required.');
    } else if (!selection) {
      return;
    } 
    else {
      // setNameError('');
      // setSelectionError('');
      // console.log(`Username: ${username}`);
      // console.log(`Selection: ${selection}`);
      axios.post('http://127.0.0.1:5000/api/data/save/prompt', { index, selected_by, selected_prompt })
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
        <label htmlFor="usernameInput">Enter your username:</label>
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
          <h3>Select the correct code snippet: {selection || "Please select a section"} </h3>
          <div className="text-boxes-container">
            <div className="text-box">
              <p>{data.syn_review_1}</p>
            </div>
            <div className="text-box">
              <p>{data.syn_review_2}</p>
            </div>
          </div>
          <div className="selection-buttons">
            <button onClick={() => handleSaveSelection('1')} disabled={loading}>Save Selection 1</button>
            <button onClick={() => handleSaveSelection('2')} disabled={loading}>Save Selection 2</button>
          </div>
          <button className="confirmation-button" onClick={() => handleConfirmation(data.index, username, selection)} disabled={loading}>Confirm</button>
        </>
      )}
    </div>
  );
}

export default AnnotatePage;
