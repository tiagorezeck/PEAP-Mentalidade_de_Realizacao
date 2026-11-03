/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, HelpCircle } from 'lucide-react';
import { PCQ24_LIKERT_OPTIONS, PCQ24_QUESTIONS } from '../data/pcq_asq_data.ts';

interface AssessmentPCQ24ViewProps {
  initialAnswers?: Record<number, number>;
  currentQuestionIndex?: number;
  answers?: Record<number, number>;
  onAnswer?: (questionId: number, value: number) => void;
  onNext?: () => void;
  onPrevious?: () => void;
  onFinish: (answers: Record<number, number>) => void;
}

export const AssessmentPCQ24View: React.FC<AssessmentPCQ24ViewProps> = ({
  initialAnswers = {},
  currentQuestionIndex: externalIndex,
  answers: externalAnswers,
  onAnswer: externalOnAnswer,
  onNext: externalOnNext,
  onPrevious: externalOnPrevious,
  onFinish,
}) => {
  const [internalIndex, setInternalIndex] = useState(0);
  const [internalAnswers, setInternalAnswers] = useState<Record<number, number>>(initialAnswers);

  const currentIndex = externalIndex !== undefined ? externalIndex : internalIndex;
  const currentAnswers = externalAnswers !== undefined ? externalAnswers : internalAnswers;

  const currentQuestion = PCQ24_QUESTIONS[currentIndex];
  const selectedValue = currentQuestion ? currentAnswers[currentQuestion.id] : undefined;
  const totalQuestions = PCQ24_QUESTIONS.length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  const handleSelectValue = (val: number) => {
    if (!currentQuestion) return;
    if (externalOnAnswer) {
      externalOnAnswer(currentQuestion.id, val);
    } else {
      setInternalAnswers((prev) => ({ ...prev, [currentQuestion.id]: val }));
    }
  };

  const handleNextClick = () => {
    if (currentIndex === totalQuestions - 1) {
      onFinish(currentAnswers);
    } else if (externalOnNext) {
      externalOnNext();
    } else {
      setInternalIndex((prev) => Math.min(prev + 1, totalQuestions - 1));
    }
  };

  const handlePrevClick = () => {
    if (externalOnPrevious) {
      externalOnPrevious();
    } else {
      setInternalIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['1', '2', '3', '4', '5', '6'].includes(e.key)) {
        const val = parseInt(e.key, 10);
        handleSelectValue(val);
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (selectedValue !== undefined) {
          handleNextClick();
        }
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        handlePrevClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestion, selectedValue, currentIndex, totalQuestions, currentAnswers]);

  if (!currentQuestion) return null;

  const isLastQuestion = currentIndex === totalQuestions - 1;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header do Teste PCQ-24 */}
      <div className="mb-8 space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-[#ff6b00]/15 text-[#ff8533] border border-[#ff6b00]/30 uppercase tracking-wider font-bold">
              PCQ-24 · Capital Psicológico
            </span>
            <span className="text-[#94a3b8] hidden sm:inline">
              Dimensão: {currentQuestion.dimensionNamePtBr}
            </span>
          </div>
          <div className="text-right text-[#cbd5e1] font-mono">
            Item <span className="text-white font-bold">{currentIndex + 1}</span> de{' '}
            <span className="text-white font-bold">{totalQuestions}</span> ({progressPercent}%)
          </div>
        </div>

        <div className="w-full h-2 rounded-full bg-[#181c26] overflow-hidden border border-[#23293a]">
          <div
            className="h-full bg-gradient-to-r from-[#ff6b00] to-[#ff944d] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Card da Pergunta */}
      <div className="p-6 sm:p-10 rounded-2xl bg-[#141722] border border-[#222838] shadow-2xl space-y-8">
        <div className="flex items-center justify-between text-xs text-[#64748b]">
          <span>Pergunta {currentIndex + 1} de {totalQuestions}</span>
          <span className="font-mono text-[11px] text-[#475569]">PCQ-24-{currentQuestion.id.toString().padStart(2, '0')}</span>
        </div>

        <div className="min-h-[90px] flex items-center">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
            {currentQuestion.textPtBr}
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#94a3b8] border-t border-[#1e2332] pt-4">
          <HelpCircle className="w-3.5 h-3.5 text-[#ff6b00]" />
          <span>Indique seu grau de concordância com a frase acima (Escala de 1 a 6):</span>
        </div>

        {/* Escala Likert de 6 Pontos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {PCQ24_LIKERT_OPTIONS.map((option) => {
            const isSelected = selectedValue === option.value;
            return (
              <button
                key={option.value}
                onClick={() => handleSelectValue(option.value)}
                className={`p-3.5 rounded-xl text-left border transition-all flex items-center justify-between group active:scale-[0.99] ${
                  isSelected
                    ? 'bg-[#ff6b00]/15 border-[#ff6b00] text-white shadow-md ring-1 ring-[#ff6b00]'
                    : 'bg-[#0f1118] border-[#222736] text-[#cbd5e1] hover:border-[#3b435a] hover:bg-[#161a24]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono transition-colors ${
                      isSelected
                        ? 'bg-[#ff6b00] text-white shadow-sm'
                        : 'bg-[#1b202e] text-[#94a3b8] group-hover:bg-[#252c3f]'
                    }`}
                  >
                    {option.value}
                  </span>
                  <span className="text-xs font-medium">{option.label}</span>
                </div>

                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                    isSelected
                      ? 'border-[#ff6b00] bg-[#ff6b00] text-white'
                      : 'border-[#333a4e]'
                  }`}
                >
                  {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Navegação */}
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

          <div className="text-[11px] text-[#64748b] hidden sm:block">
            Você pode usar as teclas <kbd className="px-1.5 py-0.5 rounded bg-[#1e2332] text-white font-mono">1</kbd> a <kbd className="px-1.5 py-0.5 rounded bg-[#1e2332] text-white font-mono">6</kbd>
          </div>

          <button
            type="button"
            onClick={handleNextClick}
            disabled={selectedValue === undefined}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold tracking-wide flex items-center gap-2 shadow-lg transition-all active:scale-95 ${
              selectedValue === undefined
                ? 'opacity-40 cursor-not-allowed bg-[#222838] text-[#64748b]'
                : 'bg-[#ff6b00] hover:bg-[#e65c00] text-white shadow-[#ff6b00]/25'
            }`}
          >
            <span>{isLastQuestion ? 'Concluir PCQ-24' : 'Próxima'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
