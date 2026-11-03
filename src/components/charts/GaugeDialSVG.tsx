/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface GaugeDialSVGProps {
  value: number; // For Net Balance: -6.0 to +6.0, For Hopelessness: 2.0 to 14.0
  min: number;
  max: number;
  title: string;
  subtitle?: string;
  type?: 'balance' | 'hopelessness';
}

export const GaugeDialSVG: React.FC<GaugeDialSVGProps> = ({
  value,
  min,
  max,
  title,
  subtitle,
  type = 'balance',
}) => {
  const size = 180;
  const strokeWidth = 14;
  const center = size / 2;
  const radius = center - strokeWidth - 6;

  // Arc angles (from 180deg to 0deg in SVG coords => -Math.PI to 0)
  const clampedVal = Math.min(Math.max(value, min), max);
  const percentage = (clampedVal - min) / (max - min);

  // Angle in radians from -PI to 0
  const angleRad = -Math.PI + percentage * Math.PI;

  // Pivot coords for Needle
  const needleLen = radius - 10;
  const needleX = center + needleLen * Math.cos(angleRad);
  const needleY = center + needleLen * Math.sin(angleRad);

  // Status & color scheme (friendly for laypeople)
  let colorClass = 'text-emerald-500';
  let badgeText = 'Visão Otimista Equilibrada';

  if (type === 'balance') {
    if (value >= 1.5) {
      colorClass = 'text-emerald-500';
      badgeText = 'Visão Fortemente Otimista';
    } else if (value >= 0) {
      colorClass = 'text-indigo-500';
      badgeText = 'Visão Otimista Equilibrada';
    } else if (value >= -1.5) {
      colorClass = 'text-amber-500';
      badgeText = 'Visão Atenta e Cautelosa';
    } else {
      colorClass = 'text-rose-500';
      badgeText = 'Vulnerável ao Desânimo';
    }
  } else {
    // Hopelessness index (staNeg + gloNeg) range 2 to 14
    if (value <= 6.0) {
      colorClass = 'text-emerald-500';
      badgeText = 'Elevado Resguardo (Protegido)';
    } else if (value <= 9.0) {
      colorClass = 'text-amber-500';
      badgeText = 'Insegurança Moderada';
    } else {
      colorClass = 'text-rose-500';
      badgeText = 'Alerta: Risco de Paralisação';
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs h-full">
      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider mb-1 text-center">
        {title}
      </h4>
      {subtitle && (
        <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-2 text-center">
          {subtitle}
        </p>
      )}

      <div className="relative flex items-center justify-center my-2">
        <svg width={size} height={size / 2 + 25} className="overflow-visible">
          {/* Background Semi-circle Arc */}
          <path
            d={`M ${center - radius} ${center} A ${radius} ${radius} 0 0 1 ${center + radius} ${center}`}
            fill="none"
            className="stroke-slate-200 dark:stroke-slate-700"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Color Gradients / Multi-color Arcs */}
          {type === 'balance' ? (
            <>
              {/* Red Zone (-6 to -1.5) */}
              <path
                d={`M ${center - radius} ${center} A ${radius} ${radius} 0 0 1 ${center - radius * 0.5} ${center - radius * 0.866}`}
                fill="none"
                className="stroke-rose-400"
                strokeWidth={strokeWidth}
              />
              {/* Amber Zone (-1.5 to 0) */}
              <path
                d={`M ${center - radius * 0.5} ${center - radius * 0.866} A ${radius} ${radius} 0 0 1 ${center} ${center - radius}`}
                fill="none"
                className="stroke-amber-400"
                strokeWidth={strokeWidth}
              />
              {/* Green Zone (0 to 6) */}
              <path
                d={`M ${center} ${center - radius} A ${radius} ${radius} 0 0 1 ${center + radius} ${center}`}
                fill="none"
                className="stroke-emerald-400"
                strokeWidth={strokeWidth}
              />
            </>
          ) : (
            <>
              {/* Green Zone (2 to 6) */}
              <path
                d={`M ${center - radius} ${center} A ${radius} ${radius} 0 0 1 ${center - radius * 0.5} ${center - radius * 0.866}`}
                fill="none"
                className="stroke-emerald-400"
                strokeWidth={strokeWidth}
              />
              {/* Amber Zone (6 to 9) */}
              <path
                d={`M ${center - radius * 0.5} ${center - radius * 0.866} A ${radius} ${radius} 0 0 1 ${center + radius * 0.3} ${center - radius * 0.95}`}
                fill="none"
                className="stroke-amber-400"
                strokeWidth={strokeWidth}
              />
              {/* Red Zone (9 to 14) */}
              <path
                d={`M ${center + radius * 0.3} ${center - radius * 0.95} A ${radius} ${radius} 0 0 1 ${center + radius} ${center}`}
                fill="none"
                className="stroke-rose-400"
                strokeWidth={strokeWidth}
              />
            </>
          )}

          {/* Center Needle */}
          <line
            x1={center}
            y1={center}
            x2={needleX}
            y2={needleY}
            className="stroke-slate-800 dark:stroke-slate-100"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle
            cx={center}
            cy={center}
            r="7"
            className="fill-slate-800 dark:fill-slate-100 stroke-white dark:stroke-slate-900"
            strokeWidth="2"
          />
        </svg>

        {/* Center Readout Value Overlay */}
        <div className="absolute bottom-0 text-center transform translate-y-1">
          <span className="text-xl font-black font-mono tracking-tight text-slate-900 dark:text-slate-100">
            {value > 0 && type === 'balance' ? `+${value.toFixed(2)}` : value.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="mt-2 text-center">
        <span className={`inline-block px-2.5 py-1 text-[11px] font-semibold rounded-md ${colorClass} bg-slate-100 dark:bg-slate-700/60`}>
          {badgeText}
        </span>
      </div>
    </div>
  );
};
