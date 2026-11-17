/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  HelpCircle,
  Brain,
  Compass,
  Sparkles,
  ShieldCheck,
  Send,
  UserCheck,
} from 'lucide-react';
import { ParticipantData } from '../types/assessment.ts';
import { ASQUserAnswer } from '../types/pcq_asq.ts';
import { P_SCALE_QUESTIONS, ELOT_QUESTIONS, LIKERT_OPTIONS } from '../data/instruments.ts';
import { PCQ24_QUESTIONS, PCQ24_LIKERT_OPTIONS, ASQ_SITUATIONS } from '../data/pcq_asq_data.ts';

interface UnifiedPresentationViewProps {
  participant: ParticipantData;
  onComplete: (answers: {
    pScale: Record<number, number>;
    elot: Record<number, number>;
    pcq24: Record<number, number>;
    asq: Record<number, ASQUserAnswer>;
  }) => void;
  onCancel: () => void;
}

export const UnifiedPresentationView: React.FC<UnifiedPresentationViewProps> = ({
  participant,
  onComplete,
  onCancel,
}) => {
  const [currentBlock, setCurrentBlock] = useState<1 | 2 | 3 | 4>(1);

  // Respostas dos 4 Instrumentos do PEAP
  const [pScaleAnswers, setPScaleAnswers] = useState<Record<number, number>>({});
  const [elotAnswers, setElotAnswers] = useState<Record<number, number>>({});
  const [asqAnswers, setAsqAnswers] = useState<Record<number, ASQUserAnswer>>({});
  const [pcq24Answers, setPcq24Answers] = useState<Record<number, number>>({});

  // Mensagem de validação de bloco
  const [validationError, setValidationError] = useState<string | null>(null);

  // Rolar suave para o topo da página ao mudar de bloco
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setValidationError(null);
  }, [currentBlock]);

  // Contadores de respostas por bloco
  const pScaleAnsweredCount = Object.keys(pScaleAnswers).length;
  const elotAnsweredCount = Object.keys(elotAnswers).length;
  const asqAnsweredCount = Object.keys(asqAnswers).filter(
    (key) => {
      const a = asqAnswers[Number(key)];
      return a && a.internality > 0 && a.stability > 0 && a.globality > 0;
    }
  ).length;
  const pcq24AnsweredCount = Object.keys(pcq24Answers).length;

  const handlePScaleAnswer = (questionId: number, val: number) => {
    setPScaleAnswers((prev) => ({ ...prev, [questionId]: val }));
    setValidationError(null);
  };

  const handleElotAnswer = (questionId: number, val: number) => {
    setElotAnswers((prev) => ({ ...prev, [questionId]: val }));
    setValidationError(null);
  };

  const handleASQChange = (situationId: number, field: keyof ASQUserAnswer, val: string | number) => {
    setAsqAnswers((prev) => {
      const current = prev[situationId] || { situationId, internality: 0, stability: 0, globality: 0 };
      return {
        ...prev,
        [situationId]: {
          ...current,
          situationId,
          [field]: val,
        },
      };
    });
    setValidationError(null);
  };

  const handlePCQ24Answer = (questionId: number, val: number) => {
    setPcq24Answers((prev) => ({ ...prev, [questionId]: val }));
    setValidationError(null);
  };

  // Validação de transição nos 4 Passos Conceituais do PEAP:
  // POSITIVIDADE (P-Scale) -> EXPECTATIVAS (ELOT) -> ATRIBUIÇÕES (ASQ) -> RECURSOS PSICOLÓGICOS (PCQ-24)
  const handleNextBlock = () => {
    if (currentBlock === 1) {
      if (pScaleAnsweredCount < 8) {
        setValidationError(`Por favor, responda a todas as 8 questões do Passo 1: Positividade (P-Scale). Faltam ${8 - pScaleAnsweredCount}.`);
        return;
      }
      setCurrentBlock(2);
    } else if (currentBlock === 2) {
      if (elotAnsweredCount < 20) {
        setValidationError(`Por favor, responda a todas as 20 questões do Passo 2: Expectativas (ELOT). Faltam ${20 - elotAnsweredCount}.`);
        return;
      }
      setCurrentBlock(3);
    } else if (currentBlock === 3) {
      if (asqAnsweredCount < 12) {
        setValidationError(`Por favor, avalie os 3 critérios (1 a 7) das 12 situações do Passo 3: Atribuições (ASQ). Faltam ${12 - asqAnsweredCount}.`);
        return;
      }
      setCurrentBlock(4);
    } else if (currentBlock === 4) {
      if (pcq24AnsweredCount < 24) {
        setValidationError(`Por favor, responda a todas as 24 questões do Passo 4: Recursos Psicológicos (PCQ-24). Faltam ${24 - pcq24AnsweredCount}.`);
        return;
      }
      // Conclusão das 4 Etapas
      onComplete({
        pScale: pScaleAnswers,
        elot: elotAnswers,
        pcq24: pcq24Answers,
        asq: asqAnswers,
      });
    }
  };

  const handlePrevBlock = () => {
    if (currentBlock > 1) {
      setCurrentBlock((prev) => (prev - 1) as 1 | 2 | 3 | 4);
    }
  };

  // Progresso total
  const totalItemsCount = 8 + 20 + 12 + 24; // 64
  const totalAnsweredCount = pScaleAnsweredCount + elotAnsweredCount + asqAnsweredCount + pcq24AnsweredCount;
  const globalProgressPercent = Math.round((totalAnsweredCount / totalItemsCount) * 100);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Cabeçalho do PEAP */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-200/80 dark:border-slate-700 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 dark:border-slate-700/60 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-orange-50 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300 border border-orange-200/60 dark:border-orange-800/40 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              PEAP · Mentalidade de Realização
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              PEAP — MENTALIDADE DE REALIZAÇÃO
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              Jornada em 4 Etapas: <strong>Positividade → Expectativas → Atribuições → Recursos Psicológicos</strong>
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900/50 p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-700/50">
            <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 flex items-center justify-center font-bold text-base">
              {participant.name ? participant.name.charAt(0).toUpperCase() : 'P'}
            </div>
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Avaliando</div>
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{participant.name}</div>
              {participant.role && <div className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[180px]">{participant.role}</div>}
            </div>
          </div>
        </div>

        {/* Trilha de Navegação dos 4 Passos Conceituais */}
        <div className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {/* Passo 1: Positividade */}
            <button
              onClick={() => setCurrentBlock(1)}
              className={`p-3 rounded-xl border transition-all text-left flex items-start gap-3 cursor-pointer ${
                currentBlock === 1
                  ? 'bg-orange-50/90 dark:bg-orange-950/50 border-orange-500 ring-2 ring-orange-500/20'
                  : pScaleAnsweredCount === 8
                  ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/60 text-slate-700 dark:text-slate-300'
                  : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                currentBlock === 1 ? 'bg-orange-600 text-white' : pScaleAnsweredCount === 8 ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}>
                P
              </div>
              <div>
                <div className="text-xs font-bold truncate">1. Positividade</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">P-Scale ({pScaleAnsweredCount}/8)</div>
              </div>
            </button>

            {/* Passo 2: Expectativas */}
            <button
              onClick={() => setCurrentBlock(2)}
              className={`p-3 rounded-xl border transition-all text-left flex items-start gap-3 cursor-pointer ${
                currentBlock === 2
                  ? 'bg-orange-50/90 dark:bg-orange-950/50 border-orange-500 ring-2 ring-orange-500/20'
                  : elotAnsweredCount === 20
                  ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/60 text-slate-700 dark:text-slate-300'
                  : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                currentBlock === 2 ? 'bg-orange-600 text-white' : elotAnsweredCount === 20 ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}>
                E
              </div>
              <div>
                <div className="text-xs font-bold truncate">2. Expectativas</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">ELOT ({elotAnsweredCount}/20)</div>
              </div>
            </button>

            {/* Passo 3: Atribuições */}
            <button
              onClick={() => setCurrentBlock(3)}
              className={`p-3 rounded-xl border transition-all text-left flex items-start gap-3 cursor-pointer ${
                currentBlock === 3
                  ? 'bg-orange-50/90 dark:bg-orange-950/50 border-orange-500 ring-2 ring-orange-500/20'
                  : asqAnsweredCount === 12
                  ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/60 text-slate-700 dark:text-slate-300'
                  : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                currentBlock === 3 ? 'bg-orange-600 text-white' : asqAnsweredCount === 12 ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}>
                A
              </div>
              <div>
                <div className="text-xs font-bold truncate">3. Atribuições</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">ASQ ({asqAnsweredCount}/12)</div>
              </div>
            </button>

            {/* Passo 4: Recursos Psicológicos */}
            <button
              onClick={() => setCurrentBlock(4)}
              className={`p-3 rounded-xl border transition-all text-left flex items-start gap-3 cursor-pointer ${
                currentBlock === 4
                  ? 'bg-orange-50/90 dark:bg-orange-950/50 border-orange-500 ring-2 ring-orange-500/20'
                  : pcq24AnsweredCount === 24
                  ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/60 text-slate-700 dark:text-slate-300'
                  : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                currentBlock === 4 ? 'bg-orange-600 text-white' : pcq24AnsweredCount === 24 ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}>
                P
              </div>
              <div>
                <div className="text-xs font-bold truncate">4. Psicológico</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">PCQ-24 ({pcq24AnsweredCount}/24)</div>
              </div>
            </button>
          </div>

          {/* Barra de Progresso Global */}
          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 bg-slate-100 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-orange-600 dark:bg-orange-500 h-full transition-all duration-300"
                style={{ width: `${globalProgressPercent}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 min-w-[55px] text-right">
              {globalProgressPercent}% Concluído
            </span>
          </div>
        </div>
      </div>

      {/* Alerta de erro de validação */}
      {validationError && (
        <div className="bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800/80 p-4 rounded-xl text-amber-800 dark:text-amber-200 flex items-center gap-3 text-sm animate-shake">
          <AlertCircle className="w-5 h-5 shrink-0 text-amber-600 dark:text-amber-400" />
          <span>{validationError}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PASSO 1: POSITIVIDADE (P-SCALE - 8 ITENS)                                 */}
      {/* ========================================================================= */}
      {currentBlock === 1 && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-200/80 dark:border-slate-700 p-6 md:p-8 space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-700 pb-4">
            <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 text-sm font-bold uppercase tracking-wider">
              <Brain className="w-4 h-4" /> Etapa 1 • Positividade (P-Scale)
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
              Como você percebe a si mesmo, a vida, as pessoas e o futuro?
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Para cada afirmativa abaixo, escolha a alternativa que melhor descreve seu grau de concordância habitual de 1 a 5.
            </p>
          </div>

          <div className="space-y-6">
            {P_SCALE_QUESTIONS.map((q, idx) => {
              const selectedVal = pScaleAnswers[q.id];
              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-xl border transition-all ${
                    selectedVal
                      ? 'bg-slate-50/50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-700'
                      : 'bg-white dark:bg-slate-800 border-slate-200/80 dark:border-slate-700/80 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <span className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                      {q.textPtBr}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 pt-2">
                    {LIKERT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handlePScaleAnswer(q.id, opt.value)}
                        className={`p-3 rounded-lg border text-xs font-medium text-center transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                          selectedVal === opt.value
                            ? 'bg-orange-600 text-white border-orange-600 shadow-sm'
                            : 'bg-slate-50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/60'
                        }`}
                      >
                        <span className="text-base font-bold">{opt.value}</span>
                        <span className="text-[11px] leading-tight">{opt.shortLabel}</span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PASSO 2: EXPECTATIVAS (ELOT - 20 ITENS)                                    */}
      {/* ========================================================================= */}
      {currentBlock === 2 && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-200/80 dark:border-slate-700 p-6 md:p-8 space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-700 pb-4">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-sm font-bold uppercase tracking-wider">
              <Compass className="w-4 h-4" /> Etapa 2 • Expectativas (ELOT)
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
              O que você tende a esperar dos acontecimentos futuros?
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Avalie o quanto você concorda com cada afirmação sobre sua visão de futuro (1 a 5).
            </p>
          </div>

          <div className="space-y-6">
            {ELOT_QUESTIONS.map((q, idx) => {
              const selectedVal = elotAnswers[q.id];
              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-xl border transition-all ${
                    selectedVal
                      ? 'bg-slate-50/50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-700'
                      : 'bg-white dark:bg-slate-800 border-slate-200/80 dark:border-slate-700/80 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                      {q.textPtBr}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 pt-2">
                    {LIKERT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleElotAnswer(q.id, opt.value)}
                        className={`p-3 rounded-lg border text-xs font-medium text-center transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                          selectedVal === opt.value
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                            : 'bg-slate-50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/60'
                        }`}
                      >
                        <span className="text-base font-bold">{opt.value}</span>
                        <span className="text-[11px] leading-tight">{opt.shortLabel}</span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PASSO 3: ATRIBUIÇÕES (ASQ - 12 SITUAÇÕES)                                 */}
      {/* ========================================================================= */}
      {currentBlock === 3 && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-200/80 dark:border-slate-700 p-6 md:p-8 space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-700 pb-4">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-bold uppercase tracking-wider">
              <UserCheck className="w-4 h-4" /> Etapa 3 • Atribuições (ASQ)
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
              Como você interpreta as causas dos acontecimentos positivos e negativos?
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Imagine cada situação acontecendo com você. Pense mentalmente na causa principal desse acontecimento e, com base nessa causa, marque de 1 a 7 nas 3 escalas abaixo.
            </p>
          </div>

          <div className="space-y-8">
            {ASQ_SITUATIONS.map((sit, idx) => {
              const currentAns = asqAnswers[sit.id] || { situationId: sit.id, internality: 0, stability: 0, globality: 0 };
              const isPositive = sit.situationType === 'POSITIVE';

              return (
                <div
                  key={sit.id}
                  className={`p-6 rounded-2xl border transition-all ${
                    isPositive
                      ? 'bg-emerald-50/20 dark:bg-emerald-950/10 border-emerald-200/80 dark:border-emerald-800/40'
                      : 'bg-amber-50/20 dark:bg-amber-950/10 border-amber-200/80 dark:border-amber-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">
                      Situação {idx + 1} de 12 • {isPositive ? 'Evento Favorável' : 'Desafio / Obstáculo'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2">
                    {sit.titlePtBr}
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mt-1 bg-white/80 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                    "{sit.textPtBr}"
                  </p>

                  {/* Âncora Mental (sem necessidade de digitação) */}
                  <div className="mt-4 px-3.5 py-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/70 dark:border-slate-700/70 flex items-start gap-2.5">
                    <Brain className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      <strong className="text-slate-900 dark:text-white">Passo mental antes de marcar:</strong>{' '}
                      Imagine o que mais causaria essa situação na sua vida e, mantendo essa causa em mente, marque de <strong>1 a 7</strong> nas três escalas abaixo.
                    </p>
                  </div>

                  {/* As 3 Escalas de 1 a 7 */}
                  <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5 pt-3 border-t border-slate-200/60 dark:border-slate-700/60">
                    {/* Internalidade */}
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Internalidade (1 = Totalmente a fatores externos | 7 = Totalmente a mim)
                      </div>
                      <div className="flex justify-between gap-1">
                        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => handleASQChange(sit.id, 'internality', num)}
                            className={`flex-1 py-2 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                              currentAns.internality === num
                                ? 'bg-emerald-600 text-white border-emerald-600 shadow'
                                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Estabilidade */}
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Estabilidade (1 = Nunca mais ocorrerá | 7 = Sempre estará presente)
                      </div>
                      <div className="flex justify-between gap-1">
                        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => handleASQChange(sit.id, 'stability', num)}
                            className={`flex-1 py-2 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                              currentAns.stability === num
                                ? 'bg-emerald-600 text-white border-emerald-600 shadow'
                                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Globalidade */}
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Globalidade (1 = Afeta só essa situação | 7 = Afeta todas as áreas)
                      </div>
                      <div className="flex justify-between gap-1">
                        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => handleASQChange(sit.id, 'globality', num)}
                            className={`flex-1 py-2 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                              currentAns.globality === num
                                ? 'bg-emerald-600 text-white border-emerald-600 shadow'
                                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PASSO 4: RECURSOS PSICOLÓGICOS (PCQ-24 - 24 ITENS)                        */}
      {/* ========================================================================= */}
      {currentBlock === 4 && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-200/80 dark:border-slate-700 p-6 md:p-8 space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-700 pb-4">
            <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 text-sm font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" /> Etapa 4 • Recursos Psicológicos (PCQ-24)
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
              Quais recursos psicológicos você mobiliza para enfrentar desafios e perseguir metas?
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Escala oficial de 6 pontos (1 = Discordo fortemente a 6 = Concordo fortemente). Responda com base na sua postura atual de trabalho.
            </p>
          </div>

          <div className="space-y-6">
            {PCQ24_QUESTIONS.map((q, idx) => {
              const selectedVal = pcq24Answers[q.id];
              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-xl border transition-all ${
                    selectedVal
                      ? 'bg-slate-50/50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-700'
                      : 'bg-white dark:bg-slate-800 border-slate-200/80 dark:border-slate-700/80 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-2">
                    <span className="w-6 h-6 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="text-xs font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-wide">
                        {q.dimensionNamePtBr}
                      </div>
                      <p className="text-base font-semibold text-slate-900 dark:text-slate-100 mt-0.5">
                        {q.textPtBr}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 pt-3">
                    {PCQ24_LIKERT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handlePCQ24Answer(q.id, opt.value)}
                        className={`p-2.5 rounded-lg border text-xs font-medium text-center transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                          selectedVal === opt.value
                            ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
                            : 'bg-slate-50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/60'
                        }`}
                      >
                        <span className="text-base font-bold">{opt.value}</span>
                        <span className="text-[10px] leading-tight text-center">{opt.shortLabel}</span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Navegação Inferior entre Blocos */}
      <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
        <button
          type="button"
          onClick={currentBlock === 1 ? onCancel : handlePrevBlock}
          className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center gap-2 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          {currentBlock === 1 ? 'Cancelar Avaliação' : 'Etapa Anterior'}
        </button>

        <button
          type="button"
          onClick={handleNextBlock}
          className="px-7 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
        >
          {currentBlock === 4 ? (
            <>
              Finalizar e Gerar Relatório PEAP <Send className="w-4 h-4 ml-1" />
            </>
          ) : (
            <>
              Avançar para Etapa {currentBlock + 1} <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
