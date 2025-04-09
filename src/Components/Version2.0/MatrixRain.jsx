import React from 'react';
import './MatrixRain.scss';

const MatrixRain = ({ 
  x, y, area = 50, fullViewport = false, density = 20, scrollY = 0, 
  effectDuration = 2000, fallSpeed = 100, colorProfile = 'neon-green', 
  pattern = 'default', effectType = 'none', pulseStrength = 1, 
  flickerStrength = 30, style = {}
}) => {
  const patterns = {
    default: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*',
    webdev: '<>{}[]()=+-*/.:;HTMLCSSJS',
    neural: '⊻⊼⊽⋀⋁⊹⊸⊿∑∏∆∇θ',
    gamedev: '▲▼◄►◆◇■□★☆♠♣♥♦',
  };

  const characters = patterns[pattern] || patterns.default;
  const rainDrops = Array.from({ length: density }, () =>
    characters[Math.floor(Math.random() * characters.length)]
  );

  const fallDistance = fallSpeed * (effectDuration / 1000); // 0 if fallSpeed is 0
  const animationDuration = effectDuration / 1000;

  const baseStyle = fullViewport
    ? { 
        top: scrollY, left: 0, width: 'calc(100vw - 20px)', height: '100vh', 
        '--animation-duration': `${animationDuration}s`, 
        '--fall-distance': `${fallDistance}px`,
        '--pulse-strength': pulseStrength
      }
    : { 
        top: y - area / 2 + scrollY, left: x - area / 2, 
        '--animation-duration': `${animationDuration}s`, 
        '--fall-distance': `${fallDistance}px`,
        '--pulse-strength': pulseStrength
      };

  const combinedStyle = { ...baseStyle, ...style };

  const flickerCount = Math.floor((flickerStrength / 100) * density);
  const flickerIndices = new Set();
  while (flickerIndices.size < flickerCount && flickerIndices.size < density) {
    flickerIndices.add(Math.floor(Math.random() * density));
  }

  return (
    <div className={`matrix-rain ${colorProfile} ${effectType}`} style={combinedStyle}>
      {rainDrops.map((char, index) => (
        <span
          key={index}
          className={effectType === 'flicker' && flickerIndices.has(index) ? 'flicker-char' : ''}
          style={{
            animationDelay: `${Math.random() * 0.5}s`,
            left: fullViewport ? `${4 + Math.random() * (100 - 8)}%` : `${Math.random() * area - area / 2}px`,
            top: fullViewport ? `${Math.random() * 100}vh` : `${Math.random() * area - area / 2}px`,
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default MatrixRain;

/**
 left: fullViewport ? `${4 + Math.random() * (100 - 8)}%`:
 Increase padding: ${6 + Math.random() * (100 - 12)}% (6px each side).
 Decrease padding: ${2 + Math.random() * (100 - 4)}% (2px each side).

 Pixel Precision: For exact 4px padding,
 left: fullViewport ? `${4 + Math.random() * (window.innerWidth - 8)}px`
 */