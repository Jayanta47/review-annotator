// SelectionPage.js
import React, { useState, useEffect, useCallback } from 'react';
import ReactDiffViewer from 'react-diff-viewer';
import axios from 'axios'; // You'll need to install axios via npm or yarn
import './SelectionPage.css'; // Importing CSS for styling

function SelectionPage() {
  const [data, setData] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    axios.get('http://127.0.0.1:5000/api/data/selection')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Run effect only once when component mounts

  const handleSelect = useCallback((index) => {
    axios.post('http://127.0.0.1:5000/api/data/save/selection', { index })
      .then(response => {
        // Assuming successful response, navigate back to the previous page
        if (!response.data.error) {
          window.location.reload();
        }
      })
      .catch(error => {
        console.error('Error selecting:', error);
      });
  }, []);

  const handleReject = useCallback((index) => {
    axios.post('http://127.0.0.1:5000/api/data/save/reject', { index })
      .then(response => {
        // Assuming successful response, navigate back to the previous page
        if (!response.data.error) {
          window.location.reload();
        }
      })
      .catch(error => {
        console.error('Error rejecting:', error);
      });
  }, []);

  useEffect(() => {
    // Add event listener for keydown
    const handleKeyDown = (event) => {
      if (event.code === 'Space') {
        handleSelect(data.index);
      } else if (event.code === 'ArrowRight') {
        handleReject(data.index);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [data, handleSelect, handleReject]); // Run effect when component mounts, data changes, handleSelect or handleReject changes

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="selection-container">
      <div>
        <h2>Welcome, {username || 'Guest'}</h2>
        <div className="input-container">
          <label htmlFor="usernameInput">Enter your username: </label>
          <input
            id="usernameInput"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            // disabled={loading} // Disable input while loading
          />
        </div>
      </div>
      <div>
        <ReactDiffViewer oldValue={data.old_code} newValue={data.new_code} splitView={true} />
      </div>
      <div className='review-container'>
        <h3>Review ID: {data.index} </h3>
        <textarea
          rows="5"
          cols="210"
          value={data.review}
          readOnly={true}
        ></textarea>
      </div>
      <button onClick={() => handleSelect(data.index)}>Select</button>
      <button onClick={() => handleReject(data.index)}>Reject</button>
    </div>
  );
}

export default SelectionPage;
