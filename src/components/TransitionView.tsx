/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, CheckCircle2, Compass, Layers } from 'lucide-react';

interface TransitionViewProps {
  onContinue: () => void;
  pScaleQuestionsCount: number;
  elotQuestionsCount: number;
}

export const TransitionView: React.FC<TransitionViewProps> = ({
  onContinue,
  pScaleQuestionsCount,
  elotQuestionsCount,
}) => {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center space-y-8">
      {/* Ícone de Conclusão do Bloco 1 */}
      <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-500/10">
        <CheckCircle2 className="w-8 h-8" />
      </div>

      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-3 py-1 rounded-md">
          Bloco 1 Concluído ({pScaleQuestionsCount} de {pScaleQuestionsCount} questões)
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Escala de Positividade Registrada
        </h2>
        <p className="text-sm text-[#94a3b8] max-w-lg mx-auto leading-relaxed">
          Suas respostas foram salvas com segurança no instrumento P-Scale. Agora iniciaremos o segundo bloco da avaliação.
        </p>
      </div>

      {/* Cartão de Apresentação do Bloco 2 */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#141722] border border-[#262c3e] text-left space-y-4 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-bold text-[#ff8533] uppercase tracking-wider">
          <Layers className="w-4 h-4" />
          <span>Bloco 2 · {elotQuestionsCount} Questões</span>
        </div>

        <h3 className="text-xl font-bold text-white">
          Orientação para a Vida — Otimismo e Pessimismo
        </h3>

        <p className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed">
          Nesta etapa (instrumento ELOT), avaliaremos separadamente a sua tendência em relação a desfechos favoráveis e desfavoráveis.
        </p>

        <div className="p-4 rounded-xl bg-[#0e1017] border border-[#212738] space-y-2 text-xs text-[#94a3b8]">
          <div className="flex items-start gap-2">
            <span className="text-[#ff6b00] font-bold">•</span>
            <span>Responda com base na sua postura espontânea e habitual perante situações do cotidiano.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#ff6b00] font-bold">•</span>
            <span>Não existem respostas certas ou erradas; o objetivo é mapear seu modelo mental estratégico.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#ff6b00] font-bold">•</span>
            <span>O relatório integrado será gerado automaticamente ao término deste bloco.</span>
          </div>
        </div>
      </div>

      {/* Botão de Avanço */}
      <div>
        <button
          onClick={onContinue}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#ff6b00] to-[#e65c00] hover:from-[#ff7919] hover:to-[#eb6408] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#ff6b00]/30 inline-flex items-center justify-center gap-2.5 transition-all active:scale-95"
        >
          <span>Iniciar Bloco 2 — Orientação para a Vida</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
