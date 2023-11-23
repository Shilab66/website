import React, { useState, useEffect } from 'react';
import './App.css'; // Create a CSS file for styling

const App = () => {
  const [loadingBars, setLoadingBars] = useState(0);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Simulate loading screen
    const loadingInterval = setInterval(() => {
      if (loadingBars < 100) {
        setLoadingBars(loadingBars + 10);
      } else {
        clearInterval(loadingInterval);
        setShowTerminal(true);
      }
    }, 500);

    // Simulate glitch effect
    const glitchTimeout = setTimeout(() => {
      setShowTerminal(false);
      setTimeout(() => {
        setShowTerminal(true);
      }, 200);
    }, 3000);

    // Clean up intervals and timeouts
    return () => {
      clearInterval(loadingInterval);
      clearTimeout(glitchTimeout);
    };
  }, [loadingBars]);

  useEffect(() => {
    // Typewriter animation for text
    if (showTerminal) {
      const textTimeout = setTimeout(() => {
        setShowText(true);
      }, 500);

      return () => {
        clearTimeout(textTimeout);
      };
    }
  }, [showTerminal]);

  return (
    <div className="app">
      {loadingBars < 100 && (
        <div className="loading-screen">
          <div className="loading-bar" style={{ width: `${loadingBars}%` }}></div>
        </div>
      )}

      {showTerminal && (
        <div className="terminal">
          {showText && (
            <div className="terminal-text">
              <div className="typewriter">
                <div>Aanshi Patel</div>
                <div>$&nbsp;</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
