import React from 'react';
import { FaCircle } from 'react-icons/fa';
import './CodeWindow.css';

const CodeWindow = () => {
  return (
    <div className="code-window">
      <div className="window-header">
        <div className="window-controls">
          <FaCircle color="#ff5f56" size={11} />
          <FaCircle color="#ffbd2e" size={11} />
          <FaCircle color="#27c93f" size={11} />
        </div>
        <div className="window-filename">profile.py</div>
        <div className="window-lang">Python</div>
      </div>

      <div className="code-content">
        <div className="line">
          <span className="keyword">class</span>{" "}
          <span className="class-name">BaranTaskin</span>
          (<span className="parent-class">Engineer</span>):
        </div>

        <div className="line indent-1">
          <span className="comment"># Building intelligent systems, one line at a time.</span>
        </div>

        <div className="line empty" />

        <div className="line indent-1">
          <span className="keyword">def</span>{" "}
          <span className="function">__init__</span>
          (<span className="self">self</span>):
        </div>

        <div className="line indent-2">
          <span className="self">self</span>.name{" "}
          <span className="operator">=</span>{" "}
          <span className="string">"Baran Safa Taşkın"</span>
        </div>
        <div className="line indent-2">
          <span className="self">self</span>.role{" "}
          <span className="operator">=</span>{" "}
          <span className="string">"Computer Engineering Student"</span>
        </div>
        <div className="line indent-2">
          <span className="self">self</span>.stack{" "}
          <span className="operator">=</span>{" "}
          [<span className="string">"Python"</span>,{" "}
          <span className="string">"React"</span>,{" "}
          <span className="string">"ML"</span>]
        </div>
        <div className="line indent-2">
          <span className="self">self</span>.location{" "}
          <span className="operator">=</span>{" "}
          <span className="string">"İstanbul, 🇹🇷"</span>
        </div>

        <div className="line empty" />

        <div className="line indent-1">
          <span className="keyword">def</span>{" "}
          <span className="function">get_goal</span>
          (<span className="self">self</span>):
        </div>
        <div className="line indent-2">
          <span className="keyword">return</span>{" "}
          <span className="string">"Create intelligent systems that matter."</span>
        </div>

        <div className="line empty" />

        <div className="line indent-1">
          <span className="keyword">def</span>{" "}
          <span className="function">is_available</span>
          (<span className="self">self</span>):
        </div>
        <div className="line indent-2">
          <span className="keyword">return</span>{" "}
          <span className="boolean">True</span>
          <span className="comment">  # Open to work!</span>
        </div>

        <div className="line empty" />

        <div className="line">
          <span className="self">me</span>{" "}
          <span className="operator">=</span>{" "}
          <span className="class-name">BaranTaskin</span>()
        </div>
        <div className="line">
          <span className="function">print</span>(<span className="self">me</span>.is_available())
          <span className="cursor-block" />
        </div>
      </div>
    </div>
  );
};

export default CodeWindow;
