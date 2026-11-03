/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Clock as ClockIcon,
  FileCheck2 as AuditIcon,
  Globe as GlobeIcon,
  RefreshCw as RefreshIcon,
  ChevronDown,
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle.tsx';

export type AssessmentModule = 'UNIFIED' | 'POSITIVITY_ELOT' | 'PSYCAP_ASQ';

interface HeaderProps {
  activeModule: AssessmentModule;
  onSelectModule: (module: AssessmentModule) => void;
  onNewAssessment: () => void;
  onOpenHistory: () => void;
  onOpenAudit: () => void;
  currentStep: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeModule,
  onSelectModule,
  onNewAssessment,
  onOpenHistory,
  onOpenAudit,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 px-4 sm:px-8 py-3 transition-colors no-print shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark + PEAP Module Selector */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-orange-600 text-white flex items-center justify-center shadow-md font-black text-sm tracking-widest">
            P
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
                ASSESSMENT COMET
              </span>
              <span className="text-xs uppercase tracking-wider text-orange-600 dark:text-orange-400 font-bold border-l border-slate-200 dark:border-slate-700 pl-2 hidden sm:inline">
                PEAP — Mentalidade de Realização
              </span>
            </div>
            
            {/* Module Switcher Dropdown */}
            <div className="relative group mt-0.5">
              <select
                value={activeModule}
                onChange={(e) => onSelectModule(e.target.value as AssessmentModule)}
                className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-orange-500 text-[11px] font-semibold py-1 pl-2 pr-6 rounded-lg cursor-pointer transition-colors focus:outline-none appearance-none"
              >
                <option value="UNIFIED">
                  🌐 PEAP — Mentalidade de Realização (4 Instrumentos)
                </option>
                <option value="POSITIVITY_ELOT">
                  📘 Etapa 1 e 2: Positividade & Expectativas (P-Scale + ELOT)
                </option>
                <option value="PSYCAP_ASQ">
                  📗 Etapa 3 e 4: Atribuições & Recursos Psicológicos (ASQ + PCQ-24)
                </option>
              </select>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <ChevronDown className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => onSelectModule('UNIFIED')}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 ${
                activeModule === 'UNIFIED'
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <GlobeIcon className="w-3.5 h-3.5" />
              PEAP Integrado
            </button>

            <button
              onClick={() => onSelectModule('POSITIVITY_ELOT')}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all ${
                activeModule === 'POSITIVITY_ELOT'
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              P-Scale + ELOT
            </button>

            <button
              onClick={() => onSelectModule('PSYCAP_ASQ')}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all ${
                activeModule === 'PSYCAP_ASQ'
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              ASQ + PCQ-24
            </button>
          </div>

          <button
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 transition-colors hover:text-orange-600 dark:hover:text-white cursor-pointer"
          >
            <ClockIcon className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>Histórico</span>
          </button>
          <button
            onClick={onOpenAudit}
            className="flex items-center gap-1.5 transition-colors hover:text-orange-600 dark:hover:text-white cursor-pointer"
          >
            <AuditIcon className="w-3.5 h-3.5 text-orange-500" />
            <span>Auditoria Científica</span>
          </button>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <ThemeToggle />

          <button
            onClick={onOpenAudit}
            className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            title="Auditoria Científica"
          >
            <AuditIcon className="w-4 h-4 text-orange-500" />
          </button>
          <button
            onClick={onOpenHistory}
            className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            title="Histórico de Avaliações"
          >
            <ClockIcon className="w-4 h-4" />
          </button>
          <button
            onClick={onNewAssessment}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold tracking-wide shadow-md transition-all active:scale-95 whitespace-nowrap cursor-pointer"
          >
            <RefreshIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Nova Avaliação</span>
            <span className="sm:hidden">Novo</span>
          </button>
        </div>
      </div>
    </header>
  );
};
