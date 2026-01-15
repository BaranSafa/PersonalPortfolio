import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { subject: 'Python & Machine Learning', A: 90, fullMark: 100 },
  { subject: 'HTML & CSS', A: 85, fullMark: 100 },
  { subject: 'SQL', A: 75, fullMark: 100 },
  { subject: 'Tauri', A: 70, fullMark: 100 },
  { subject: 'Algorithms', A: 75, fullMark: 100 }, 
];

const SkillsRadar = () => {
  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          
          <PolarGrid stroke="rgba(255, 255, 255, 0.2)" />
          
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#cbd5e1', fontSize: 13, fontWeight: 'bold' }} 
          />
          
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          
          <Radar
            name="Skill Level"
            dataKey="A"
            stroke="#38bdf8"
            strokeWidth={3}
            fill="#38bdf8"
            fillOpacity={0.4}
          />

          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1e293b', 
              borderRadius: '10px', 
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#fff'
            }}
            itemStyle={{ color: '#38bdf8' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillsRadar;