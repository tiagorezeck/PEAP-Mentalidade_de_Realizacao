/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Clock, Eye, FileText, Globe, Layers, PlusCircle, Sparkles, X } from 'lucide-react';
import { AssessmentReport } from '../types/assessment.ts';
import { PsyCapASQIntegratedReport } from '../types/pcq_asq.ts';
import { UnifiedCometReport } from '../types/unified.ts';
import {
  getSavedPCQASQReports,
  getSavedReports,
  getSavedUnifiedReports,
  seedSamplePCQASQReports,
  seedSampleReports,
  seedSampleUnifiedReports,
} from '../utils/storage.ts';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectUnifiedReport: (report: UnifiedCometReport) => void;
  onSelectReportModule1: (report: AssessmentReport) => void;
  onSelectReportModule2: (report: PsyCapASQIntegratedReport) => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  onSelectUnifiedReport,
  onSelectReportModule1,
  onSelectReportModule2,
}) => {
  const [activeTab, setActiveTab] = useState<'unified' | 'module1' | 'module2'>('unified');

  const [reportsUnified, setReportsUnified] = useState<UnifiedCometReport[]>(() =>
    getSavedUnifiedReports()
  );
  const [reportsM1, setReportsM1] = useState<AssessmentReport[]>(() => getSavedReports());
  const [reportsM2, setReportsM2] = useState<PsyCapASQIntegratedReport[]>(() =>
    getSavedPCQASQReports()
  );

  if (!isOpen) return null;

  const handleSeedUnified = () => {
    const updated = seedSampleUnifiedReports();
    setReportsUnified([...updated]);
  };

  const handleSeedM1 = () => {
    const updated = seedSampleReports();
    setReportsM1([...updated]);
  };

  const handleSeedM2 = () => {
    const updated = seedSamplePCQASQReports();
    setReportsM2([...updated]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm animate-fade-in no-print">
      <div className="w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[85vh] transition-colors">
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                Histórico de Avaliações PEAP • Assessment COMET
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Consulte e recupere relatórios integrados PEAP (Positividade, Expectativa, Atribuições e Psicológico).
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

        {/* Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/80 px-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('unified')}
            className={`py-3.5 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'unified'
                ? 'border-orange-600 dark:border-orange-500 text-orange-600 dark:text-orange-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4 text-orange-500" />
            <span>Relatórios PEAP Integrados</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-orange-50 dark:bg-orange-950 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800/40">
              {reportsUnified.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('module1')}
            className={`py-3.5 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'module1'
                ? 'border-orange-600 dark:border-orange-500 text-orange-600 dark:text-orange-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4 text-emerald-500" />
            <span>P-Scale + ELOT</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {reportsM1.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('module2')}
            className={`py-3.5 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'module2'
                ? 'border-orange-600 dark:border-orange-500 text-orange-600 dark:text-orange-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4 text-orange-500" />
            <span>ASQ + PCQ-24</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {reportsM2.length}
            </span>
          </button>
        </div>

        {/* Lista de Relatórios */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-3 flex-1 bg-white dark:bg-slate-900">
          {activeTab === 'unified' ? (
            reportsUnified.length === 0 ? (
              <div className="text-center py-12 space-y-3 text-slate-500 dark:text-slate-400">
                <p className="text-sm font-semibold">Nenhum relatório PEAP encontrado.</p>
                <button
                  onClick={handleSeedUnified}
                  className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Carregar Exemplos PEAP (Dr. Carlos & Dra. Mariana)</span>
                </button>
              </div>
            ) : (
              reportsUnified.map((report, idx) => (
                <div
                  key={`${report.id}_${idx}`}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-orange-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white text-sm">{report.participant.name}</span>
                      {report.participant.role && (
                        <span className="text-xs text-slate-500 dark:text-slate-400">· {report.participant.role}</span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {report.participant.organization ? `${report.participant.organization} · ` : ''}
                      Avaliado em {new Date(report.calculatedAt).toLocaleDateString('pt-BR')}
                    </div>
                    <div className="flex items-center gap-3 pt-1 text-xs font-semibold">
                      <span className="px-2 py-0.5 rounded bg-orange-50 dark:bg-orange-950 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800/50">
                        Escore PEAP: {report.unifiedAnalysis.globalMindsetIndex}/100
                      </span>
                      <span className="text-slate-600 dark:text-slate-400">
                        {report.unifiedAnalysis.globalMindsetLabel}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSelectUnifiedReport(report);
                      onClose();
                    }}
                    className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap shadow-xs cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Ver Relatório PEAP</span>
                  </button>
                </div>
              ))
            )
          ) : activeTab === 'module1' ? (
            reportsM1.length === 0 ? (
              <div className="text-center py-12 space-y-3 text-slate-500 dark:text-slate-400">
                <p className="text-sm font-semibold">Nenhuma avaliação P-Scale / ELOT salva.</p>
                <button
                  onClick={handleSeedM1}
                  className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Carregar Exemplos P-Scale + ELOT</span>
                </button>
              </div>
            ) : (
              reportsM1.map((report, idx) => (
                <div
                  key={`${report.id}_${idx}`}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-orange-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white text-sm">{report.participant.name}</span>
                      {report.participant.role && (
                        <span className="text-xs text-slate-500 dark:text-slate-400">· {report.participant.role}</span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {report.calculatedAt}
                    </div>
                    <div className="flex items-center gap-3 pt-1 text-xs text-slate-700 dark:text-slate-300">
                      <span>Positividade: <strong>{report.positivity.meanScore.toFixed(2)}</strong></span>
                      <span>Otimismo: <strong>{report.optimism.meanScore.toFixed(2)}</strong></span>
                      <span>Pessimismo: <strong>{report.pessimism.meanScore.toFixed(2)}</strong></span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSelectReportModule1(report);
                      onClose();
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Ver P-Scale + ELOT</span>
                  </button>
                </div>
              ))
            )
          ) : reportsM2.length === 0 ? (
            <div className="text-center py-12 space-y-3 text-slate-500 dark:text-slate-400">
              <p className="text-sm font-semibold">Nenhuma avaliação ASQ / PCQ-24 salva.</p>
              <button
                onClick={handleSeedM2}
                className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Carregar Exemplos ASQ + PCQ-24</span>
              </button>
            </div>
          ) : (
            reportsM2.map((report, idx) => (
              <div
                key={`${report.id}_${idx}`}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-orange-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">{report.participant.name}</span>
                    {report.participant.role && (
                      <span className="text-xs text-slate-500 dark:text-slate-400">· {report.participant.role}</span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {report.calculatedAt}
                  </div>
                  <div className="flex items-center gap-3 pt-1 text-xs text-slate-700 dark:text-slate-300">
                    <span>PsyCap Total: <strong>{report.pcqReport.meanScoreTotal.toFixed(2)} / 6.00</strong></span>
                    <span>ASQ Net: <strong>{report.asqReport.scores.compositeTotal.toFixed(2)}</strong></span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onSelectReportModule2(report);
                    onClose();
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Ver ASQ + PCQ-24</span>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between">
          <button
            onClick={
              activeTab === 'unified'
                ? handleSeedUnified
                : activeTab === 'module1'
                ? handleSeedM1
                : handleSeedM2
            }
            className="px-3.5 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
            <span>Adicionar Dados de Exemplo</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
