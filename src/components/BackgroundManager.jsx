import React from 'react';
import './BackgroundManager.css';

/**
 * Renders the dynamic background based on weather condition.
 * @param {string} weatherMain - The main weather condition (e.g. 'Clear', 'Clouds', 'Rain', 'Snow', etc.)
 */
const BackgroundManager = ({ weatherMain }) => {
  // Determine class based on weather string
  let bgClass = 'bg-default';
  
  if (!weatherMain) {
    bgClass = 'bg-default';
  } else {
    const condition = weatherMain.toLowerCase();
    if (condition.includes('clear')) bgClass = 'bg-clear';
    else if (condition.includes('cloud')) bgClass = 'bg-clouds';
    else if (condition.includes('rain') || condition.includes('drizzle')) bgClass = 'bg-rain';
    else if (condition.includes('snow')) bgClass = 'bg-snow';
    else if (condition.includes('thunderstorm')) bgClass = 'bg-thunderstorm';
    else bgClass = 'bg-default';
  }

  return (
    <div className={`background-manager ${bgClass}`}>
      {/* Dynamic visual elements */}
      {bgClass === 'bg-clear' && (
        <div className="sun-container">
          <div className="sun"></div>
          <div className="sun-ray sr-1"></div>
          <div className="sun-ray sr-2"></div>
          <div className="sun-ray sr-3"></div>
          <div className="sun-ray sr-4"></div>
        </div>
      )}

      {bgClass === 'bg-rain' && (
        <div className="rain-container">
          {/* Generate multiple drops */}
          {Array.from({ length: 50 }).map((_, i) => (
            <div 
              key={i} 
              className="drop" 
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${0.5 + Math.random() * 0.5}s`,
                animationDelay: `${Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
      )}

      {bgClass === 'bg-snow' && (
        <div className="snow-container">
          {Array.from({ length: 50 }).map((_, i) => (
            <div 
              key={i} 
              className="snowflake" 
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${3 + Math.random() * 5}s`,
                animationDelay: `${Math.random() * 5}s`,
                width: `${4 + Math.random() * 6}px`,
                height: `${4 + Math.random() * 6}px`
              }}
            ></div>
          ))}
        </div>
      )}

      {bgClass === 'bg-clouds' && (
        <div className="clouds-container">
          <div className="cloud cloud-1"></div>
          <div className="cloud cloud-2"></div>
          <div className="cloud cloud-3"></div>
        </div>
      )}

      <div className="bg-overlay"></div>
    </div>
  );
};

export default BackgroundManager;
