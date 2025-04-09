import React from 'react';
import './MatrixRain.scss';

const MatrixRain = ({ x, y, area = 50, fullViewport = false, density = 20, scrollY = 0, effectDuration = 2000 }) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*'.split('');
  const rainDrops = Array.from({ length: density }, () =>
    characters[Math.floor(Math.random() * characters.length)]
  );

  const style = fullViewport
    ? { 
        top: scrollY, 
        left: 0, 
        width: 'calc(100vw - 20px)', 
        height: '100vh',
        '--effect-duration': `${effectDuration / 1000}s`, // Pass duration to CSS
      }
    : { 
        top: y - area / 2 + scrollY, 
        left: x - area / 2,
        '--effect-duration': `${effectDuration / 1000}s`,
      };

  return (
    <div className="matrix-rain" style={style}>
      {rainDrops.map((char, index) => (
        <span
          key={index}
          style={{
            animationDelay: `${Math.random() * 0.5}s`,
            left: fullViewport
              ? `${Math.random() * 100}%`
              : `${Math.random() * area - area / 2}px`,
            top: fullViewport
              ? `${Math.random() * 100}vh`
              : `${Math.random() * area - area / 2}px`,
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default MatrixRain;