import React from 'react';

const Card = ({ children, className = '', style = {} }) => {
  return (
    <div
      className={`card-container ${className}`}
      style={{
        ...style,
        padding: '1rem',
        border: '1px solid #ccc',
        borderRadius: '8px',
        margin: '0 auto',
        marginTop: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '100%',
      }}
    >
      {children}
    </div>
  );
};


export default Card;