/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  AlertTriangle,
  Award,
  BarChart3,
  Brain,
  Briefcase,
  CheckCircle2,
  Compass,
  FileCheck2,
  HelpCircle,
  Layers,
  Lightbulb,
  Printer,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Target,
  Zap,
} from 'lucide-react';
import { PsyCapASQIntegratedReport } from '../types/pcq_asq.ts';
import { RadarChartSVG } from './charts/RadarChartSVG.tsx';
import { GroupedBarChartSVG } from './charts/GroupedBarChartSVG.tsx';
import { GaugeDialSVG } from './charts/GaugeDialSVG.tsx';

interface ReportPCQASQIntegratedViewProps {
  report: PsyCapASQIntegratedReport;
  onNewAssessment: () => void;
  onOpenHistory: () => void;
  onOpenAudit: () => void;
}

export const ReportPCQASQIntegratedView: React.FC<ReportPCQASQIntegratedViewProps> = ({
  report,
  onNewAssessment,
  onOpenHistory,
  onOpenAudit,
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'charts' | 'pcq' | 'asq' | 'cross' | 'action_plan'
  >('overview');

  const {
    participant,
    calculatedAt,
    pcqReport,
    asqReport,
    crossAnalyses,
    convergences,
    divergences,
    tensions,
    businessImpacts,
    developmentPlan,
  } = report;

  const handlePrint = () => {
    window.print();
  };

  const pcqDims = [
    {
      key: 'efficacy',
      title: 'Autoeficácia (Confiança na Ação)',
      score: pcqReport.efficacy.meanScore,
      level: pcqReport.efficacy.levelLabel,
      data: pcqReport.efficacy,
      color: 'indigo',
    },
    {
      key: 'hope',
      title: 'Esperança (Metas e Caminhos)',
      score: pcqReport.hope.meanScore,
      level: pcqReport.hope.levelLabel,
      data: pcqReport.hope,
      color: 'emerald',
    },
    {
      key: 'resilience',
      title: 'Resiliência (Capacidade de Recuperação)',
      score: pcqReport.resilience.meanScore,
      level: pcqReport.resilience.levelLabel,
      data: pcqReport.resilience,
      color: 'amber',
    },
    {
      key: 'optimism',
      title: 'Otimismo (Visão Positiva de Futuro)',
      score: pcqReport.optimism.meanScore,
      level: pcqReport.optimism.levelLabel,
      data: pcqReport.optimism,
      color: 'violet',
    },
  ];

  // Identificar a maior e a menor dimensão PsyCap para o texto explicativo simples
  const sortedDims = [...pcqDims].sort((a, b) => b.score - a.score);
  const highestDim = sortedDims[0];
  const lowestDim = sortedDims[sortedDims.length - 1];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Barra de Ações Superior do Relatório (No-Print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs dark:shadow-xl no-print transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600/15 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
              Relatório Módulo 2 Executivo & Científico
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              PCQ-24 (Capital Psicológico) & ASQ (Estilo de Atribuição Explicativa)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Imprimir / Salvar PDF</span>
          </button>
          <button
            onClick={onOpenHistory}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Histórico</span>
          </button>
          <button
            onClick={onNewAssessment}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Nova Avaliação</span>
          </button>
        </div>
      </div>

      {/* Cabeçalho do Relatório Módulo 2 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs dark:shadow-2xl relative overflow-hidden transition-colors">
        <div className="relative space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
            <div>
              <span className="text-[11px] font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
                Metodologia COMET · Módulo 02
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
                CAPITAL PSICOLÓGICO E ESTILO DE ATRIBUIÇÃO EXPLICATIVA
              </h1>
            </div>
            <div className="text-left sm:text-right text-xs text-slate-500 dark:text-slate-400 font-mono">
              <div>Emissão: <span className="text-slate-900 dark:text-white font-semibold">{calculatedAt}</span></div>
              <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">PCQ-24 (Luthans et al.) + ASQ (Peterson et al.)</div>
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

      {/* Tabs de Navegação no Relatório (No-Print) */}
      <div className="flex items-center gap-1.5 overflow-x-auto p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 no-print">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          1. Visão Geral Sintética
        </button>
        <button
          onClick={() => setActiveTab('charts')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'charts'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          2. Gráficos & Painel Visual
        </button>
        <button
          onClick={() => setActiveTab('pcq')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'pcq'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          3. Capital Psicológico (PCQ-24)
        </button>
        <button
          onClick={() => setActiveTab('asq')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'asq'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          4. Estilo Atribucional (ASQ)
        </button>
        <button
          onClick={() => setActiveTab('cross')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'cross'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          5. Cruzamentos & Liderança
        </button>
        <button
          onClick={() => setActiveTab('action_plan')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'action_plan'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          6. Plano de Ação Executivo
        </button>
      </div>

      {/* SEÇÃO 1: VISÃO GERAL SINTÉTICA */}
      {(activeTab === 'overview' || activeTab === 'charts') && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Resumo PCQ-24 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">
                  Capital Psicológico (PCQ-24)
                </span>
                <span className="text-xs px-3 py-1 rounded-full font-bold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300">
                  {pcqReport.overallLevelLabel}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-slate-900 dark:text-white font-mono">
                  {pcqReport.meanScoreTotal.toFixed(2)}
                </span>
                <span className="text-xs text-slate-400 font-mono">/ 6.00</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {pcqReport.overallDescription}
              </p>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950">
                  <span className="text-slate-500 text-[10px] block font-medium">Autoeficácia</span>
                  <strong className="text-slate-900 dark:text-white font-mono text-sm">{pcqReport.efficacy.meanScore.toFixed(2)}</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950">
                  <span className="text-slate-500 text-[10px] block font-medium">Esperança</span>
                  <strong className="text-slate-900 dark:text-white font-mono text-sm">{pcqReport.hope.meanScore.toFixed(2)}</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950">
                  <span className="text-slate-500 text-[10px] block font-medium">Resiliência</span>
                  <strong className="text-slate-900 dark:text-white font-mono text-sm">{pcqReport.resilience.meanScore.toFixed(2)}</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950">
                  <span className="text-slate-500 text-[10px] block font-medium">Otimismo</span>
                  <strong className="text-slate-900 dark:text-white font-mono text-sm">{pcqReport.optimism.meanScore.toFixed(2)}</strong>
                </div>
              </div>
            </div>

            {/* Resumo ASQ */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400 tracking-wider">
                  Estilo Atribucional Explicativo (ASQ)
                </span>
                <span className="text-xs px-3 py-1 rounded-full font-bold bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-mono">
                  Índice de Otimismo: {asqReport.scores.compositeTotal > 0 ? '+' : ''}{asqReport.scores.compositeTotal.toFixed(2)}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-slate-900 dark:text-white font-mono">
                  {asqReport.scores.compositePos.toFixed(2)}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  (Eventos Positivos) vs <strong className="text-rose-500">{asqReport.scores.compositeNeg.toFixed(2)}</strong> (Eventos Negativos)
                </span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Mapeamento prático de como você interpreta as causas de conquistas (sucessos) e percalços (desafios) no dia a dia.
              </p>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div className="p-2.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30">
                  <span className="text-emerald-700 dark:text-emerald-400 text-[10px] block font-medium">Mérito em Sucessos (EU)</span>
                  <strong className="text-slate-900 dark:text-white font-mono text-sm">{asqReport.scores.internalityPos.toFixed(2)} / 7.00</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/30">
                  <span className="text-amber-700 dark:text-amber-400 text-[10px] block font-medium">Culpa em Erros (EU)</span>
                  <strong className="text-slate-900 dark:text-white font-mono text-sm">{asqReport.scores.internalityNeg.toFixed(2)} / 7.00</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SEÇÃO 2: GRÁFICOS & PAINEL VISUAL (REORGANIZADO CONFORME PEDIDO) */}
      {(activeTab === 'overview' || activeTab === 'charts') && (
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              Painel Visual de Psicometria Aplicada
            </h3>
          </div>

          {/* LINHA 1: Card Comparativo de Atribuição (Esquerda) + Diais empilhados um abaixo do outro (Direita) */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
            {/* Esquerda: Card Comparativo de Atribuição */}
            <div className="lg:col-span-3 flex flex-col">
              <GroupedBarChartSVG
                intPos={asqReport.scores.internalityPos}
                intNeg={asqReport.scores.internalityNeg}
                staPos={asqReport.scores.stabilityPos}
                staNeg={asqReport.scores.stabilityNeg}
                gloPos={asqReport.scores.globalityPos}
                gloNeg={asqReport.scores.globalityNeg}
              />
            </div>

            {/* Direita: Diais empilhados um abaixo do outro */}
            <div className="lg:col-span-2 flex flex-col gap-4 justify-between">
              <GaugeDialSVG
                value={asqReport.scores.compositeTotal}
                min={-6}
                max={6}
                title="Índice de Otimismo Causal"
                subtitle="Balanço entre como você interpreta sucessos e desafios"
                type="balance"
              />
              <GaugeDialSVG
                value={asqReport.scores.hopelessnessIndex}
                min={2}
                max={14}
                title="Índice de Vulnerabilidade Cognitiva"
                subtitle="Nível de resguardo emocional e resiliência diante de erros"
                type="hopelessness"
              />
            </div>
          </div>

          {/* LINHA 2: Gráfico de Radar PsyCap 4D (Esquerda) + Card de Explicação do Resultado (Direita) */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Esquerda: Gráfico de Radar PsyCap 4D */}
            <div className="lg:col-span-2 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center shadow-xs">
              <div className="w-full text-center mb-2">
                <span className="text-xs font-bold uppercase text-indigo-600 dark:text-indigo-400 tracking-wider block">
                  Gráfico de Radar — PsyCap 4D
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Perfil de amplitude das 4 forças psicológicas
                </p>
              </div>
              <RadarChartSVG
                efficacy={pcqReport.efficacy.meanScore}
                hope={pcqReport.hope.meanScore}
                resilience={pcqReport.resilience.meanScore}
                optimism={pcqReport.optimism.meanScore}
                size={270}
              />
            </div>

            {/* Direita: Card de Explicação do Resultado do Gráfico de Radar */}
            <div className="lg:col-span-3 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
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
                      🎯 Autoeficácia ({pcqReport.efficacy.meanScore.toFixed(2)}/6.0)
                    </span>
                    <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                      Sua segurança e convicção pessoal para assumir tarefas complexas e tomar iniciativas.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 space-y-1">
                    <span className="font-bold text-emerald-700 dark:text-emerald-300 block text-[11px]">
                      🚀 Esperança ({pcqReport.hope.meanScore.toFixed(2)}/6.0)
                    </span>
                    <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                      Sua perseverança para manter o foco em metas e criar caminhos alternativos quando surgem barreiras.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40 space-y-1">
                    <span className="font-bold text-amber-700 dark:text-amber-300 block text-[11px]">
                      🛡️ Resiliência ({pcqReport.resilience.meanScore.toFixed(2)}/6.0)
                    </span>
                    <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                      A velocidade com que você se recupera emocionalmente de estresse, perdas ou mudanças bruscas.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-violet-50/60 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900/40 space-y-1">
                    <span className="font-bold text-violet-700 dark:text-violet-300 block text-[11px]">
                      ☀️ Otimismo ({pcqReport.optimism.meanScore.toFixed(2)}/6.0)
                    </span>
                    <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                      Sua tendência de esperar resultados positivos no futuro combinada com um realismo prático.
                    </p>
                  </div>
                </div>
              </div>

              {/* Destaque das pontuações do avaliado */}
              <div className="mt-4 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs">
                <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                  💡 Diagnóstico do Seu Perfil:
                </span>
                <p className="text-slate-600 dark:text-slate-400">
                  Sua maior alavanca no radar é <strong>{highestDim.title.split(' ')[0]}</strong> ({highestDim.score.toFixed(2)}/6.0), atuando como pilar principal de sustentação. Seu ponto com maior oportunidade de desenvolvimento é <strong>{lowestDim.title.split(' ')[0]}</strong> ({lowestDim.score.toFixed(2)}/6.0).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SEÇÃO 3: CAPITAL PSICOLÓGICO (PCQ-24) DETALHADO */}
      {(activeTab === 'overview' || activeTab === 'pcq') && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                Detalhamento Profundo do PCQ-24 (Capital Psicológico)
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Média Geral: <strong>{pcqReport.meanScoreTotal.toFixed(2)}</strong> / 6.00
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pcqDims.map((dim) => (
              <div
                key={dim.key}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {dim.title}
                  </h4>
                  <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300">
                    {dim.score.toFixed(2)} / 6.00
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-600 dark:bg-indigo-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${(dim.score / 6) * 100}%` }}
                  ></div>
                </div>

                <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Classificação: <span className="text-slate-900 dark:text-white">{dim.level}</span>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                  {dim.data.description}
                </p>

                <div className="space-y-3 pt-2">
                  <div>
                    <h5 className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Pontos Fortes Comportamentais
                    </h5>
                    <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300 pl-4 list-disc">
                      {dim.data.strengths.map((s, idx) => (
                        <li key={idx}>{s}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-[11px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" /> Riscos e Cuidados
                    </h5>
                    <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300 pl-4 list-disc">
                      {dim.data.cautions.map((c, idx) => (
                        <li key={idx}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SEÇÃO 4: ESTILO ATRIBUCIONAL (ASQ) DETALHADO */}
      {(activeTab === 'overview' || activeTab === 'asq') && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                Análise de Estilo Explicativo (ASQ)
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Eventos Positivos: <strong>{asqReport.scores.compositePos.toFixed(2)}</strong> | Eventos Negativos: <strong>{asqReport.scores.compositeNeg.toFixed(2)}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Perfil de Sucesso (Eventos Positivos) */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400 tracking-wider">
                  Interpretação de Sucessos
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300">
                  {asqReport.positiveProfile.level}
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                {asqReport.positiveProfile.title}
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-emerald-50/50 dark:bg-emerald-950/20 p-3 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
                {asqReport.positiveProfile.description}
              </p>

              <div className="space-y-2 text-xs font-mono pt-1">
                <div className="flex justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-950">
                  <span className="text-slate-500">Mérito em Sucessos (EU):</span>
                  <strong className="text-slate-900 dark:text-white">{asqReport.scores.internalityPos.toFixed(2)} / 7</strong>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-950">
                  <span className="text-slate-500">Durabilidade do Sucesso (SEMPRE):</span>
                  <strong className="text-slate-900 dark:text-white">{asqReport.scores.stabilityPos.toFixed(2)} / 7</strong>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-950">
                  <span className="text-slate-500">Abrangência do Sucesso (TUDO):</span>
                  <strong className="text-slate-900 dark:text-white">{asqReport.scores.globalityPos.toFixed(2)} / 7</strong>
                </div>
              </div>
            </div>

            {/* Perfil de Fracasso (Eventos Negativos) */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-amber-600 dark:text-amber-400 tracking-wider">
                  Interpretação de Fracassos
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300">
                  {asqReport.negativeProfile.level}
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                {asqReport.negativeProfile.title}
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-amber-50/50 dark:bg-amber-950/20 p-3 rounded-xl border border-amber-100 dark:border-amber-900/30">
                {asqReport.negativeProfile.description}
              </p>

              <div className="space-y-2 text-xs font-mono pt-1">
                <div className="flex justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-950">
                  <span className="text-slate-500">Culpa em Erros (EU):</span>
                  <strong className="text-slate-900 dark:text-white">{asqReport.scores.internalityNeg.toFixed(2)} / 7</strong>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-950">
                  <span className="text-slate-500">Persistência do Erro (SEMPRE):</span>
                  <strong className="text-slate-900 dark:text-white">{asqReport.scores.stabilityNeg.toFixed(2)} / 7</strong>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-950">
                  <span className="text-slate-500">Abrangência do Erro (TUDO):</span>
                  <strong className="text-slate-900 dark:text-white">{asqReport.scores.globalityNeg.toFixed(2)} / 7</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SEÇÃO 5: CRUZAMENTOS & LIDERANÇA */}
      {(activeTab === 'overview' || activeTab === 'cross') && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              Análise Cruzada Estratégica (PsyCap x ASQ)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
              <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-4 h-4" /> Autoeficácia x Mérito Pessoal
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {crossAnalyses.efficacyXInternality}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
              <h4 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-4 h-4" /> Esperança x Durabilidade dos Problemas
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {crossAnalyses.hopeXStability}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
              <h4 className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Resiliência x Interpretação de Erros
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {crossAnalyses.resilienceXNegativeAttributions}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
              <h4 className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Otimismo x Visão de Conquistas
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {crossAnalyses.optimismXPositiveAttributions}
              </p>
            </div>
          </div>

          {/* Impactos no Negócio e Liderança */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-4">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-emerald-400" />
              <h4 className="text-base font-bold tracking-tight">
                Impactos Executivos no Clima Organizacional
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-2">
              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
                <strong className="text-emerald-400 block mb-1">Estilo de Liderança</strong>
                <p className="text-slate-300 leading-relaxed">{businessImpacts.leadership}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
                <strong className="text-emerald-400 block mb-1">Tomada de Decisão</strong>
                <p className="text-slate-300 leading-relaxed">{businessImpacts.decisionMaking}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
                <strong className="text-emerald-400 block mb-1">Capacidade de Execução</strong>
                <p className="text-slate-300 leading-relaxed">{businessImpacts.execution}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SEÇÃO 6: PLANO DE AÇÃO EXECUTIVO */}
      {(activeTab === 'overview' || activeTab === 'action_plan') && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              Plano de Ação e Desenvolvimento Executivo (PDI)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
              <span className="font-bold text-emerald-700 dark:text-emerald-400 block">Fortalecimento de Alavancas</span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{developmentPlan.strengthsToFortify}</p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
              <span className="font-bold text-amber-700 dark:text-amber-400 block">Pontos de Atenção Prática</span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{developmentPlan.attentionPoints}</p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
              <span className="font-bold text-indigo-700 dark:text-indigo-400 block">Exercício Prático Recomendado</span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{developmentPlan.individualExercises}</p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
              <span className="font-bold text-violet-700 dark:text-violet-400 block">Ações no Ambiente de Trabalho</span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{developmentPlan.workplaceActions}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
