// SelectionPage.js
import React, { useState, useEffect } from 'react';
import ReactDiffViewer from 'react-diff-viewer';
import axios from 'axios'; // You'll need to install axios via npm or yarn

function SelectionPage() {
  const [data, setData] = useState(null);

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

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="SelectionPage">
      <h1>Selection Page</h1>
      <div>
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
    </div>
  );
}

export default SelectionPage;
