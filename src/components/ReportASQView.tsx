/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  AlertTriangle,
  Brain,
  CheckCircle2,
  Compass,
  Printer,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { ASQReport } from '../types/pcq_asq.ts';
import { GroupedBarChartSVG } from './charts/GroupedBarChartSVG.tsx';
import { GaugeDialSVG } from './charts/GaugeDialSVG.tsx';

interface ReportASQViewProps {
  report: ASQReport;
  onNewAssessment: () => void;
  onOpenHistory: () => void;
  onOpenAudit?: () => void;
}

export const ReportASQView: React.FC<ReportASQViewProps> = ({
  report,
  onNewAssessment,
  onOpenHistory,
  onOpenAudit,
}) => {
  const {
    participant,
    calculatedAt,
    scores,
    positiveProfile,
    negativeProfile,
    strengths,
    cautions,
    professionalImpacts,
    developmentRecommendations,
  } = report;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Top Action Bar (No-Print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs dark:shadow-xl no-print">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600/15 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
              Relatório de Estilo de Atribuição (ASQ)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Assessment COMET · Peterson et al. (1982)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
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
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Nova Avaliação</span>
          </button>
        </div>
      </div>

      {/* Header Executivo */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs dark:shadow-2xl relative overflow-hidden">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
            <div>
              <span className="text-[11px] font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
                Metodologia COMET · Relatório Individual ASQ
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
                ESTILO DE ATRIBUIÇÃO EXPLICATIVA (ASQ)
              </h1>
            </div>
            <div className="text-left sm:text-right text-xs text-slate-500 dark:text-slate-400 font-mono">
              <div>Emissão: <span className="text-slate-900 dark:text-white font-semibold">{calculatedAt}</span></div>
              <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">Versão Oficial: Peterson et al. (1982)</div>
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

      {/* Gráficos Visuais do ASQ */}
      <section className="space-y-6">
        <GroupedBarChartSVG
          intPos={scores.internalityPos}
          intNeg={scores.internalityNeg}
          staPos={scores.stabilityPos}
          staNeg={scores.stabilityNeg}
          gloPos={scores.globalityPos}
          gloNeg={scores.globalityNeg}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GaugeDialSVG
            value={scores.compositeTotal}
            min={-6}
            max={6}
            title="Índice de Otimismo Causal"
            subtitle="Balanço entre como você interpreta seus sucessos e desafios"
            type="balance"
          />
          <GaugeDialSVG
            value={scores.hopelessnessIndex}
            min={2}
            max={14}
            title="Índice de Vulnerabilidade Cognitiva"
            subtitle="Grau de resguardo emocional e resiliência diante de erros"
            type="hopelessness"
          />
        </div>
      </section>

      {/* Perfis de Atribuição */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400">
              Atribuição de Sucesso (Eventos Positivos)
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300">
              {positiveProfile.level}
            </span>
          </div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white">{positiveProfile.title}</h4>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
            {positiveProfile.description}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-amber-600 dark:text-amber-400">
              Atribuição de Adversidades (Eventos Negativos)
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300">
              {negativeProfile.level}
            </span>
          </div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white">{negativeProfile.title}</h4>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
            {negativeProfile.description}
          </p>
        </div>
      </section>
    </div>
  );
};
