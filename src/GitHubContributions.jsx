import { useEffect, useState } from "react";
import "./GitHubContributions.css";

const LEVEL_COLORS = [
  "rgba(22,46,147,0.12)",
  "rgba(47,47,228,0.28)",
  "rgba(47,47,228,0.52)",
  "rgba(47,47,228,0.76)",
  "#2F2FE4",
];

export default function GitHubContributions({ username }) {
  const [weeks, setWeeks] = useState([]);
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then(r => r.json())
      .then(json => {
        const days = json.contributions || [];
        const grouped = [];
        let week = [];
        days.forEach(day => {
          week.push(day);
          if (week.length === 7) { grouped.push(week); week = []; }
        });
        if (week.length) grouped.push(week);
        setWeeks(grouped);
        const year = new Date().getFullYear();
        setTotal(json.total?.[year] ?? days.reduce((s, d) => s + d.count, 0));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [username]);

  if (loading) return <p className="contrib-status">Loading contribution data…</p>;
  if (!weeks.length) return <p className="contrib-status">Could not load contributions.</p>;

  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const monthLabels = [];
  weeks.forEach((week, wi) => {
    const d = new Date(week[0].date);
    if (wi === 0 || d.getDate() <= 7) {
      monthLabels.push({ index: wi, label: MONTHS[d.getMonth()] });
    }
  });

  return (
    <div className="contrib-wrapper">
      <div className="contrib-header">
        <span className="contrib-count">{total} contributions in the last year</span>
        <div className="contrib-legend">
          <span>Less</span>
          {LEVEL_COLORS.map((c, i) => (
            <div key={i} className="contrib-legend-box" style={{ background: c }} />
          ))}
          <span>More</span>
        </div>
      </div>

      <div className="contrib-scroll">
        <div className="contrib-months">
          {monthLabels.map(({ index, label }) => (
            <span key={index} style={{ gridColumn: index + 1 }}>{label}</span>
          ))}
        </div>
        <div className="contrib-grid">
          {weeks.map((week, wi) => (
            <div key={wi} className="contrib-week">
              {week.map((day, di) => (
                <div
                  key={di}
                  className="contrib-day"
                  style={{ background: LEVEL_COLORS[day.level] ?? LEVEL_COLORS[0] }}
                  title={`${day.date}: ${day.count} contribution${day.count !== 1 ? "s" : ""}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
