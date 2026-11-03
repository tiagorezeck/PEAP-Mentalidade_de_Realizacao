/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface RadarChartSVGProps {
  efficacy: number; // 1 to 6
  hope: number;     // 1 to 6
  resilience: number; // 1 to 6
  optimism: number; // 1 to 6
  size?: number;
}

export const RadarChartSVG: React.FC<RadarChartSVGProps> = ({
  efficacy,
  hope,
  resilience,
  optimism,
  size = 320,
}) => {
  const center = size / 2;
  const maxRadius = center - 50; // leave room for labels
  const maxScore = 6;

  // 4 corners: Top (Hope), Right (Efficacy), Bottom (Optimism), Left (Resilience)
  const dimensions = [
    { label: 'Esperança', score: hope, angle: -Math.PI / 2, color: '#10b981' },
    { label: 'Autoeficácia', score: efficacy, angle: 0, color: '#6366f1' },
    { label: 'Otimismo', score: optimism, angle: Math.PI / 2, color: '#8b5cf6' },
    { label: 'Resiliência', score: resilience, angle: Math.PI, color: '#f59e0b' },
  ];

  // Helper to get coordinates
  const getCoords = (angle: number, radius: number) => {
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  // Concentric grid polygons (levels 2, 4, 6)
  const gridLevels = [2, 4, 6];
  const gridPolygons = gridLevels.map((lvl) => {
    const r = (lvl / maxScore) * maxRadius;
    const points = dimensions.map((d) => {
      const { x, y } = getCoords(d.angle, r);
      return `${x},${y}`;
    }).join(' ');
    return { level: lvl, points };
  });

  // User Score Polygon
  const userPoints = dimensions.map((d) => {
    const clampedScore = Math.min(Math.max(d.score, 1), 6);
    const r = (clampedScore / maxScore) * maxRadius;
    const { x, y } = getCoords(d.angle, r);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="flex flex-col items-center justify-center p-2">
      <svg width={size} height={size} className="overflow-visible">
        {/* Background Grid Rings */}
        {gridPolygons.map((g) => (
          <g key={g.level}>
            <polygon
              points={g.points}
              className="fill-none stroke-slate-200 dark:stroke-slate-700/60"
              strokeWidth="1.5"
              strokeDasharray={g.level < 6 ? '3,3' : undefined}
            />
            {/* Level Label */}
            <text
              x={center + 6}
              y={center - (g.level / maxScore) * maxRadius + 4}
              className="text-[10px] fill-slate-400 dark:fill-slate-500 font-mono font-medium"
            >
              {g.level}.0
            </text>
          </g>
        ))}

        {/* Axis Lines */}
        {dimensions.map((d, i) => {
          const outer = getCoords(d.angle, maxRadius);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={outer.x}
              y2={outer.y}
              className="stroke-slate-200 dark:stroke-slate-700/70"
              strokeWidth="1.5"
            />
          );
        })}

        {/* User Data Filled Area */}
        <polygon
          points={userPoints}
          className="fill-indigo-500/25 dark:fill-indigo-400/30 stroke-indigo-600 dark:stroke-indigo-400"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* User Data Vertex Points */}
        {dimensions.map((d, i) => {
          const clampedScore = Math.min(Math.max(d.score, 1), 6);
          const r = (clampedScore / maxScore) * maxRadius;
          const pt = getCoords(d.angle, r);
          return (
            <g key={i}>
              <circle
                cx={pt.x}
                cy={pt.y}
                r="6"
                fill={d.color}
                className="stroke-white dark:stroke-slate-900 shadow-md"
                strokeWidth="2"
              />
              <circle
                cx={pt.x}
                cy={pt.y}
                r="2"
                fill="#ffffff"
              />
            </g>
          );
        })}

        {/* Outer Dimension Labels */}
        {dimensions.map((d, i) => {
          const labelRadius = maxRadius + 28;
          const pt = getCoords(d.angle, labelRadius);

          // Text alignment based on position
          let textAnchor: 'start' | 'end' | 'middle' = 'middle';
          if (d.angle === 0) textAnchor = 'start';
          if (d.angle === Math.PI) textAnchor = 'end';

          return (
            <g key={`label-${i}`} transform={`translate(${pt.x}, ${pt.y})`}>
              <text
                textAnchor={textAnchor}
                dy="0.3em"
                className="text-xs font-semibold fill-slate-800 dark:fill-slate-200 tracking-tight"
              >
                {d.label}
              </text>
              <text
                textAnchor={textAnchor}
                dy="1.6em"
                className="text-[11px] font-bold font-mono fill-indigo-600 dark:fill-indigo-400"
              >
                {d.score.toFixed(2)} / 6.0
              </text>
            </g>
          );
        })}
      </svg>
      <div className="mt-3 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
          Perfil PsyCap (1 a 6)
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm border border-dashed border-slate-400"></span>
          Linhas de Referência
        </span>
      </div>
    </div>
  );
};
