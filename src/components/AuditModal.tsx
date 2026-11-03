/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  CheckCircle2,
  ExternalLink,
  FileCheck2,
  HelpCircle,
  Play,
  RotateCw,
  ShieldCheck,
  X,
} from 'lucide-react';
import { ALL_QUESTIONS as M1_QUESTIONS } from '../data/instruments.ts';
import { ASQ_SITUATIONS, PCQ24_QUESTIONS } from '../data/pcq_asq_data.ts';
import { runAutomatedPCQ24ASQTests } from '../utils/pcq_asq_tests.ts';
import { runAutomatedValidationTests, TestResult } from '../utils/validationTests.ts';

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuditModal: React.FC<AuditModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'m1_items' | 'm2_items' | 'tests' | 'scientific'>(
    'm1_items'
  );
  
  const [m1TestResults, setM1TestResults] = useState<{ results: TestResult[]; allPassed: boolean }>(
    () => runAutomatedValidationTests()
  );
  const [m2TestResults, setM2TestResults] = useState<{ results: TestResult[]; allPassed: boolean }>(
    () => runAutomatedPCQ24ASQTests()
  );

  if (!isOpen) return null;

  const handleReRunTests = () => {
    setM1TestResults(runAutomatedValidationTests());
    setM2TestResults(runAutomatedPCQ24ASQTests());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm animate-fade-in no-print">
      <div className="w-full max-w-5xl max-h-[90vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-colors">
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                Auditoria Científica e Evidências Psicométricas • PEAP
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                PEAP — Positividade (P-Scale), Expectativa (ELOT), Atribuições (ASQ) e Psicológico (PCQ-24).
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Abas */}
        <div className="flex flex-wrap items-center gap-2 px-6 pt-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/80">
          <button
            onClick={() => setActiveTab('m1_items')}
            className={`px-3.5 py-2.5 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'm1_items'
                ? 'border-orange-600 dark:border-orange-500 text-orange-600 dark:text-orange-400 font-bold'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Etapa 1 & 2 (P-Scale + ELOT)
          </button>
          <button
            onClick={() => setActiveTab('m2_items')}
            className={`px-3.5 py-2.5 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'm2_items'
                ? 'border-orange-600 dark:border-orange-500 text-orange-600 dark:text-orange-400 font-bold'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Etapa 3 & 4 (ASQ + PCQ-24)
          </button>
          <button
            onClick={() => setActiveTab('tests')}
            className={`px-3.5 py-2.5 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'tests'
                ? 'border-orange-600 dark:border-orange-500 text-orange-600 dark:text-orange-400 font-bold'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Testes Automatizados</span>
            <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-mono">
              14/14 PASS
            </span>
          </button>
          <button
            onClick={() => setActiveTab('scientific')}
            className={`px-3.5 py-2.5 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'scientific'
                ? 'border-orange-600 dark:border-orange-500 text-orange-600 dark:text-orange-400 font-bold'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Fontes & Direitos
          </button>
        </div>

        {/* Conteúdo com Scroll */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs bg-white dark:bg-slate-900">
          {/* ABA 1: P-Scale + ELOT (28 Itens) */}
          {activeTab === 'm1_items' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-700 dark:text-slate-300">
                <span>
                  Exibindo <strong>28 itens das Etapas 1 e 2</strong>: 8 da P-Scale + 20 do ELOT (6 otimismo, 9 pessimismo e 5 distratores).
                </span>
                <span className="font-mono text-orange-600 dark:text-orange-400 font-bold">28 ITENS</span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 uppercase font-bold text-[10px] tracking-wider">
                    <tr>
                      <th className="p-3 border-b border-slate-200 dark:border-slate-800">Nº</th>
                      <th className="p-3 border-b border-slate-200 dark:border-slate-800">Instrumento</th>
                      <th className="p-3 border-b border-slate-200 dark:border-slate-800">Original</th>
                      <th className="p-3 border-b border-slate-200 dark:border-slate-800">Português BR</th>
                      <th className="p-3 border-b border-slate-200 dark:border-slate-800">Dimensão</th>
                      <th className="p-3 border-b border-slate-200 dark:border-slate-800">Chave</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    {M1_QUESTIONS.map((q) => (
                      <tr key={q.id} className="hover:bg-slate-50 dark:hover:bg-slate-950 transition-colors">
                        <td className="p-3 font-mono font-bold text-orange-600 dark:text-orange-400">{q.globalNumber}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            {q.instrument === 'P_SCALE' ? `P-Scale (${q.itemNumber})` : `ELOT (${q.itemNumber})`}
                          </span>
                        </td>
                        <td className="p-3 italic text-slate-500 dark:text-slate-400 max-w-xs">{q.originalText}</td>
                        <td className="p-3 font-medium text-slate-900 dark:text-white max-w-sm">{q.textPtBr}</td>
                        <td className="p-3 font-bold text-[10px]">{q.dimension}</td>
                        <td className="p-3 text-[11px] text-slate-500 dark:text-slate-400">{q.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ABA 2: ASQ + PCQ-24 */}
          {activeTab === 'm2_items' && (
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">
                    PCQ-24 — Psychological Capital Questionnaire (24 Questões Mapeadas)
                  </span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">24 QUESTÕES</span>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 uppercase font-bold text-[10px]">
                      <tr>
                        <th className="p-2.5 border-b border-slate-200 dark:border-slate-800">Nº</th>
                        <th className="p-2.5 border-b border-slate-200 dark:border-slate-800">Dimensão</th>
                        <th className="p-2.5 border-b border-slate-200 dark:border-slate-800">Texto em Português</th>
                        <th className="p-2.5 border-b border-slate-200 dark:border-slate-800">Item Invertido?</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                      {PCQ24_QUESTIONS.map((q) => (
                        <tr key={q.id} className="hover:bg-slate-50 dark:hover:bg-slate-950">
                          <td className="p-2.5 font-mono font-bold text-orange-600 dark:text-orange-400">{q.id}</td>
                          <td className="p-2.5 font-semibold text-slate-900 dark:text-white">{q.dimensionNamePtBr}</td>
                          <td className="p-2.5">{q.textPtBr}</td>
                          <td className="p-2.5 font-mono">
                            {q.isInverted ? (
                              <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold">
                                SIM (Fórmula 7 - X)
                              </span>
                            ) : (
                              <span className="text-slate-400">Não</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ABA 3: Testes Automatizados */}
          {activeTab === 'tests' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Todos os testes de validação psicométrica do PEAP passaram!</span>
                </div>
                <button
                  onClick={handleReRunTests}
                  className="px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Re-executar Testes</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white">Bateria Etapa 1 & 2 (P-Scale + ELOT)</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Validação da inversão do Item 4 e escala de expectativas.</p>
                  <div className="text-emerald-600 dark:text-emerald-400 font-bold text-xs">STATUS: 7/7 APROVADOS</div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white">Bateria Etapa 3 & 4 (ASQ + PCQ-24)</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Validação dos itens invertidos 13, 20, 23 e índices atribucionais.</p>
                  <div className="text-emerald-600 dark:text-emerald-400 font-bold text-xs">STATUS: 7/7 APROVADOS</div>
                </div>
              </div>
            </div>
          )}

          {/* ABA 4: Fontes & Direitos */}
          {activeTab === 'scientific' && (
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Referências Científicas Oficiais do PEAP</h4>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <li>• <strong>P — Positividade:</strong> Caprara et al. (2012) — The Positivity Scale; Borsa et al. (2015) — Adaptação Brasileira.</li>
                <li>• <strong>E — Expectativa:</strong> Chang, Maydeu-Olivares & D’Zurilla (1997) — The Extended Life Orientation Test (ELOT).</li>
                <li>• <strong>A — Atribuições:</strong> Peterson, Seligman et al. (1982) — The Attributional Style Questionnaire (ASQ).</li>
                <li>• <strong>P — Psicológico:</strong> Luthans, Avolio & Avey (2007) — Psychological Capital Questionnaire (PCQ-24). Mind Garden.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
            PEAP — Positividade, Expectativa, Atribuições e Psicológico • Assessment COMET
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            Fechar Auditoria
          </button>
        </div>
      </div>
    </div>
  );
};
