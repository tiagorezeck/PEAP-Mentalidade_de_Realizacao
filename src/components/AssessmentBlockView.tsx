/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, HelpCircle } from 'lucide-react';
import { LIKERT_OPTIONS } from '../data/instruments.ts';
import { InstrumentType, Question } from '../types/assessment.ts';

interface AssessmentBlockViewProps {
  instrument: InstrumentType;
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<number, number>; // questionId -> 1..5
  onAnswer: (questionId: number, value: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  onFinishBlock: () => void;
}

export const AssessmentBlockView: React.FC<AssessmentBlockViewProps> = ({
  instrument,
  questions,
  currentQuestionIndex,
  answers,
  onAnswer,
  onNext,
  onPrevious,
  onFinishBlock,
}) => {
  const currentQuestion = questions[currentQuestionIndex];
  const selectedValue = currentQuestion ? answers[currentQuestion.id] : undefined;

  const totalQuestions = questions.length;
  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  // Suporte a atalhos de teclado (teclas 1 a 5)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['1', '2', '3', '4', '5'].includes(e.key)) {
        const val = parseInt(e.key, 10);
        if (currentQuestion) {
          onAnswer(currentQuestion.id, val);
        }
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (selectedValue !== undefined) {
          if (currentQuestionIndex === totalQuestions - 1) {
            onFinishBlock();
          } else {
            onNext();
          }
        }
      } else if (e.key === 'ArrowLeft' && currentQuestionIndex > 0) {
        onPrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestion, selectedValue, currentQuestionIndex, totalQuestions, onAnswer, onNext, onPrevious, onFinishBlock]);

  if (!currentQuestion) return null;

  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Cabeçalho do Bloco e Progresso */}
      <div className="mb-8 space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-[#ff6b00]/15 text-[#ff8533] border border-[#ff6b00]/30 uppercase tracking-wider font-bold">
              {instrument === 'P_SCALE' ? 'Bloco 1 · P-Scale' : 'Bloco 2 · ELOT'}
            </span>
            <span className="text-[#94a3b8] hidden sm:inline">
              {instrument === 'P_SCALE' ? 'Escala de Positividade' : 'Orientação para a Vida (Otimismo & Pessimismo)'}
            </span>
          </div>
          <div className="text-right text-[#cbd5e1] font-mono">
            Item <span className="text-white font-bold">{currentQuestionIndex + 1}</span> de{' '}
            <span className="text-white font-bold">{totalQuestions}</span> ({progressPercent}%)
          </div>
        </div>

        {/* Barra de Progresso Superior */}
        <div className="w-full h-2 rounded-full bg-[#181c26] overflow-hidden border border-[#23293a]">
          <div
            className="h-full bg-gradient-to-r from-[#ff6b00] to-[#ff944d] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Cartão Principal da Questão */}
      <div className="p-6 sm:p-10 rounded-2xl bg-[#141722] border border-[#222838] shadow-2xl space-y-8">
        {/* Identificador sutil do item */}
        <div className="flex items-center justify-between text-xs text-[#64748b]">
          <span>Pergunta {currentQuestionIndex + 1} de {totalQuestions}</span>
          <span className="font-mono text-[11px] text-[#475569]">
            {instrument === 'P_SCALE' ? `EP-0${currentQuestion.itemNumber}` : `ELOT-${currentQuestion.itemNumber.toString().padStart(2, '0')}`}
          </span>
        </div>

        {/* Texto da Questão em Destaque */}
        <div className="min-h-[90px] flex items-center">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
            {currentQuestion.textPtBr}
          </h2>
        </div>

        {/* Instrução rápida de resposta */}
        <div className="flex items-center gap-2 text-xs text-[#94a3b8] border-t border-[#1e2332] pt-4">
          <HelpCircle className="w-3.5 h-3.5 text-[#ff6b00]" />
          <span>Indique seu grau de concordância com a afirmação acima:</span>
        </div>

        {/* Escala Likert de 5 Pontos */}
        <div className="space-y-2.5">
          {LIKERT_OPTIONS.map((option) => {
            const isSelected = selectedValue === option.value;
            return (
              <button
                key={option.value}
                onClick={() => onAnswer(currentQuestion.id, option.value)}
                className={`w-full p-4 rounded-xl text-left border transition-all flex items-center justify-between group active:scale-[0.99] ${
                  isSelected
                    ? 'bg-[#ff6b00]/15 border-[#ff6b00] text-white shadow-md shadow-[#ff6b00]/10 ring-1 ring-[#ff6b00]'
                    : 'bg-[#0f1118] border-[#222736] text-[#cbd5e1] hover:border-[#3b435a] hover:bg-[#161a24]'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono transition-colors ${
                      isSelected
                        ? 'bg-[#ff6b00] text-white shadow-sm'
                        : 'bg-[#1b202e] text-[#94a3b8] group-hover:bg-[#252c3f]'
                    }`}
                  >
                    {option.value}
                  </span>
                  <span className="text-sm font-medium">{option.label}</span>
                </div>

                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                    isSelected
                      ? 'border-[#ff6b00] bg-[#ff6b00] text-white'
                      : 'border-[#333a4e] group-hover:border-[#4d5672]'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Rodapé com Navegação */}
        <div className="pt-4 border-t border-[#1e2332] flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onPrevious}
            disabled={currentQuestionIndex === 0}
            className={`px-4 py-2.5 rounded-xl border border-[#2a3042] text-xs font-semibold flex items-center gap-2 transition-colors ${
              currentQuestionIndex === 0
                ? 'opacity-30 cursor-not-allowed text-[#64748b]'
                : 'text-[#cbd5e1] hover:bg-[#1b202c] hover:text-white'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Anterior</span>
          </button>

          <div className="text-[11px] text-[#64748b] hidden sm:block">
            Você pode usar as teclas <kbd className="px-1.5 py-0.5 rounded bg-[#1e2332] text-white font-mono">1</kbd> a <kbd className="px-1.5 py-0.5 rounded bg-[#1e2332] text-white font-mono">5</kbd> no teclado
          </div>

          <button
            type="button"
            onClick={isLastQuestion ? onFinishBlock : onNext}
            disabled={selectedValue === undefined}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold tracking-wide flex items-center gap-2 shadow-lg transition-all active:scale-95 ${
              selectedValue === undefined
                ? 'opacity-40 cursor-not-allowed bg-[#222838] text-[#64748b]'
                : 'bg-[#ff6b00] hover:bg-[#e65c00] text-white shadow-[#ff6b00]/25'
            }`}
          >
            <span>
              {isLastQuestion
                ? instrument === 'P_SCALE'
                  ? 'Concluir Bloco 1'
                  : 'Finalizar Avaliação'
                : 'Próxima'}
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Mini indicador de navegação rápida por bolinhas */}
      <div className="mt-6 flex items-center justify-center gap-1.5 flex-wrap">
        {questions.map((q, idx) => {
          const isAnswered = answers[q.id] !== undefined;
          const isCurrent = idx === currentQuestionIndex;
          return (
            <div
              key={q.id}
              className={`h-1.5 rounded-full transition-all ${
                isCurrent
                  ? 'w-6 bg-[#ff6b00]'
                  : isAnswered
                  ? 'w-1.5 bg-[#475569]'
                  : 'w-1.5 bg-[#1e2332]'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};
