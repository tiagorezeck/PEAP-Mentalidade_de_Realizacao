/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AuditModal } from './components/AuditModal.tsx';
import { Header, AssessmentModule } from './components/Header.tsx';
import { HistoryModal } from './components/HistoryModal.tsx';
import { PresentationView } from './components/PresentationView.tsx';
import { PresentationViewPCQASQ } from './components/PresentationViewPCQASQ.tsx';
import { ProcessingView } from './components/ProcessingView.tsx';
import { UnifiedPresentationView } from './components/UnifiedPresentationView.tsx';
import { UnifiedReportView } from './components/UnifiedReportView.tsx';
import { ReportView } from './components/ReportView.tsx';
import { ReportPCQASQIntegratedView } from './components/ReportPCQASQIntegratedView.tsx';

import { ParticipantData, AssessmentReport } from './types/assessment.ts';
import { PsyCapASQIntegratedReport, ASQUserAnswer } from './types/pcq_asq.ts';
import { UnifiedCometReport } from './types/unified.ts';

import { calculateUnifiedCometReport } from './utils/unified_scoring.ts';
import { saveCompletedUnifiedReport, getSavedUnifiedReports } from './utils/storage.ts';
import { generateSampleUnifiedReports } from './utils/unified_sampleData.ts';

export default function App() {
  // Módulo Ativo ('UNIFIED' por padrão para teste unificado em 4 blocos)
  const [activeModule, setActiveModule] = useState<AssessmentModule | 'UNIFIED'>('UNIFIED');

  // Estado do Teste Unificado
  const [unifiedStep, setUnifiedStep] = useState<
    'landing' | 'participant_info' | 'testing' | 'processing' | 'report'
  >('report'); // inicia direto com relatório para teste imediato ou landing

  const [participant, setParticipant] = useState<ParticipantData>({
    name: 'Dr. Carlos Eduardo Silveira',
    email: 'carlos.silveira@empresa.com.br',
    role: 'Diretor de Operações e Estratégia',
    organization: 'Grupo Nexus Inovação',
  });

  // Relatório Unificado Mestre Ativo (Inicia com sample 1 para visualização imediata)
  const [unifiedReport, setUnifiedReport] = useState<UnifiedCometReport | null>(() => {
    const saved = getSavedUnifiedReports();
    return saved.length > 0 ? saved[0] : generateSampleUnifiedReports()[0];
  });

  // Respostas coletadas no teste unificado
  const [rawAnswers, setRawAnswers] = useState<{
    pScale: Record<number, number>;
    elot: Record<number, number>;
    pcq24: Record<number, number>;
    asq: Record<number, ASQUserAnswer>;
  } | null>(null);

  // Estados legados para visualização de relatórios isolados do M1 e M2
  const [m1Report, setM1Report] = useState<AssessmentReport | null>(null);
  const [m2Report, setM2Report] = useState<PsyCapASQIntegratedReport | null>(null);

  // Modais Globais
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Troca de módulo de teste
  const handleSelectModule = (mod: AssessmentModule) => {
    setActiveModule(mod);
    if (mod === 'POSITIVITY_ELOT') {
      setUnifiedStep('landing');
    } else if (mod === 'PSYCAP_ASQ') {
      setUnifiedStep('landing');
    }
  };

  // Iniciar novo teste unificado em 4 blocos
  const handleStartUnifiedTest = (data: ParticipantData) => {
    setParticipant(data);
    setUnifiedStep('testing');
  };

  // Conclusão dos 4 blocos do teste unificado
  const handleCompleteUnifiedBlocks = (answers: {
    pScale: Record<number, number>;
    elot: Record<number, number>;
    pcq24: Record<number, number>;
    asq: Record<number, ASQUserAnswer>;
  }) => {
    setRawAnswers(answers);
    setUnifiedStep('processing');
  };

  // Conclusão do tempo de processamento científico
  const handleFinishProcessing = () => {
    if (!rawAnswers) return;
    const report = calculateUnifiedCometReport(rawAnswers, participant);
    saveCompletedUnifiedReport(report);
    setUnifiedReport(report);
    setActiveModule('UNIFIED');
    setUnifiedStep('report');
  };

  // Reiniciar novo teste
  const handleNewAssessment = () => {
    setUnifiedStep('participant_info');
  };

  // Seleção no histórico
  const handleSelectUnifiedReportFromHistory = (report: UnifiedCometReport) => {
    setActiveModule('UNIFIED');
    setUnifiedReport(report);
    setUnifiedStep('report');
  };

  const handleSelectM1ReportFromHistory = (report: AssessmentReport) => {
    setActiveModule('POSITIVITY_ELOT');
    setM1Report(report);
    setUnifiedStep('report');
  };

  const handleSelectM2ReportFromHistory = (report: PsyCapASQIntegratedReport) => {
    setActiveModule('PSYCAP_ASQ');
    setM2Report(report);
    setUnifiedStep('report');
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200 selection:bg-indigo-600 selection:text-white">
      {/* Cabeçalho da Aplicação */}
      <Header
        activeModule={activeModule}
        onSelectModule={handleSelectModule}
        onNewAssessment={handleNewAssessment}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenAudit={() => setIsAuditOpen(true)}
        currentStep={unifiedStep}
      />

      {/* Conteúdo Principal */}
      <main className="flex-1">
        {/* MODULO UNIFICADO COMPLETO (4 BLOCOS SECTORIZADOS) */}
        {activeModule === 'UNIFIED' && (
          <>
            {/* Tela de Cadastro do Participante / Início */}
            {unifiedStep === 'participant_info' && (
              <PresentationView
                onStart={handleStartUnifiedTest}
                onResume={() => setUnifiedStep('testing')}
                hasActiveSession={false}
                onOpenAudit={() => setIsAuditOpen(true)}
              />
            )}

            {/* Aplicação Unificada em 4 Blocos */}
            {unifiedStep === 'testing' && (
              <UnifiedPresentationView
                participant={participant}
                onComplete={handleCompleteUnifiedBlocks}
                onCancel={() => setUnifiedStep('report')}
              />
            )}

            {/* Tela de Processamento com Animação Científica */}
            {unifiedStep === 'processing' && (
              <ProcessingView onComplete={handleFinishProcessing} />
            )}

            {/* Relatório Mestre Unificado */}
            {unifiedStep === 'report' && unifiedReport && (
              <UnifiedReportView
                report={unifiedReport}
                onNewAssessment={handleNewAssessment}
                onOpenHistory={() => setIsHistoryOpen(true)}
                onOpenAudit={() => setIsAuditOpen(true)}
              />
            )}
          </>
        )}

        {/* MODULOS ISOLADOS (OPCIONAIS) */}
        {activeModule === 'POSITIVITY_ELOT' && (
          <>
            {unifiedStep === 'landing' && (
              <PresentationView
                onStart={handleStartUnifiedTest}
                onResume={() => setUnifiedStep('testing')}
                hasActiveSession={false}
                onOpenAudit={() => setIsAuditOpen(true)}
              />
            )}
            {unifiedStep === 'report' && m1Report && (
              <ReportView
                report={m1Report}
                onNewAssessment={handleNewAssessment}
                onOpenHistory={() => setIsHistoryOpen(true)}
                onOpenAudit={() => setIsAuditOpen(true)}
              />
            )}
          </>
        )}

        {activeModule === 'PSYCAP_ASQ' && (
          <>
            {unifiedStep === 'landing' && (
              <PresentationViewPCQASQ
                onStart={(data) => handleStartUnifiedTest(data)}
                onResume={() => setUnifiedStep('testing')}
                hasActiveSession={false}
                onOpenAudit={() => setIsAuditOpen(true)}
              />
            )}
            {unifiedStep === 'report' && m2Report && (
              <ReportPCQASQIntegratedView
                report={m2Report}
                onNewAssessment={handleNewAssessment}
                onOpenHistory={() => setIsHistoryOpen(true)}
                onOpenAudit={() => setIsAuditOpen(true)}
              />
            )}
          </>
        )}
      </main>

      {/* Modais Globais */}
      <AuditModal isOpen={isAuditOpen} onClose={() => setIsAuditOpen(false)} />
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onSelectUnifiedReport={handleSelectUnifiedReportFromHistory}
        onSelectReportModule1={handleSelectM1ReportFromHistory}
        onSelectReportModule2={handleSelectM2ReportFromHistory}
      />
    </div>
  );
}
