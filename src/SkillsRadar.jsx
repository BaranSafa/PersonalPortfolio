import React from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, ResponsiveContainer, Tooltip
} from 'recharts';

const data = [
  { subject: 'Python & ML',    A: 90, fullMark: 100 },
  { subject: 'Deep Learning',  A: 80, fullMark: 100 },
  { subject: 'React / JS',     A: 80, fullMark: 100 },
  { subject: 'HTML / CSS',     A: 85, fullMark: 100 },
  { subject: 'SQL',            A: 75, fullMark: 100 },
  { subject: 'Algorithms',     A: 75, fullMark: 100 },
  { subject: 'C# / .NET',      A: 70, fullMark: 100 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: '#1e293b',
        border: '1px solid rgba(56,189,248,0.25)',
        borderRadius: '10px',
        padding: '8px 14px',
        color: '#38bdf8',
        fontSize: '0.85rem',
        fontWeight: 600,
      }}>
        {payload[0].payload.subject}: {payload[0].value}%
      </div>
    );
  }
  return null;
};

const SkillsRadar = () => (
  <div style={{ width: '100%', height: 380 }}>
    <ResponsiveContainer>
      <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
        <PolarGrid stroke="rgba(255,255,255,0.08)" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
        />
        <PolarRadiusAxis
          angle={30}
          domain={[0, 100]}
          tick={false}
          axisLine={false}
        />
        <Radar
          name="Skill Level"
          dataKey="A"
          stroke="#38bdf8"
          strokeWidth={2.5}
          fill="#38bdf8"
          fillOpacity={0.25}
          dot={{ fill: '#38bdf8', r: 4 }}
        />
        <Tooltip content={<CustomTooltip />} />
      </RadarChart>
    </ResponsiveContainer>
  </div>
);

export default SkillsRadar;
