/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  AlertTriangle,
  Award,
  BarChart3,
  Brain,
  CheckCircle2,
  Printer,
  RotateCcw,
  Sparkles,
  Target,
} from 'lucide-react';
import { PCQ24Report } from '../types/pcq_asq.ts';
import { RadarChartSVG } from './charts/RadarChartSVG.tsx';

interface ReportPCQ24ViewProps {
  report: PCQ24Report;
  onNewAssessment: () => void;
  onOpenHistory: () => void;
  onOpenAudit?: () => void;
}

export const ReportPCQ24View: React.FC<ReportPCQ24ViewProps> = ({
  report,
  onNewAssessment,
  onOpenHistory,
  onOpenAudit,
}) => {
  const {
    participant,
    calculatedAt,
    meanScoreTotal,
    rawScoreTotal,
    overallLevelLabel,
    overallDescription,
    efficacy,
    hope,
    resilience,
    optimism,
  } = report;

  const handlePrint = () => {
    window.print();
  };

  const dimensions = [efficacy, hope, resilience, optimism];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Barra de Ações Superior (No-Print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs dark:shadow-xl no-print">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/15 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
              Relatório de Capital Psicológico (PCQ-24)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Assessment COMET · Luthans, Avolio & Avey (2007)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Imprimir / PDF</span>
          </button>
          <button
            onClick={onOpenHistory}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold cursor-pointer"
          >
            Histórico
          </button>
          <button
            onClick={onNewAssessment}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Nova Avaliação</span>
          </button>
        </div>
      </div>

      {/* Cartão de Cabeçalho Executivo */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs dark:shadow-2xl relative overflow-hidden">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
            <div>
              <span className="text-[11px] font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
                Metodologia COMET · Relatório Individual PCQ-24
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
                CAPITAL PSICOLÓGICO (PSYCAP)
              </h1>
            </div>
            <div className="text-left sm:text-right text-xs text-slate-500 dark:text-slate-400 font-mono">
              <div>Emissão: <span className="text-slate-900 dark:text-white font-semibold">{calculatedAt}</span></div>
              <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">Versão Oficial: Luthans et al. (2007)</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Participante</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">{participant.name}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Função / Cargo</span>
              <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{participant.role || 'Não informado'}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Organização</span>
              <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{participant.organization || 'Não informada'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Resultado Geral do PsyCap & Gráfico Radar */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Índice de Ordem Superior
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">{overallLevelLabel}</h3>
            </div>
            <div className="flex items-baseline gap-2 bg-indigo-50/60 dark:bg-indigo-950/40 px-4 py-2.5 rounded-xl border border-indigo-100 dark:border-indigo-900/40">
              <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400 font-mono tabular-nums">{meanScoreTotal.toFixed(2)}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">/ 6.00 (Bruto: {rawScoreTotal}/144)</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{overallDescription}</p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            {dimensions.map((dim) => (
              <div key={dim.dimensionKey} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800 dark:text-slate-200">{dim.dimensionTitle}</span>
                  <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{dim.meanScore.toFixed(2)}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-indigo-600 dark:bg-indigo-400 rounded-full" style={{ width: `${(dim.meanScore / 6) * 100}%` }} />
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{dim.levelLabel}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Gráfico Radar SVG */}
        <div className="lg:col-span-1 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center shadow-xs">
          <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
            Gráfico de Radar PsyCap
          </h4>
          <RadarChartSVG
            efficacy={efficacy.meanScore}
            hope={hope.meanScore}
            resilience={resilience.meanScore}
            optimism={optimism.meanScore}
            size={260}
          />
        </div>
      </section>

      {/* Detalhamento das 4 Dimensões */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight border-b border-slate-200 dark:border-slate-800 pb-3">
          Detalhamento por Dimensão Psicológica
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dimensions.map((dim) => (
            <div key={dim.dimensionKey} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{dim.dimensionTitle}</h3>
                <span className="px-2.5 py-1 rounded bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 font-mono font-bold text-xs">
                  {dim.meanScore.toFixed(2)} / 6.00
                </span>
              </div>

              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                {dim.description}
              </p>

              <div className="space-y-3 pt-1 text-xs">
                <div>
                  <span className="font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 text-[10px] block mb-1">
                    Fortalezas Comportamentais
                  </span>
                  <ul className="space-y-1 text-slate-700 dark:text-slate-300 list-disc pl-4">
                    {dim.strengths.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 text-[10px] block mb-1">
                    Pontos de Cautela
                  </span>
                  <ul className="space-y-1 text-slate-700 dark:text-slate-300 list-disc pl-4">
                    {dim.cautions.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
