import React from 'react';
import { Link } from 'react-router-dom';
import notFoundImg from '../../assets/page_is_not_found.webp';
import './NotFound.css';

export const NotFound = () => {
  return (
    <div className="not-found-container fade-in">
      <div className="not-found-bg-overlay"></div>
      <div className="not-found-content">
        <div className="text-content">
          <Link to="/" className="back-home-btn">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
