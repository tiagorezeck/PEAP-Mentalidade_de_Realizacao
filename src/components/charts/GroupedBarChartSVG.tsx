/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface GroupedBarChartSVGProps {
  intPos: number;
  intNeg: number;
  staPos: number;
  staNeg: number;
  gloPos: number;
  gloNeg: number;
}

export const GroupedBarChartSVG: React.FC<GroupedBarChartSVGProps> = ({
  intPos,
  intNeg,
  staPos,
  staNeg,
  gloPos,
  gloNeg,
}) => {
  const dimensions = [
    {
      name: 'Internalidade (EU)',
      pos: intPos,
      neg: intNeg,
      desc: 'Causalidade pessoal vs externa',
    },
    {
      name: 'Estabilidade (SEMPRE)',
      pos: staPos,
      neg: staNeg,
      desc: 'Causalidade duradoura vs temporária',
    },
    {
      name: 'Globalidade (TUDO)',
      pos: gloPos,
      neg: gloNeg,
      desc: 'Causalidade geral vs específica',
    },
  ];

  const maxVal = 7;

  return (
    <div className="w-full h-full bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-xs">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">
              Comparativo de Atribuição (CoPos vs CoNeg)
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Escala original ASQ de 1 a 7 pontos
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-medium">
            <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
              <span className="w-3 h-3 rounded bg-emerald-500 inline-block"></span>
              CoPos (Eventos Positivos)
            </span>
            <span className="flex items-center gap-1.5 text-rose-700 dark:text-rose-400">
              <span className="w-3 h-3 rounded bg-rose-500 inline-block"></span>
              CoNeg (Eventos Negativos)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {dimensions.map((dim, idx) => {
            const posPct = (dim.pos / maxVal) * 100;
            const negPct = (dim.neg / maxVal) * 100;

            return (
              <div
                key={idx}
                className="flex flex-col justify-between p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs h-full"
              >
                <div className="mb-2 min-h-[38px]">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block leading-tight">
                    {dim.name}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5 leading-tight">
                    {dim.desc}
                  </span>
                </div>

                {/* Vertical Bars representation */}
                <div className="relative h-44 flex items-end justify-center gap-4 pt-5 pb-6 border-b border-slate-100 dark:border-slate-700/50 my-1">
                  {/* Horizontal reference lines */}
                  <div className="absolute inset-x-0 top-1 border-t border-dashed border-slate-200 dark:border-slate-700/60 text-[9px] text-slate-400 pl-1">
                    7.0
                  </div>
                  <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-slate-200 dark:border-slate-700/40 text-[9px] text-slate-400 pl-1">
                    3.5
                  </div>

                  {/* Positive Bar */}
                  <div className="flex flex-col items-center gap-1 z-10">
                    <span className="text-[11px] font-bold font-mono text-emerald-600 dark:text-emerald-400">
                      {dim.pos.toFixed(2)}
                    </span>
                    <div className="w-6 bg-slate-100 dark:bg-slate-700 rounded-t-md h-28 relative overflow-hidden flex items-end">
                      <div
                        className="w-full bg-emerald-500 dark:bg-emerald-400 rounded-t-md transition-all duration-500"
                        style={{ height: `${posPct}%` }}
                      ></div>
                    </div>
                    <span className="text-[10px] font-medium text-emerald-700 dark:text-emerald-400">
                      Pos
                    </span>
                  </div>

                  {/* Negative Bar */}
                  <div className="flex flex-col items-center gap-1 z-10">
                    <span className="text-[11px] font-bold font-mono text-rose-600 dark:text-rose-400">
                      {dim.neg.toFixed(2)}
                    </span>
                    <div className="w-6 bg-slate-100 dark:bg-slate-700 rounded-t-md h-28 relative overflow-hidden flex items-end">
                      <div
                        className="w-full bg-rose-500 dark:bg-rose-400 rounded-t-md transition-all duration-500"
                        style={{ height: `${negPct}%` }}
                      ></div>
                    </div>
                    <span className="text-[10px] font-medium text-rose-700 dark:text-rose-400">
                      Neg
                    </span>
                  </div>
                </div>

                {/* Interpretation note */}
                <div className="mt-2 text-[10px] text-slate-600 dark:text-slate-300 leading-tight min-h-[24px] flex items-center">
                  {dim.pos > dim.neg ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      ✓ Atribuição mais forte nos sucessos (+{(dim.pos - dim.neg).toFixed(2)})
                    </span>
                  ) : (
                    <span className="text-amber-600 dark:text-amber-400 font-medium">
                      ⚠ Atribuição mais acentuada nas adversidades
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

