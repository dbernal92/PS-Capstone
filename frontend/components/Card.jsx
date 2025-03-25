import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div
      className={`card-container ${className}`}
      style={{
        padding: '1rem',
        border: '1px solid #ccc',
        borderRadius: '8px',
        marginBottom: '1rem',
      }}
    >
      {children}
    </div>
  );
};

export default Card;