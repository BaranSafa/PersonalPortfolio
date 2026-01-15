import { useEffect, useState } from "react";
import "./StatCard.css";

const StatCard = ({ target, label, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2500; 
    const incrementTime = Math.abs(Math.floor(duration / target));
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, incrementTime > 0 ? incrementTime : 10);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="stat-card">
      <h3 className="stat-number">
        {count}{suffix}
      </h3>
      <p className="stat-label">{label}</p>
    </div>
  );
};

export default StatCard;