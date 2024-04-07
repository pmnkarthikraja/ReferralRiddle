import React from 'react';

const PaperShower: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
  };

  return (
    <div style={containerStyle}>
      {[...Array(100)].map((_, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            left: `${Math.random() * 100}vw`,
            backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            animation: `paper-fall-${index} linear`,
            animationDuration: '1s',
            animationDelay: `${Math.random() * 2}s`,
          }}
        ></div>
      ))}
      <style>
        {Array(50)
          .fill('')
          .map(
            (_, index) => `
          @keyframes paper-fall-${index} {
            0% {
              transform: translateY(-10%);
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
            100% {
              transform: translateY(110vh);
              opacity: 0;
            }
          }
        `
          )}
      </style>
    </div>
  );
};

export default PaperShower;
