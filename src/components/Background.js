import React, { useState, useEffect } from 'react';
import './Background.css';

function Background({ children, style }) {
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const updateHeight = () => {
      setHeight(window.innerHeight);
    };

    // Add event listener on mount
    window.addEventListener('resize', updateHeight);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return (
    <div className="background text" style={{ ...style, height: `${height}px` }}>
      {children}
    </div>
  );
}

export default Background;
