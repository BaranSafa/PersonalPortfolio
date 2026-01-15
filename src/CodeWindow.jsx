import React from 'react';
import { FaCircle } from 'react-icons/fa';
import './CodeWindow.css';

const CodeWindow = () => {
  return (
    <div className="code-window">
      <div className="window-header">
        <div className="window-controls">
          <FaCircle color="#ff5f56" size={12} />
          <FaCircle color="#ffbd2e" size={12} />
          <FaCircle color="#27c93f" size={12} />
        </div>
        <div className="window-filename">profile.py</div>
      </div>

      <div className="code-content">
        <div className="line">
          <span className="keyword">class</span> <span className="class-name">BaranTaskin</span>(<span className="parent-class">Engineer</span>):
        </div>
        
        <div className="line indent-1">
          <span className="keyword">def</span> <span className="function">__init__</span>(<span className="self">self</span>):
        </div>
        
        <div className="line indent-2">
          <span className="self">self</span>.name = <span className="string">"Baran Safa Taşkın"</span>
        </div>
        <div className="line indent-2">
          <span className="self">self</span>.role = <span className="string">"Computer Eng. Student"</span>
        </div>
        <div className="line indent-2">
          <span className="self">self</span>.stack = [<span className="string">"Python"</span>, <span className="string">"Machine Learning"</span>, <span className="string">"HTML"</span>]
        </div>

        <div className="line empty"></div>

        <div className="line indent-1">
          <span className="keyword">def</span> <span className="function">get_goal</span>(<span className="self">self</span>):
        </div>
        <div className="line indent-2">
          <span className="keyword">return</span> <span className="string">"Creating intelligent systems."</span>
        </div>
        
        <div className="line indent-2">
          <span className="cursor-block"></span>
        </div>
      </div>
    </div>
  );
};

export default CodeWindow;