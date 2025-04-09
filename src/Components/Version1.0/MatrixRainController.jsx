import React, { useState, useEffect, useRef } from 'react';
import MatrixRain from './MatrixRain';

const MatrixRainController = ({
  clickDensity = 20,
  scrollDensity = 50,
  effectDuration = 2000,
  enableClick = true,
  enableScroll = false,
}) => {
  const [effect, setEffect] = useState(null);
  const timeoutRef = useRef(null);

  // Enforce mutual exclusivity
  const activeMode = enableClick ? 'click' : enableScroll ? 'scroll' : null;

  // Handle click event
  const handleClick = (e) => {
    if (activeMode !== 'click' || timeoutRef.current) return;
    const newEffect = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
      area: 100,
      density: clickDensity,
      fullViewport: false,
      scrollY: window.scrollY,
      effectDuration,
    };
    setEffect(newEffect);
    timeoutRef.current = setTimeout(() => {
      setEffect(null);
      timeoutRef.current = null;
    }, effectDuration);
  };

  // Handle scroll event
  const handleScroll = () => {
    if (activeMode !== 'scroll' || timeoutRef.current) return;
    const newEffect = {
      id: Date.now(),
      x: 0,
      y: 0,
      area: 0,
      density: scrollDensity,
      fullViewport: true,
      scrollY: window.scrollY,
      effectDuration,
    };
    setEffect(newEffect);
    timeoutRef.current = setTimeout(() => {
      setEffect(null);
      timeoutRef.current = null;
    }, effectDuration);
  };

  // Debounce utility
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  useEffect(() => {
    // Cleanup previous listeners and timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      setEffect(null); // Reset effect on prop change
    }

    let debouncedScroll;
    if (activeMode === 'click') {
      window.addEventListener('click', handleClick);
    } else if (activeMode === 'scroll') {
      debouncedScroll = debounce(handleScroll, 200);
      window.addEventListener('scroll', debouncedScroll);
    }

    return () => {
      if (activeMode === 'click') {
        window.removeEventListener('click', handleClick);
      } else if (activeMode === 'scroll') {
        window.removeEventListener('scroll', debouncedScroll);
      }
      clearTimeout(timeoutRef.current);
    };
  }, [activeMode, clickDensity, scrollDensity, effectDuration, enableClick, enableScroll]); // All props as dependencies

  return (
    <>
      {effect && (
        <MatrixRain
          key={effect.id}
          x={effect.x}
          y={effect.y}
          area={effect.area}
          fullViewport={effect.fullViewport}
          density={effect.density}
          scrollY={effect.scrollY}
          effectDuration={effect.effectDuration}
        />
      )}
    </>
  );
};

export default MatrixRainController;