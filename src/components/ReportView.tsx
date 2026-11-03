/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  Award,
  BarChart3,
  Brain,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Download,
  Eye,
  FileCheck2,
  HelpCircle,
  Lightbulb,
  Printer,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { AssessmentReport } from '../types/assessment.ts';

interface ReportViewProps {
  report: AssessmentReport;
  onNewAssessment: () => void;
  onOpenHistory: () => void;
  onOpenAudit: () => void;
}

export const ReportView: React.FC<ReportViewProps> = ({
  report,
  onNewAssessment,
  onOpenHistory,
  onOpenAudit,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'overview' | 'positivity' | 'optimism' | 'pessimism' | 'comet' | 'action_plan'>('all');

  const { participant, calculatedAt, positivity, optimism, pessimism, cometAnalysis, developmentPlan } = report;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Barra de Ações Superior do Relatório (No-Print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs dark:shadow-xl no-print transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/15 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">Relatório Individual Integrado</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Assessment COMET · Positividade & Orientação para o Futuro</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Imprimir / Salvar PDF</span>
          </button>
          <button
            onClick={onOpenHistory}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <span>Histórico</span>
          </button>
          <button
            onClick={onNewAssessment}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Nova Avaliação</span>
          </button>
        </div>
      </div>

      {/* Cabeçalho Oficial do Relatório Executivo */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs dark:shadow-2xl relative overflow-hidden transition-colors">
        <div className="relative space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
            <div>
              <span className="text-[11px] font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
                Metodologia COMET · Relatório Individual
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
                POSITIVIDADE E ORIENTAÇÃO PARA O FUTURO
              </h1>
            </div>
            <div className="text-left sm:text-right text-xs text-slate-500 dark:text-slate-400 font-mono">
              <div>Emissão: <span className="text-slate-900 dark:text-white font-semibold">{calculatedAt}</span></div>
              <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">Versão Científica: P-Scale BR (2015) + ELOT (1997/2002)</div>
            </div>
          </div>

          {/* Dados do Participante */}
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

      {/* Navegação Rápida entre Seções (No-Print) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-print border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'all'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Relatório Completo (6 Seções)
        </button>
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'overview'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          1. Visão Geral
        </button>
        <button
          onClick={() => setActiveTab('positivity')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'positivity'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          2. Positividade Geral
        </button>
        <button
          onClick={() => setActiveTab('optimism')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'optimism'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          3. Otimismo
        </button>
        <button
          onClick={() => setActiveTab('pessimism')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'pessimism'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          4. Pessimismo
        </button>
        <button
          onClick={() => setActiveTab('comet')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'comet'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          5. Análise Integrada COMET
        </button>
        <button
          onClick={() => setActiveTab('action_plan')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'action_plan'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          6. Plano de Desenvolvimento
        </button>
      </div>

      {/* ========================================================
          SEÇÃO 1 — VISÃO GERAL
         ======================================================== */}
      {(activeTab === 'all' || activeTab === 'overview') && (
        <section className="space-y-6 print-page-break">
          <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
            <span className="text-xs font-bold font-mono text-indigo-600 dark:text-indigo-400 uppercase">Seção 01</span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Visão Geral dos Indicadores</h2>
          </div>

          {/* Cards dos 3 Indicadores Independentes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* 1. Positividade Geral */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 hover:border-indigo-500 transition-colors shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">P-Scale</span>
                <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                  {positivity.levelLabel}
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Positividade Geral</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Disposição a avaliar favoravelmente o self, a vida e os outros.</p>
              </div>
              <div className="pt-2 flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900 dark:text-white font-mono tabular-nums">{positivity.meanScore.toFixed(2)}</span>
                <span className="text-xs text-slate-400 font-mono">/ 5.00 (Bruto: {positivity.rawScore}/40)</span>
              </div>
              {/* Barra visual */}
              <div className="space-y-1">
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-950 overflow-hidden border border-slate-200 dark:border-slate-800">
                  <div
                    className="h-full bg-indigo-600"
                    style={{ width: `${(positivity.meanScore / 5) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>1.0 (Baixo)</span>
                  <span>3.0</span>
                  <span>5.0 (Alto)</span>
                </div>
              </div>
            </div>

            {/* 2. Otimismo */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 hover:border-emerald-500 transition-colors shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">ELOT · Otimismo</span>
                <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                  {optimism.levelLabel}
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Otimismo Disposicional</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Expectativa generalizada de ocorrência de eventos futuros positivos.</p>
              </div>
              <div className="pt-2 flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900 dark:text-white font-mono tabular-nums">{optimism.meanScore.toFixed(2)}</span>
                <span className="text-xs text-slate-400 font-mono">/ 5.00 (Bruto: {optimism.rawScore}/30)</span>
              </div>
              <div className="space-y-1">
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-950 overflow-hidden border border-slate-200 dark:border-slate-800">
                  <div
                    className="h-full bg-emerald-500"
                    style={{ width: `${(optimism.meanScore / 5) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>1.0 (Baixo)</span>
                  <span>3.0</span>
                  <span>5.0 (Elevado)</span>
                </div>
              </div>
            </div>

            {/* 3. Pessimismo */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 hover:border-amber-500 transition-colors shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">ELOT · Pessimismo</span>
                <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                  {pessimism.levelLabel}
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Pessimismo Defensivo</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Expectativa de percalços e cautela preventiva para antecipação de riscos.</p>
              </div>
              <div className="pt-2 flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900 dark:text-white font-mono tabular-nums">{pessimism.meanScore.toFixed(2)}</span>
                <span className="text-xs text-slate-400 font-mono">/ 5.00 (Bruto: {pessimism.rawScore}/45)</span>
              </div>
              <div className="space-y-1">
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-950 overflow-hidden border border-slate-200 dark:border-slate-800">
                  <div
                    className="h-full bg-amber-500"
                    style={{ width: `${(pessimism.meanScore / 5) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>1.0 (Baixo)</span>
                  <span>3.0</span>
                  <span>5.0 (Elevado)</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================
          SEÇÃO 2 — POSITIVIDADE GERAL
         ======================================================== */}
      {(activeTab === 'all' || activeTab === 'positivity') && (
        <section className="space-y-6 print-page-break">
          <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
            <span className="text-xs font-bold font-mono text-indigo-600 dark:text-indigo-400 uppercase">Seção 02</span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Análise da Escala de Positividade (P-Scale)</h2>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {positivity.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Fortalezas Comportamentais</h4>
                <ul className="space-y-1.5">
                  {positivity.strengths.map((str, i) => (
                    <li key={i} className="text-xs text-slate-700 dark:text-slate-300 bg-emerald-50/50 dark:bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-100 dark:border-emerald-900/30 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">Pontos de Cautela e Atenção</h4>
                <ul className="space-y-1.5">
                  {positivity.cautions.map((cau, i) => (
                    <li key={i} className="text-xs text-slate-700 dark:text-slate-300 bg-amber-50/50 dark:bg-amber-950/20 p-2.5 rounded-lg border border-amber-100 dark:border-amber-900/30 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <span>{cau}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================
          SEÇÃO 3 & 4 — OTIMISMO E PESSIMISMO
         ======================================================== */}
      {(activeTab === 'all' || activeTab === 'optimism' || activeTab === 'pessimism') && (
        <section className="space-y-6 print-page-break">
          <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
            <span className="text-xs font-bold font-mono text-indigo-600 dark:text-indigo-400 uppercase">Seções 03 & 04</span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Subescalas do ELOT (Otimismo & Pessimismo)</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Otimismo */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center justify-between">
                <span>Otimismo Disposicional</span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{optimism.levelLabel}</span>
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{optimism.description}</p>
            </div>

            {/* Pessimismo */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center justify-between">
                <span>Pessimismo Defensivo</span>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400">{pessimism.levelLabel}</span>
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{pessimism.description}</p>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================
          SEÇÃO 5 — ANÁLISE INTEGRADA COMET
         ======================================================== */}
      {(activeTab === 'all' || activeTab === 'comet') && (
        <section className="space-y-6 print-page-break">
          <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
            <span className="text-xs font-bold font-mono text-indigo-600 dark:text-indigo-400 uppercase">Seção 05</span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Análise Integrada Metodologia COMET</h2>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Quadrante Estratégico Módulo 1</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{cometAnalysis.quadrantTitle}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{cometAnalysis.quadrantSubtitle}</p>
              </div>
            </div>

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{cometAnalysis.summary}</p>
            
            <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 text-xs text-slate-700 dark:text-slate-300">
              <strong className="text-indigo-800 dark:text-indigo-300 block mb-1">Cruzamento de Positividade:</strong>
              {cometAnalysis.positivityCrossInsight}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================
          SEÇÃO 6 — PLANO DE DESENVOLVIMENTO INDIVIDUAL
         ======================================================== */}
      {(activeTab === 'all' || activeTab === 'action_plan') && (
        <section className="space-y-6 print-page-break">
          <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
            <span className="text-xs font-bold font-mono text-indigo-600 dark:text-indigo-400 uppercase">Seção 06</span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Plano de Desenvolvimento Individual (PDI)</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Eixo Principal de Fortalecimento</h4>
              <p className="text-xs text-slate-700 dark:text-slate-300">{developmentPlan.mainStrength}</p>
            </div>
            <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Ponto Focal de Gestão</h4>
              <p className="text-xs text-slate-700 dark:text-slate-300">{developmentPlan.mainAttentionPoint}</p>
            </div>
            <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 md:col-span-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Recomendação Prática de Ação</h4>
              <p className="text-xs text-slate-700 dark:text-slate-300">{developmentPlan.practicalRecommendation}</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
