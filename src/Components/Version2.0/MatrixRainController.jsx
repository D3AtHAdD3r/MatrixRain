import React, { useState, useEffect, useRef } from 'react';
import MatrixRain from './MatrixRain';

const MatrixRainController = ({
  clickDensity = 20, scrollDensity = 50, effectDuration = 2000, fallSpeed = 100,
  enableClick = true, enableScroll = false, colorProfile = 'neon-green', 
  pattern = 'default', effectType = 'none', pulseStrength = 1, 
  flickerStrength = 30,
  useGradient = false, gradientColor1 = '#39ff14', gradientColor2 = '#00ffff', gradientDirection = 'top-to-bottom'
}) => {
  const [effect, setEffect] = useState(null);
  const timeoutRef = useRef(null);
  const activeMode = enableClick ? 'click' : enableScroll ? 'scroll' : null;

  const getRandomColor = () => {
    const colors = ['neon-green', 'cyan', 'hot-pink', 'lime', 'violet', 'orange', 'yellow', 'teal', 'magenta'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getRandomPattern = () => {
    const patterns = ['default', 'webdev', 'neural', 'gamedev'];
    return patterns[Math.floor(Math.random() * patterns.length)];
  };

  const handleClick = (e) => {
    if (activeMode !== 'click' || timeoutRef.current) return;
    const finalColor = colorProfile === 'random' ? getRandomColor() : colorProfile;
    const finalPattern = pattern === 'random' ? getRandomPattern() : pattern;
    const gradientDir = gradientDirection === 'left-to-right' ? 'to right' : 'to bottom';
    
    const newEffect = { 
      id: Date.now(), x: e.clientX, y: e.clientY, area: 100, density: clickDensity,
      fullViewport: false, scrollY: window.scrollY, effectDuration, fallSpeed,
      colorProfile: useGradient ? 'gradient' : finalColor, pattern: finalPattern, 
      effectType, pulseStrength, flickerStrength,
      gradientStyle: useGradient ? { '--gradient': `linear-gradient(${gradientDir}, ${gradientColor1}, ${gradientColor2})` } : {}
    };
    setEffect(newEffect);
    timeoutRef.current = setTimeout(() => { setEffect(null); timeoutRef.current = null; }, effectDuration);
  };

  const handleScroll = () => {
    if (activeMode !== 'scroll' || timeoutRef.current) return;
    const finalColor = colorProfile === 'random' ? getRandomColor() : colorProfile;
    const finalPattern = pattern === 'random' ? getRandomPattern() : pattern;
    const gradientDir = gradientDirection === 'left-to-right' ? 'to right' : 'to bottom';
    
    const newEffect = { 
      id: Date.now(), x: 0, y: 0, area: 0, density: scrollDensity,
      fullViewport: true, scrollY: window.scrollY, effectDuration, fallSpeed,
      colorProfile: useGradient ? 'gradient' : finalColor, pattern: finalPattern, 
      effectType, pulseStrength, flickerStrength,
      gradientStyle: useGradient ? { '--gradient': `linear-gradient(${gradientDir}, ${gradientColor1}, ${gradientColor2})` } : {}
    };
    setEffect(newEffect);
    timeoutRef.current = setTimeout(() => { setEffect(null); timeoutRef.current = null; }, effectDuration);
  };

  const debounce = (func, wait) => {
    let timeout;
    return (...args) => { clearTimeout(timeout); timeout = setTimeout(() => func(...args), wait); };
  };

  useEffect(() => {
    if (timeoutRef.current) { clearTimeout(timeoutRef.current); timeoutRef.current = null; setEffect(null); }
    let debouncedScroll;
    if (activeMode === 'click') { window.addEventListener('click', handleClick); }
    else if (activeMode === 'scroll') { debouncedScroll = debounce(handleScroll, 200); window.addEventListener('scroll', debouncedScroll); }

    return () => {
      if (activeMode === 'click') { window.removeEventListener('click', handleClick); }
      else if (activeMode === 'scroll') { window.removeEventListener('scroll', debouncedScroll); }
      clearTimeout(timeoutRef.current);
    };
  }, [activeMode, clickDensity, scrollDensity, effectDuration, fallSpeed, enableClick, enableScroll, colorProfile, pattern, effectType, pulseStrength, flickerStrength, useGradient, gradientColor1, gradientColor2, gradientDirection]);

  return (
    <>
      {effect && (
        <MatrixRain
          key={effect.id}
          x={effect.x} y={effect.y} area={effect.area} fullViewport={effect.fullViewport}
          density={effect.density} scrollY={effect.scrollY} effectDuration={effect.effectDuration}
          fallSpeed={effect.fallSpeed}
          colorProfile={effect.colorProfile} pattern={effect.pattern}
          effectType={effect.effectType} pulseStrength={effect.pulseStrength}
          flickerStrength={effect.flickerStrength}
          style={effect.gradientStyle}
        />
      )}
    </>
  );
};

export default MatrixRainController;