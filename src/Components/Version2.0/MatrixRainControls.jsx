import React from 'react';

const MatrixRainControls = ({
  clickDensity, setClickDensity, scrollDensity, setScrollDensity,
  effectDuration, setEffectDuration, fallSpeed, setFallSpeed,
  mode, setMode, colorProfile, setColorProfile, pattern, setPattern,
  effectType, setEffectType, pulseStrength, setPulseStrength,
  flickerStrength, setFlickerStrength,
  useGradient, setUseGradient, gradientColor1, setGradientColor1,
  gradientColor2, setGradientColor2, gradientDirection, setGradientDirection
}) => {
  const colorOptions = [
    'neon-green', 'cyan', 'hot-pink', 'lime', 'violet', 'orange', 'yellow', 'teal', 'magenta', 'random'
  ];
  const patternOptions = ['default', 'webdev', 'neural', 'gamedev', 'random'];
  const effectOptions = ['none', 'pulse', 'flicker'];
  const gradientDirections = ['top-to-bottom', 'left-to-right'];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
      <div>
        <button onClick={() => setClickDensity(Math.max(1, clickDensity - 1))}>-</button>
        <span>Click Density [{clickDensity}]</span>
        <button onClick={() => setClickDensity(clickDensity + 1)}>+</button>
      </div>
      <div>
        <button onClick={() => setScrollDensity(Math.max(1, scrollDensity - 1))}>-</button>
        <span>Scroll Density [{scrollDensity}]</span>
        <button onClick={() => setScrollDensity(scrollDensity + 1)}>+</button>
      </div>
      <div>
        <button onClick={() => setEffectDuration(Math.max(500, effectDuration - 500))}>-</button>
        <span>Duration [{effectDuration}ms]</span>
        <button onClick={() => setEffectDuration(effectDuration + 500)}>+</button>
      </div>
      <div>
        <button onClick={() => setFallSpeed(Math.max(0, fallSpeed - 25))}>-</button>
        <span>Fall Speed [{fallSpeed}px/s]</span>
        <button onClick={() => setFallSpeed(Math.min(500, fallSpeed + 25))}>+</button>
      </div>
      <button onClick={() => setMode(mode === 'click' ? 'scroll' : 'click')}>
        Switch to {mode === 'click' ? 'Scroll' : 'Click'}
      </button>
      <select value={colorProfile} onChange={(e) => setColorProfile(e.target.value)} disabled={useGradient}>
        {colorOptions.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <select value={pattern} onChange={(e) => setPattern(e.target.value)}>
        {patternOptions.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <select value={effectType} onChange={(e) => setEffectType(e.target.value)}>
        {effectOptions.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      {effectType === 'pulse' && (
        <div>
          <button onClick={() => setPulseStrength(Math.max(1, pulseStrength - 1))}>-</button>
          <span>Pulse Strength [{pulseStrength}]</span>
          <button onClick={() => setPulseStrength(Math.min(3, pulseStrength + 1))}>+</button>
        </div>
      )}
      {effectType === 'flicker' && (
        <div>
          <button onClick={() => setFlickerStrength(Math.max(0, flickerStrength - 10))}>-</button>
          <span>Flicker Strength [{flickerStrength}%]</span>
          <button onClick={() => setFlickerStrength(Math.min(100, flickerStrength + 10))}>+</button>
        </div>
      )}
      <div>
        <label>
          <input
            type="checkbox"
            checked={useGradient}
            onChange={() => setUseGradient(!useGradient)}
          />
          Use Gradient
        </label>
        {useGradient && (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input
              type="color"
              value={gradientColor1}
              onChange={(e) => setGradientColor1(e.target.value)}
            />
            <input
              type="color"
              value={gradientColor2}
              onChange={(e) => setGradientColor2(e.target.value)}
            />
            <select
              value={gradientDirection}
              onChange={(e) => setGradientDirection(e.target.value)}
            >
              {gradientDirections.map(dir => (
                <option key={dir} value={dir}>{dir}</option>
              ))}
            </select>
          </div>
        )}
      </div>
      <p>
        Mode: {mode}, Color: {useGradient ? 'Gradient' : colorProfile}, Pattern: {pattern}, 
        Effect: {effectType}
        {effectType === 'pulse' && `, Pulse Strength: ${pulseStrength}`}
        {effectType === 'flicker' && `, Flicker Strength: ${flickerStrength}%`}
        {useGradient && `, Gradient: ${gradientColor1} to ${gradientColor2} (${gradientDirection})`}
      </p>
    </div>
  );
};

export default MatrixRainControls;