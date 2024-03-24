// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AnnotatePage from './pages/AnnotatePage';
import VerifyPage from './pages/VerifyPage';
import SelectPage from './pages/SelectionPage';
import './App.css'; // Import your CSS file for styling

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="container">
            <nav className="navbar">
              <div className="navbar-brand">
                <span className="site-name">CodeReviewer</span>
              </div>
              <ul className="nav-links">
              <li>
                  <Link to="/select">Select</Link>
                </li>
                <li>
                  <Link to="/annotate">Annotate</Link>
                </li>
                <li>
                  <Link to="/verify">Verify</Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/annotate" element={<AnnotatePage />} />
            <Route path="/verify" element={<VerifyPage />} />
            <Route path="/select" element={<SelectPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
