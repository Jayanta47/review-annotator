// SelectionPage.js
import React, { useState, useEffect } from 'react';
import ReactDiffViewer from 'react-diff-viewer';
import axios from 'axios'; // You'll need to install axios via npm or yarn

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

  const handleSelect = (index) => {
    axios.post('http://127.0.0.1:5000/api/data/save/selection', { index })
      .then(response => {
        // Assuming successful response, navigate back to the previous page
        window.location.reload();
      })
      .catch(error => {
        console.error('Error selecting:', error);
      });
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="SelectionPage">
      <h1>Selection Page</h1>
      <div>
      <h2>Welcome, {username || 'Guest'}</h2>
      <div className="input-container">
        <label htmlFor="usernameInput">Enter your username:</label>
        <input
          id="usernameInput"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          // disabled={loading} // Disable input while loading
        />
      </div>
      <h4>Review: {data.index} </h4>
        <textarea
          rows="10"
          cols="50"
          value={data.review}
          readOnly={true}
        ></textarea>
      </div>
      <div>
        <ReactDiffViewer oldValue={data.old_code} newValue={data.new_code} splitView={true} />
      </div>
      <button onClick={() => handleSelect(data.index)}>Select</button>
    </div>
  );
}

export default SelectionPage;
