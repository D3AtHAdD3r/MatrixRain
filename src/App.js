import React, { useState } from 'react';
import MatrixRainController from './Components/Version2.0/MatrixRainController';
import MatrixRainControls from './Components/Version2.0/MatrixRainControls';

const App = () => {
  const [clickDensity, setClickDensity] = useState(10);
  const [scrollDensity, setScrollDensity] = useState(75);
  const [effectDuration, setEffectDuration] = useState(2500);
  const [fallSpeed, setFallSpeed] = useState(75); // Already a multiple of 25
  const [mode, setMode] = useState('scroll');
  const [colorProfile, setColorProfile] = useState('neon-green');
  const [pattern, setPattern] = useState('default');
  const [effectType, setEffectType] = useState('none');
  const [pulseStrength, setPulseStrength] = useState(1);
  const [flickerStrength, setFlickerStrength] = useState(30);
  const [useGradient, setUseGradient] = useState(false);
  const [gradientColor1, setGradientColor1] = useState('#39ff14');
  const [gradientColor2, setGradientColor2] = useState('#00ffff');
  const [gradientDirection, setGradientDirection] = useState('top-to-bottom');

  return (
    <div 
      className="app" 
      style={{ 
        height: '200vh', 
        textAlign: 'center', 
        padding: '20px', 
        background: 'linear-gradient(to bottom, #1a1a1a, #0a0a0a)', 
        color: '#ffffff'
      }}
    >
      <h1>Scroll or Click Anywhere</h1>
      <MatrixRainControls
        clickDensity={clickDensity} setClickDensity={setClickDensity}
        scrollDensity={scrollDensity} setScrollDensity={setScrollDensity}
        effectDuration={effectDuration} setEffectDuration={setEffectDuration}
        fallSpeed={fallSpeed} setFallSpeed={setFallSpeed}
        mode={mode} setMode={setMode}
        colorProfile={colorProfile} setColorProfile={setColorProfile}
        pattern={pattern} setPattern={setPattern}
        effectType={effectType} setEffectType={setEffectType}
        pulseStrength={pulseStrength} setPulseStrength={setPulseStrength}
        flickerStrength={flickerStrength} setFlickerStrength={setFlickerStrength}
        useGradient={useGradient} setUseGradient={setUseGradient}
        gradientColor1={gradientColor1} setGradientColor1={setGradientColor1}
        gradientColor2={gradientColor2} setGradientColor2={setGradientColor2}
        gradientDirection={gradientDirection} setGradientDirection={setGradientDirection}
      />
      <MatrixRainController
        clickDensity={clickDensity} scrollDensity={scrollDensity}
        effectDuration={effectDuration} fallSpeed={fallSpeed}
        enableClick={mode === 'click'} enableScroll={mode === 'scroll'}
        colorProfile={colorProfile} pattern={pattern}
        effectType={effectType} pulseStrength={pulseStrength}
        flickerStrength={flickerStrength}
        useGradient={useGradient} gradientColor1={gradientColor1} gradientColor2={gradientColor2}
        gradientDirection={gradientDirection}
      />
    </div>
  );
};

export default App;