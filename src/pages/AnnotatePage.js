// pages/AnnotatePage.js
import React, { useState, useEffect } from 'react';
import ReactDiffViewer from 'react-diff-viewer';
import './AnnotatePage.css'; // Importing CSS for styling

function AnnotatePage() {
  const [username, setUsername] = useState('');
  const [selection, setSelection] = useState('');
  const [oldCode, setOldCode] = useState('');
  const [newCode, setNewCode] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading from a file with a 2-second delay
    setTimeout(() => {
      // Mocked file content
      const mockedOldCode = `
        const a = 10
        const b = 10
        const c = () => console.log('foo')

        if(a > 10) {
          console.log('bar')
        }

        console.log('done')
      `;
      const mockedNewCode = `
        const a = 10
        const boo = 10

        if(a === 10) {
          console.log('bar')
        }
      `;
      
      // Set the loaded codes
      setOldCode(mockedOldCode);
      setNewCode(mockedNewCode);
      // Set loading to false after the file is loaded
      setLoading(false);
    }, 2000);
  }, []);

  const handleSaveSelection = (value) => {
    setSelection(value);
  };

  const handleConfirmation = () => {
    console.log(`Username: ${username}`);
    console.log(`Selection: ${selection}`);
  };

  return (
    <div className="annotate-container">
      <h2>Welcome, {username || 'Guest'}</h2>
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
            <ReactDiffViewer oldValue={oldCode} newValue={newCode} splitView={true} />
          </div>
          <div className="text-boxes-container">
            <div className="text-box">
              <p>Text Box 1: Hardcoded value 1</p>
            </div>
            <div className="text-box">
              <p>Text Box 2: Hardcoded value 2</p>
            </div>
          </div>
          <div className="selection-buttons">
            <button onClick={() => handleSaveSelection('1')} disabled={loading}>Save Selection 1</button>
            <button onClick={() => handleSaveSelection('2')} disabled={loading}>Save Selection 2</button>
          </div>
          <button className="confirmation-button" onClick={handleConfirmation} disabled={loading}>Confirm</button>
        </>
      )}
    </div>
  );
}

export default AnnotatePage;
