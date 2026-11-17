/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Brain } from 'lucide-react';
import { ASQ_SITUATIONS } from '../data/pcq_asq_data.ts';
import { ASQUserAnswer } from '../types/pcq_asq.ts';

interface AssessmentASQViewProps {
  initialAnswers?: Record<number, ASQUserAnswer>;
  currentSituationIndex?: number;
  answers?: Record<number, ASQUserAnswer>;
  onAnswer?: (situationId: number, answer: ASQUserAnswer) => void;
  onNext?: () => void;
  onPrevious?: () => void;
  onFinish: (answers: Record<number, ASQUserAnswer>) => void;
}

export const AssessmentASQView: React.FC<AssessmentASQViewProps> = ({
  initialAnswers = {},
  currentSituationIndex: externalIndex,
  answers: externalAnswers,
  onAnswer: externalOnAnswer,
  onNext: externalOnNext,
  onPrevious: externalOnPrevious,
  onFinish,
}) => {
  const [internalIndex, setInternalIndex] = useState(0);
  const [internalAnswers, setInternalAnswers] = useState<Record<number, ASQUserAnswer>>(
    initialAnswers
  );

  const currentIndex = externalIndex !== undefined ? externalIndex : internalIndex;
  const currentAnswers = externalAnswers !== undefined ? externalAnswers : internalAnswers;

  const currentSituation = ASQ_SITUATIONS[currentIndex];
  const existingAnswer = currentSituation ? currentAnswers[currentSituation.id] : undefined;

  const [internality, setInternality] = useState<number | undefined>(existingAnswer?.internality);
  const [stability, setStability] = useState<number | undefined>(existingAnswer?.stability);
  const [globality, setGlobality] = useState<number | undefined>(existingAnswer?.globality);
  const [error, setError] = useState('');

  // Update local inputs on situation change
  React.useEffect(() => {
    if (currentSituation) {
      const prev = currentAnswers[currentSituation.id];
      setInternality(prev?.internality);
      setStability(prev?.stability);
      setGlobality(prev?.globality);
      setError('');
    }
  }, [currentIndex, currentSituation, currentAnswers]);

  if (!currentSituation) return null;

  const totalSituations = ASQ_SITUATIONS.length;
  const progressPercent = Math.round(((currentIndex + 1) / totalSituations) * 100);
  const isLast = currentIndex === totalSituations - 1;

  const handleSaveAndNext = () => {
    if (internality === undefined || stability === undefined || globality === undefined) {
      setError('Por favor, responda aos 3 critérios de avaliação (1 a 7) para esta situação.');
      return;
    }

    setError('');
    const newAnswer: ASQUserAnswer = {
      situationId: currentSituation.id,
      ...(existingAnswer?.causeText ? { causeText: existingAnswer.causeText } : {}),
      internality,
      stability,
      globality,
    };

    const updatedAnswers = { ...currentAnswers, [currentSituation.id]: newAnswer };

    if (externalOnAnswer) {
      externalOnAnswer(currentSituation.id, newAnswer);
    } else {
      setInternalAnswers(updatedAnswers);
    }

    if (isLast) {
      onFinish(updatedAnswers);
    } else if (externalOnNext) {
      externalOnNext();
    } else {
      setInternalIndex((prev) => Math.min(prev + 1, totalSituations - 1));
    }
  };

  const handlePrevClick = () => {
    if (externalOnPrevious) {
      externalOnPrevious();
    } else {
      setInternalIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header do Teste ASQ */}
      <div className="mb-8 space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-[#ff6b00]/15 text-[#ff8533] border border-[#ff6b00]/30 uppercase tracking-wider font-bold">
              ASQ · Estilo de Atribuição
            </span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                currentSituation.situationType === 'POSITIVE'
                  ? 'bg-emerald-500/15 text-emerald-400'
                  : 'bg-amber-500/15 text-amber-400'
              }`}
            >
              Situação {currentSituation.situationType === 'POSITIVE' ? 'Positiva' : 'Negativa'}
            </span>
          </div>
          <div className="text-right text-[#cbd5e1] font-mono">
            Situação <span className="text-white font-bold">{currentIndex + 1}</span> de{' '}
            <span className="text-white font-bold">{totalSituations}</span> ({progressPercent}%)
          </div>
        </div>

        <div className="w-full h-2 rounded-full bg-[#181c26] overflow-hidden border border-[#23293a]">
          <div
            className="h-full bg-gradient-to-r from-[#ff6b00] to-[#ff944d] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Card da Situação Hipotética */}
      <div className="p-6 sm:p-9 rounded-2xl bg-[#141722] border border-[#222838] shadow-2xl space-y-7">
        <div className="flex items-center justify-between text-xs text-[#64748b]">
          <span>Situação Hipotética {currentIndex + 1}</span>
          <span className="font-mono text-[11px] text-[#475569]">ASQ-S{currentSituation.id.toString().padStart(2, '0')}</span>
        </div>

        {/* Texto da Situação */}
        <div className="p-5 rounded-xl bg-[#0f1118] border border-[#222736] space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#ff8533]">
            {currentSituation.titlePtBr}
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
            &ldquo;{currentSituation.textPtBr}&rdquo;
          </h2>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-950/60 border border-red-700/50 text-red-200 text-xs">
            {error}
          </div>
        )}

        {/* Etapa 1: Âncora Mental da Causa Principal (sem digitação) */}
        <div className="p-4 rounded-xl bg-[#0f1118] border border-[#262c3e] flex items-start gap-3">
          <Brain className="w-4 h-4 text-[#ff6b00] shrink-0 mt-0.5" />
          <p className="text-xs text-[#cbd5e1] leading-relaxed">
            <strong className="text-white">Passo mental antes de marcar:</strong>{' '}
            Imagine essa situação acontecendo com você e pense rapidamente na{' '}
            <strong className="text-white">causa principal</strong> desse acontecimento. Com essa causa em mente, avalie nas 3 escalas abaixo:
          </p>
        </div>

        {/* Etapa 2: Três Escalas de Avaliação Causal (1 a 7) */}
        <div className="space-y-6 border-t border-[#1e2332] pt-6">
          <div className="text-xs font-bold uppercase tracking-wider text-[#ff8533]">
            Com base na causa que você pensou, avalie nas 3 dimensões (1 a 7):
          </div>

          {/* Dimensão 1: Internalidade */}
          <div className="space-y-2.5">
            <label className="text-xs font-semibold text-[#cbd5e1] block">
              A) A causa se deve a algo sobre você ou a outras pessoas/circunstâncias?
            </label>
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setInternality(num)}
                  className={`py-2.5 rounded-lg border text-xs font-bold font-mono transition-all ${
                    internality === num
                      ? 'bg-[#ff6b00] border-[#ff6b00] text-white shadow-md'
                      : 'bg-[#0f1118] border-[#232838] text-[#94a3b8] hover:border-[#3b435a] hover:text-white'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-[#64748b]">
              <span>1 = Totalmente outras pessoas/circunstâncias</span>
              <span>7 = Totalmente devido a mim</span>
            </div>
          </div>

          {/* Dimensão 2: Estabilidade */}
          <div className="space-y-2.5">
            <label className="text-xs font-semibold text-[#cbd5e1] block">
              B) No futuro, em situação semelhante, essa causa estará presente de novo?
            </label>
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setStability(num)}
                  className={`py-2.5 rounded-lg border text-xs font-bold font-mono transition-all ${
                    stability === num
                      ? 'bg-[#ff6b00] border-[#ff6b00] text-white shadow-md'
                      : 'bg-[#0f1118] border-[#232838] text-[#94a3b8] hover:border-[#3b435a] hover:text-white'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-[#64748b]">
              <span>1 = Nunca mais estará presente</span>
              <span>7 = Estará sempre presente</span>
            </div>
          </div>

          {/* Dimensão 3: Globalidade */}
          <div className="space-y-2.5">
            <label className="text-xs font-semibold text-[#cbd5e1] block">
              C) Essa causa influencia apenas esta situação ou outras áreas da sua vida?
            </label>
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setGlobality(num)}
                  className={`py-2.5 rounded-lg border text-xs font-bold font-mono transition-all ${
                    globality === num
                      ? 'bg-[#ff6b00] border-[#ff6b00] text-white shadow-md'
                      : 'bg-[#0f1118] border-[#232838] text-[#94a3b8] hover:border-[#3b435a] hover:text-white'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-[#64748b]">
              <span>1 = Influencia apenas esta situação</span>
              <span>7 = Influencia todas as áreas da vida</span>
            </div>
          </div>
        </div>

        {/* Rodapé e Navegação */}
        <div className="pt-4 border-t border-[#1e2332] flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handlePrevClick}
            disabled={currentIndex === 0}
            className={`px-4 py-2.5 rounded-xl border border-[#2a3042] text-xs font-semibold flex items-center gap-2 transition-colors ${
              currentIndex === 0
                ? 'opacity-30 cursor-not-allowed text-[#64748b]'
                : 'text-[#cbd5e1] hover:bg-[#1b202c] hover:text-white'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Anterior</span>
          </button>

          <button
            type="button"
            onClick={handleSaveAndNext}
            className="px-6 py-2.5 rounded-xl bg-[#ff6b00] hover:bg-[#e65c00] text-white text-xs font-bold tracking-wide flex items-center gap-2 shadow-lg shadow-[#ff6b00]/25 transition-all active:scale-95"
          >
            <span>{isLast ? 'Finalizar ASQ' : 'Próxima Situação'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
