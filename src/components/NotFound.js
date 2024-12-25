import React from 'react';
import './NotFound.css'; // Import the CSS file

function NotFound() {
  return (
    <div className="not-found-container">
      <div>
        <div className="not-found-title">404</div>
        <div className="not-found-message">Page Not Found</div>
      </div>
    </div>
  );
}

export default NotFound;