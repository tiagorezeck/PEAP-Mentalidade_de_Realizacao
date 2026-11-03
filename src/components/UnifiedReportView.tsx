/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Globe,
  BookOpen,
  CheckCircle2,
  Printer,
  RotateCcw,
  Sparkles,
  Award,
  Zap,
  Brain,
  ShieldCheck,
  Compass,
  Target,
  FileCheck2,
  Layers,
  AlertTriangle,
  Lightbulb,
  Briefcase,
  HelpCircle,
  BarChart3,
  UserCheck,
} from 'lucide-react';
import { UnifiedCometReport, UnifiedReportTab } from '../types/unified.ts';
import { ReportView } from './ReportView.tsx';
import { ReportPCQASQIntegratedView } from './ReportPCQASQIntegratedView.tsx';
import { GroupedBarChartSVG } from './charts/GroupedBarChartSVG.tsx';
import { GaugeDialSVG } from './charts/GaugeDialSVG.tsx';
import { RadarChartSVG } from './charts/RadarChartSVG.tsx';

interface UnifiedReportViewProps {
  report: UnifiedCometReport;
  onNewAssessment: () => void;
  onOpenHistory: () => void;
  onOpenAudit: () => void;
}

export const UnifiedReportView: React.FC<UnifiedReportViewProps> = ({
  report,
  onNewAssessment,
  onOpenHistory,
  onOpenAudit,
}) => {
  const [activeTab, setActiveTab] = useState<UnifiedReportTab>('global');

  const { participant, calculatedAt, module1Report, module2Report, unifiedAnalysis } = report;

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = new Date(calculatedAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  // Dados para o Gráfico de Radar
  const efficacy = module2Report.pcqReport.efficacy.meanScore;
  const hope = module2Report.pcqReport.hope.meanScore;
  const resilience = module2Report.pcqReport.resilience.meanScore;
  const optimism = module2Report.pcqReport.optimism.meanScore;

  const dims = [
    { title: 'Autoeficácia', score: efficacy },
    { title: 'Esperança', score: hope },
    { title: 'Resiliência', score: resilience },
    { title: 'Otimismo', score: optimism },
  ].sort((a, b) => b.score - a.score);

  const highestDim = dims[0];
  const lowestDim = dims[dims.length - 1];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Barra de Ações Superior do Relatório PEAP (No-Print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 shadow-xs dark:shadow-xl no-print transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center font-bold text-white shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-orange-600 dark:text-orange-400 font-extrabold uppercase tracking-wider">
              PEAP — MENTALIDADE DE REALIZAÇÃO
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              {participant.name} ({participant.organization || 'Organização Privada'})
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onNewAssessment}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Novo Teste
          </button>
          <button
            onClick={onOpenHistory}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5" /> Histórico
          </button>
          <button
            onClick={onOpenAudit}
            className="px-3.5 py-2 rounded-xl bg-orange-50 dark:bg-orange-950/80 hover:bg-orange-100 dark:hover:bg-orange-900 text-orange-700 dark:text-orange-300 text-xs font-semibold transition-all flex items-center gap-1.5 border border-orange-200 dark:border-orange-800/60 cursor-pointer"
          >
            <FileCheck2 className="w-3.5 h-3.5" /> Auditoria Científica
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" /> Imprimir / PDF
          </button>
        </div>
      </div>

      {/* Cartão de Identificação do Participante */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xs dark:shadow-none border border-slate-200/80 dark:border-slate-800 p-6 md:p-8 transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-orange-50 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300 border border-orange-200/60 dark:border-orange-800/40 mb-1">
              <Award className="w-3.5 h-3.5" /> PEAP — Positividade, Expectativa, Atribuições e Psicológico
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              {participant.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
              {participant.role && <span className="font-medium text-slate-800 dark:text-slate-200">{participant.role}</span>}
              {participant.organization && <span>• {participant.organization}</span>}
              <span>• Avaliado em {formattedDate}</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-600 to-orange-800 text-white p-4 sm:p-5 rounded-2xl shadow-lg flex items-center gap-4 min-w-[260px]">
            <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center font-extrabold text-2xl border border-white/20 shrink-0">
              {unifiedAnalysis.globalMindsetIndex}
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-orange-100">
                Escore Global de Mentalidade
              </div>
              <div className="text-sm font-bold text-white leading-tight">
                {unifiedAnalysis.globalMindsetLabel}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTÕES NAVEGADORES PRINCIPAIS DO PEAP */}
      <div className="bg-slate-200/60 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-300/80 dark:border-slate-800 flex flex-col sm:flex-row gap-2 no-print transition-colors">
        <button
          onClick={() => setActiveTab('global')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'global'
              ? 'bg-white dark:bg-slate-800 text-orange-600 dark:text-orange-400 shadow-xs border border-slate-200 dark:border-slate-700'
              : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
          }`}
        >
          <Globe className="w-4 h-4 text-orange-500" />
          Relatório Mestre PEAP Integrado (8 Partes)
        </button>

        <button
          onClick={() => setActiveTab('module1')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'module1'
              ? 'bg-white dark:bg-slate-800 text-orange-600 dark:text-orange-400 shadow-xs border border-slate-200 dark:border-slate-700'
              : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
          }`}
        >
          <BookOpen className="w-4 h-4 text-orange-500" />
          Etapa 1 & 2: P-Scale + ELOT
        </button>

        <button
          onClick={() => setActiveTab('module2')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'module2'
              ? 'bg-white dark:bg-slate-800 text-orange-600 dark:text-orange-400 shadow-xs border border-slate-200 dark:border-slate-700'
              : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-orange-500" />
          Etapa 3 & 4: ASQ + PCQ-24
        </button>
      </div>

      {/* ========================================================================= */}
      {/* CONTEÚDO DO RELATÓRIO MESTRE PEAP INTEGRADO (ESTRUTURA EM 8 PARTES)        */}
      {/* ========================================================================= */}
      {activeTab === 'global' && (
        <div className="space-y-10">
          {/* PARTE 1 — VISÃO GERAL */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl shadow-xs dark:shadow-none border border-slate-200/80 dark:border-slate-800 p-6 md:p-8 space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <span className="text-[11px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest block">
                PARTE 1 DE 8
              </span>
              <h2 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                VISÃO GERAL DO PERFIL DE REALIZAÇÃO
              </h2>
            </div>

            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
              {unifiedAnalysis.globalProfileSummary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/30 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Destaques & Potencialidades
                </h4>
                <ul className="space-y-2 text-xs text-slate-800 dark:text-slate-200">
                  {unifiedAnalysis.unifiedDevelopmentPlan.coreStrengths.map((str, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/30 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> Pontos de Atenção Prática
                </h4>
                <ul className="space-y-2 text-xs text-slate-800 dark:text-slate-200">
                  {unifiedAnalysis.unifiedDevelopmentPlan.keyVulnerabilities.map((vul, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <span>{vul}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* PARTE 2 — POSITIVIDADE (P-SCALE) */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl shadow-xs dark:shadow-none border border-slate-200/80 dark:border-slate-800 p-6 md:p-8 space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <span className="text-[11px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest block">
                PARTE 2 DE 8
              </span>
              <h2 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                POSITIVIDADE GERAL (P-SCALE)
              </h2>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
                Questão Central: <em>Como o indivíduo tende a enxergar a realidade e a posicionar-se diante dela?</em>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Pontuação P-Scale</span>
                <div className="text-3xl font-black text-slate-900 dark:text-white font-mono">
                  {module1Report.positivity.meanScore.toFixed(2)} / 5.00
                </div>
                <span className="inline-block px-2.5 py-0.5 rounded text-xs font-bold bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300">
                  {module1Report.positivity.levelLabel}
                </span>
              </div>

              <div className="md:col-span-2 p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Interpretação da Percepção de Mundo
                </h4>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {module1Report.positivity.description}
                </p>
              </div>
            </div>
          </section>

          {/* PARTE 3 — EXPECTATIVAS (ELOT) */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl shadow-xs dark:shadow-none border border-slate-200/80 dark:border-slate-800 p-6 md:p-8 space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <span className="text-[11px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest block">
                PARTE 3 DE 8
              </span>
              <h2 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                EXPECTATIVAS FUTURAS (ELOT)
              </h2>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
                Questão Central: <em>O indivíduo tende a esperar resultados favoráveis ou desfavoráveis do futuro?</em>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/30 space-y-2">
                <span className="text-[10px] font-bold uppercase text-emerald-700 dark:text-emerald-400">Otimismo Disposicional</span>
                <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                  {module1Report.optimism.meanScore.toFixed(2)} / 5.00
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {module1Report.optimism.description}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/30 space-y-2">
                <span className="text-[10px] font-bold uppercase text-amber-700 dark:text-amber-400">Pessimismo Prudente</span>
                <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                  {module1Report.pessimism.meanScore.toFixed(2)} / 5.00
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {module1Report.pessimism.description}
                </p>
              </div>
            </div>

            {/* Integração Positividade x Expectativas */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Compass className="w-4 h-4 text-orange-500" />
                Análise Integrada: Positividade (P-Scale) × Expectativas (ELOT)
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {module1Report.cometAnalysis.summary}
              </p>
            </div>
          </section>

          {/* PARTE 4 — INTERPRETAÇÃO DOS ACONTECIMENTOS (ASQ) */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl shadow-xs dark:shadow-none border border-slate-200/80 dark:border-slate-800 p-6 md:p-8 space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <span className="text-[11px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest block">
                PARTE 4 DE 8
              </span>
              <h2 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                INTERPRETAÇÃO DOS ACONTECIMENTOS (ASQ)
              </h2>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
                Questão Central: <em>Como o indivíduo explica aquilo que acontece em sua vida?</em>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/30 space-y-2">
                <span className="text-[10px] font-bold uppercase text-emerald-700 dark:text-emerald-400">Atribuição em Sucessos (CoPos)</span>
                <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                  {module2Report.asqReport.scores.compositePos.toFixed(2)} / 7.00
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {module2Report.asqReport.positiveProfile.description}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/30 space-y-2">
                <span className="text-[10px] font-bold uppercase text-amber-700 dark:text-amber-400">Atribuição em Adversidades (CoNeg)</span>
                <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                  {module2Report.asqReport.scores.compositeNeg.toFixed(2)} / 7.00
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {module2Report.asqReport.negativeProfile.description}
                </p>
              </div>
            </div>
          </section>

          {/* PARTE 5 — RECURSOS PSICOLÓGICOS (PCQ-24) + PAINEL VISUAL */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl shadow-xs dark:shadow-none border border-slate-200/80 dark:border-slate-800 p-6 md:p-8 space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <span className="text-[11px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest block">
                PARTE 5 DE 8
              </span>
              <h2 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                RECURSOS PSICOLÓGICOS (PCQ-24) & PAINEL VISUAL
              </h2>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
                Questão Central: <em>Quais recursos psicológicos o indivíduo apresenta para enfrentar desafios e perseguir objetivos?</em>
              </p>
            </div>

            {/* PAINEL VISUAL DE PSICOMETRIA APLICADA (LAYOUT ORGANIZADO RECENTEMENTE) */}
            <div className="space-y-6 pt-2">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Painel Visual de Psicometria Aplicada
                </h3>
              </div>

              {/* LINHA 1: Card Comparativo de Atribuição (Esquerda) + Diais empilhados (Direita) */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
                <div className="lg:col-span-3 flex flex-col">
                  <GroupedBarChartSVG
                    intPos={module2Report.asqReport.scores.internalityPos}
                    intNeg={module2Report.asqReport.scores.internalityNeg}
                    staPos={module2Report.asqReport.scores.stabilityPos}
                    staNeg={module2Report.asqReport.scores.stabilityNeg}
                    gloPos={module2Report.asqReport.scores.globalityPos}
                    gloNeg={module2Report.asqReport.scores.globalityNeg}
                  />
                </div>

                <div className="lg:col-span-2 flex flex-col gap-4 justify-between">
                  <GaugeDialSVG
                    value={module2Report.asqReport.scores.compositeTotal}
                    min={-6}
                    max={6}
                    title="Índice de Otimismo Causal"
                    subtitle="Balanço entre como você interpreta seus sucessos e desafios"
                    type="balance"
                  />
                  <GaugeDialSVG
                    value={module2Report.asqReport.scores.hopelessnessIndex}
                    min={2}
                    max={14}
                    title="Índice de Vulnerabilidade Cognitiva"
                    subtitle="Grau de resguardo emocional e resiliência diante de erros"
                    type="hopelessness"
                  />
                </div>
              </div>

              {/* LINHA 2: Gráfico de Radar PsyCap 4D (Esquerda) + Card de Explicação (Direita) */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2 p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center shadow-xs">
                  <div className="w-full text-center mb-2">
                    <span className="text-xs font-bold uppercase text-orange-600 dark:text-orange-400 tracking-wider block">
                      Gráfico de Radar — PsyCap 4D
                    </span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Perfil de amplitude das 4 forças psicológicas
                    </p>
                  </div>
                  <RadarChartSVG
                    efficacy={efficacy}
                    hope={hope}
                    resilience={resilience}
                    optimism={optimism}
                    size={270}
                  />
                </div>

                <div className="lg:col-span-3 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-4 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                      <h4 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                        Entendendo o Resultado do Gráfico de Radar
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      O gráfico de radar acima desenha a sua <strong>"muralha psicológica"</strong>. Quanto mais expandida e simétrica for a área preenchida, mais equilibrados e abundantes são os seus recursos mentais para enfrentar desafios corporativos.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-xs">
                      <div className="p-3 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 space-y-1">
                        <span className="font-bold text-indigo-700 dark:text-indigo-300 block text-[11px]">
                          🎯 Autoeficácia ({efficacy.toFixed(2)}/6.0)
                        </span>
                        <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                          Sua segurança pessoal para assumir tarefas e tomar iniciativas.
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 space-y-1">
                        <span className="font-bold text-emerald-700 dark:text-emerald-300 block text-[11px]">
                          🚀 Esperança ({hope.toFixed(2)}/6.0)
                        </span>
                        <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                          Sua perseverança para manter o foco em metas e criar caminhos B.
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40 space-y-1">
                        <span className="font-bold text-amber-700 dark:text-amber-300 block text-[11px]">
                          🛡️ Resiliência ({resilience.toFixed(2)}/6.0)
                        </span>
                        <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                          A velocidade com que você se recupera emocionalmente de crises.
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-violet-50/60 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900/40 space-y-1">
                        <span className="font-bold text-violet-700 dark:text-violet-300 block text-[11px]">
                          ☀️ Otimismo ({optimism.toFixed(2)}/6.0)
                        </span>
                        <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                          Sua expectativa de resultados positivos combinada com realismo.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs">
                    <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                      💡 Diagnóstico do Seu Perfil:
                    </span>
                    <p className="text-slate-600 dark:text-slate-400">
                      Sua maior alavanca no radar é <strong>{highestDim.title}</strong> ({highestDim.score.toFixed(2)}/6.0). Seu ponto com maior oportunidade de desenvolvimento é <strong>{lowestDim.title}</strong> ({lowestDim.score.toFixed(2)}/6.0).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* PARTE 6 — ANÁLISE INTEGRADA (RESPOSTAS ÀS 8 PERGUNTAS PEAP) */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl shadow-xs dark:shadow-none border border-slate-200/80 dark:border-slate-800 p-6 md:p-8 space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <span className="text-[11px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest block">
                PARTE 6 DE 8
              </span>
              <h2 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                ANÁLISE INTEGRADA DOS 4 INSTRUMENTOS
              </h2>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
                Interseção narrativa entre Positividade, Expectativas, Atribuições e Recursos Psicológicos
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <span className="font-bold text-orange-600 dark:text-orange-400 block">1. Como o indivíduo enxerga a realidade?</span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Apresenta uma postura disposicional {module1Report.positivity.levelLabel.toLowerCase()} (P-Scale: {module1Report.positivity.meanScore.toFixed(2)}/5), mantendo uma lente predominantemente construtiva sobre o ambiente e as pessoas.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <span className="font-bold text-orange-600 dark:text-orange-400 block">2. Quais são suas expectativas diante do futuro?</span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Otimismo de {module1Report.optimism.meanScore.toFixed(2)}/5 e Pessimismo de {module1Report.pessimism.meanScore.toFixed(2)}/5 no ELOT, configurando uma visão {module1Report.cometAnalysis.quadrantTitle.toLowerCase()}.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <span className="font-bold text-orange-600 dark:text-orange-400 block">3. Como interpreta os acontecimentos?</span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Tendência de atribuir conquistas a causas internas/estáveis ({module2Report.asqReport.scores.compositePos.toFixed(2)}) e percalços a contingências pontuais ({module2Report.asqReport.scores.compositeNeg.toFixed(2)}).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <span className="font-bold text-orange-600 dark:text-orange-400 block">4. Quais recursos psicológicos mobiliza?</span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Capital Psicológico PsyCap com média {module2Report.pcqReport.meanScoreTotal.toFixed(2)}/6, destacando {highestDim.title} como maior força prática.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 block">5. Onde existem convergências nos resultados?</span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {unifiedAnalysis.synergiesAndTensions.positivityXPsyCap}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <span className="font-bold text-amber-600 dark:text-amber-400 block">6. Onde existem divergências ou tensões?</span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {unifiedAnalysis.synergiesAndTensions.pessimismXResilience}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <span className="font-bold text-indigo-600 dark:text-indigo-400 block">7. Quais são suas principais potencialidades?</span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {unifiedAnalysis.unifiedDevelopmentPlan.coreStrengths[0]}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <span className="font-bold text-violet-600 dark:text-violet-400 block">8. Quais aspectos merecem desenvolvimento?</span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {unifiedAnalysis.unifiedDevelopmentPlan.keyVulnerabilities[0]}
                </p>
              </div>
            </div>
          </section>

          {/* PARTE 7 — APLICAÇÃO PROFISSIONAL */}
          <section className="bg-slate-900 text-white rounded-3xl shadow-xl p-6 md:p-8 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-[11px] font-bold text-orange-400 uppercase tracking-widest block">
                PARTE 7 DE 8
              </span>
              <h2 className="text-xl font-black text-white mt-1 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-orange-400" /> APLICAÇÃO NO CONTEXTO EMPRESARIAL
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
                <strong className="text-orange-400 block font-bold text-xs">Liderança & Inspiração</strong>
                <p className="text-slate-300 leading-relaxed">{module2Report.businessImpacts.leadership}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
                <strong className="text-orange-400 block font-bold text-xs">Tomada de Decisão</strong>
                <p className="text-slate-300 leading-relaxed">{module2Report.businessImpacts.decisionMaking}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
                <strong className="text-orange-400 block font-bold text-xs">Execução de Objetivos</strong>
                <p className="text-slate-300 leading-relaxed">{module2Report.businessImpacts.execution}</p>
              </div>
            </div>
          </section>

          {/* PARTE 8 — PLANO DE DESENVOLVIMENTO (PDI) */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl shadow-xs dark:shadow-none border border-slate-200/80 dark:border-slate-800 p-6 md:p-8 space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <span className="text-[11px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest block">
                PARTE 8 DE 8
              </span>
              <h2 className="text-xl font-black text-slate-900 dark:text-white mt-1 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-500" /> PLANO DE DESENVOLVIMENTO INDIVIDUAL (PDI)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              {unifiedAnalysis.unifiedDevelopmentPlan.executiveActions.map((act, i) => (
                <div key={i} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-1.5">
                  <div className="w-6 h-6 rounded bg-orange-600 text-white font-bold text-xs flex items-center justify-center">
                    0{i + 1}
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Ação Recomendada {i + 1}
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {act}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* ABA 2: ETAPA 1 & 2 (P-SCALE + ELOT) */}
      {activeTab === 'module1' && (
        <div className="space-y-6">
          <div className="bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 p-4 rounded-xl text-orange-900 dark:text-orange-200 text-xs font-semibold flex items-center justify-between no-print">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <span>Visualizando relatórios da **Etapa 1 (Positividade)** e **Etapa 2 (Expectativas)**.</span>
            </div>
          </div>
          <ReportView
            report={module1Report}
            onNewAssessment={onNewAssessment}
            onOpenHistory={onOpenHistory}
            onOpenAudit={onOpenAudit}
          />
        </div>
      )}

      {/* ABA 3: ETAPA 3 & 4 (ASQ + PCQ-24) */}
      {activeTab === 'module2' && (
        <div className="space-y-6">
          <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-4 rounded-xl text-emerald-900 dark:text-emerald-200 text-xs font-semibold flex items-center justify-between no-print">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Visualizando relatórios da **Etapa 3 (Atribuições)** e **Etapa 4 (Recursos Psicológicos)**.</span>
            </div>
          </div>
          <ReportPCQASQIntegratedView
            report={module2Report}
            onNewAssessment={onNewAssessment}
            onOpenHistory={onOpenHistory}
            onOpenAudit={onOpenAudit}
          />
        </div>
      )}
    </div>
  );
};
