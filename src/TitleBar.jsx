import { useState } from 'react';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { FaMinus, FaRegSquare, FaTimes } from 'react-icons/fa';
import './TitleBar.css';

const TitleBar = () => {
  const [isMaximized, setIsMaximized] = useState(false);


  const minimizeWindow = async () => 
    {
    await getCurrentWindow().minimize(); 
  };

  const toggleMaximizeWindow = async () => 
    {
    const win = getCurrentWindow();
    
    const max = await win.isMaximized();
    if (max) {
      await win.unmaximize();
      setIsMaximized(false);
    } else {
      await win.maximize();
      setIsMaximized(true);
    }
  };

  const closeWindow = async () => 
    {
    await getCurrentWindow().close();
  };

  return (
    <div data-tauri-drag-region className="titlebar">
      <div className="titlebar-branding">
        <img src="/profile.jpg" alt="Icon" className="titlebar-icon" />
        <span>Baran's Portfolio</span>
      </div>

      <div className="titlebar-controls">
        <button onClick={minimizeWindow} className="title-btn min">
          <FaMinus />
        </button>
        <button onClick={toggleMaximizeWindow} className="title-btn max">
          <FaRegSquare style={{ fontSize: '0.7rem' }} />
        </button>
        <button onClick={closeWindow} className="title-btn close">
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default TitleBar;