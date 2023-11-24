import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const App = () => {
  const [loadingBars, setLoadingBars] = useState(0);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showText, setShowText] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [terminalMessages, setTerminalMessages] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const loadingInterval = setInterval(() => {
      if (loadingBars < 100) {
        setLoadingBars(loadingBars + 10);
      } else {
        clearInterval(loadingInterval);
        setShowTerminal(true);
        inputRef.current.focus();
      }
    }, 500);

    const glitchTimeout = setTimeout(() => {
      setShowTerminal(false);
      setTimeout(() => {
        setShowTerminal(true);
      }, 200);
    }, 3000);

    return () => {
      clearInterval(loadingInterval);
      clearTimeout(glitchTimeout);
    };
  }, [loadingBars]);

  useEffect(() => {
    if (showTerminal) {
      const textTimeout = setTimeout(() => {
        setShowText(true);
      }, 500);

      return () => {
        clearTimeout(textTimeout);
      };
    }
  }, [showTerminal]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      handleCommand();
    }
  };

  const handleCommand = () => {
  const command = inputValue.trim().toLowerCase();

  // Combine user command and system response before updating the terminal messages
  const newMessages = [...terminalMessages, `$ ${inputValue}`, ''];

  if (command === 'help') {
    // Display the system response in the terminal
    newMessages.push('hello user');
  } else {
    // Display a default response for unrecognized commands
    newMessages.push(`Command not recognized: ${inputValue}`);
  }

  // Update terminal messages with both user command and system response
  setTerminalMessages(newMessages);

  setInputValue('');
};

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
              {terminalMessages.map((message, index) => (
                <div key={index}>{message}</div>
              ))}
              <div className="input-container">
                <div>$&nbsp;</div>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyPress={handleEnterPress}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
