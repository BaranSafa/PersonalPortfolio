import { useState } from 'react';
import { FaMinus, FaRegSquare, FaTimes } from 'react-icons/fa';
import './TitleBar.css';

const isTauri = typeof window !== 'undefined' && Boolean(window.__TAURI_INTERNALS__);

const TitleBar = () => {
  const [isMaximized, setIsMaximized] = useState(false);

  const minimize = async () => {
    if (!isTauri) return;
    const { getCurrentWindow } = await import('@tauri-apps/api/window');
    await getCurrentWindow().minimize();
  };

  const toggleMaximize = async () => {
    if (!isTauri) return;
    const { getCurrentWindow } = await import('@tauri-apps/api/window');
    const win = getCurrentWindow();
    const max = await win.isMaximized();
    if (max) { await win.unmaximize(); setIsMaximized(false); }
    else      { await win.maximize();  setIsMaximized(true);  }
  };

  const close = async () => {
    if (!isTauri) return;
    const { getCurrentWindow } = await import('@tauri-apps/api/window');
    await getCurrentWindow().close();
  };

  if (!isTauri) return null;

  return (
    <div data-tauri-drag-region className="titlebar">
      <div className="titlebar-branding">
        <img src="/profile.jpg" alt="Icon" className="titlebar-icon" />
        <span>Baran's Portfolio</span>
      </div>
      <div className="titlebar-controls">
        <button onClick={minimize}       className="title-btn min">  <FaMinus /> </button>
        <button onClick={toggleMaximize} className="title-btn max">  <FaRegSquare style={{ fontSize: '0.7rem' }} /> </button>
        <button onClick={close}          className="title-btn close"> <FaTimes />  </button>
      </div>
    </div>
  );
};

export default TitleBar;
