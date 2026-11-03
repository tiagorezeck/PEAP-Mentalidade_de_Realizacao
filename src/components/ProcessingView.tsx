/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';

interface ProcessingViewProps {
  onComplete: () => void;
}

export const ProcessingView: React.FC<ProcessingViewProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1400);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
      <div className="relative w-20 h-20 mx-auto">
        <div className="absolute inset-0 rounded-2xl bg-orange-600/20 animate-ping opacity-75" />
        <div className="relative w-20 h-20 rounded-2xl bg-slate-900 border border-orange-500/40 flex items-center justify-center text-orange-500 shadow-2xl">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
          Sintetizando Relatório PEAP
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Processando algoritmos independentes das 4 etapas: Positividade, Expectativas, Atribuições e Recursos Psicológicos...
        </p>
      </div>

      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left space-y-2.5 text-xs text-slate-700 dark:text-slate-300 shadow-xs">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>1. P-Scale: Positividade geral calculada (8 itens)</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>2. ELOT: Expectativas de otimismo e pessimismo (20 itens)</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>3. ASQ: Atribuição causal em sucessos e falhas (12 situações)</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>4. PCQ-24: Recursos PsyCap 4D mapeados (24 questões)</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>Matriz Integrada PEAP em 8 Partes estruturada</span>
        </div>
      </div>
    </div>
  );
};
