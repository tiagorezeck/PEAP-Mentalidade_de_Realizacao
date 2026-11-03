/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AssessmentReport, AssessmentSession, ParticipantData } from '../types/assessment.ts';
import { PCQASQSession, PsyCapASQIntegratedReport } from '../types/pcq_asq.ts';
import { createSampleReports } from './sampleData.ts';
import { createSamplePCQASQReports } from './pcq_asq_sampleData.ts';

const STORAGE_KEYS = {
  P_SCALE_RESPONSES: 'comet_positivity_responses',
  ELOT_RESPONSES: 'comet_elot_responses',
  SESSIONS: 'comet_assessment_sessions',
  ACTIVE_SESSION: 'comet_active_session',
  PCQ_ASQ_SESSIONS: 'comet_pcq_asq_assessment_sessions',
  ACTIVE_PCQ_ASQ_SESSION: 'comet_active_pcq_asq_session',
  UNIFIED_SESSIONS: 'comet_unified_assessment_sessions',
};

import { UnifiedCometReport } from '../types/unified.ts';
import { generateSampleUnifiedReports } from './unified_sampleData.ts';

/**
 * Salva relatório mestre unificado no histórico permanente
 */
export function saveCompletedUnifiedReport(report: UnifiedCometReport): void {
  try {
    const list: UnifiedCometReport[] = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.UNIFIED_SESSIONS) || '[]'
    );
    const filtered = list.filter((r) => r.id !== report.id);
    filtered.unshift(report);
    localStorage.setItem(STORAGE_KEYS.UNIFIED_SESSIONS, JSON.stringify(filtered));
  } catch (e) {
    console.error('Erro ao salvar relatório unificado no histórico:', e);
  }
}

/**
 * Força a inclusão de relatórios de exemplo unificados
 */
export function seedSampleUnifiedReports(): UnifiedCometReport[] {
  try {
    const list: UnifiedCometReport[] = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.UNIFIED_SESSIONS) || '[]'
    );
    const samples = generateSampleUnifiedReports();

    const existingIds = new Set(list.map((r) => r.id));
    const newSamples = samples.filter((s) => !existingIds.has(s.id));

    const updatedList = [...newSamples, ...list];
    localStorage.setItem(STORAGE_KEYS.UNIFIED_SESSIONS, JSON.stringify(updatedList));
    return updatedList;
  } catch (e) {
    console.error('Erro ao gerar relatórios de exemplo unificados:', e);
    return [];
  }
}

/**
 * Retorna histórico de relatórios unificados (com fallback para amostras)
 */
export function getSavedUnifiedReports(): UnifiedCometReport[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.UNIFIED_SESSIONS);
    let list: UnifiedCometReport[] = data ? JSON.parse(data) : [];
    if (!list || list.length === 0) {
      list = seedSampleUnifiedReports();
    }
    const seen = new Set<string>();
    return list.map((report, idx) => {
      let uniqueId = report.id || `unified_${idx}`;
      if (seen.has(uniqueId)) {
        uniqueId = `${uniqueId}_dup_${idx}`;
      }
      seen.add(uniqueId);
      return { ...report, id: uniqueId };
    });
  } catch (e) {
    console.error('Erro ao carregar histórico unificado:', e);
    return [];
  }
}


/**
 * Salva respostas da P-Scale de forma autônoma
 */
export function savePositivityResponses(sessionId: string, responses: Record<number, number>): void {
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.P_SCALE_RESPONSES) || '{}');
    all[sessionId] = {
      responses,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEYS.P_SCALE_RESPONSES, JSON.stringify(all));
  } catch (e) {
    console.error('Erro ao salvar respostas da P-Scale no localStorage:', e);
  }
}

/**
 * Salva respostas do ELOT de forma autônoma
 */
export function saveElotResponses(sessionId: string, responses: Record<number, number>): void {
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.ELOT_RESPONSES) || '{}');
    all[sessionId] = {
      responses,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEYS.ELOT_RESPONSES, JSON.stringify(all));
  } catch (e) {
    console.error('Erro ao salvar respostas do ELOT no localStorage:', e);
  }
}

/**
 * Salva ou atualiza a sessão ativa para recuperação de interrupções acidentais
 */
export function saveActiveSession(session: AssessmentSession): void {
  try {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_SESSION, JSON.stringify(session));
  } catch (e) {
    console.error('Erro ao salvar sessão ativa:', e);
  }
}

/**
 * Recupera sessão ativa em andamento se houver
 */
export function getActiveSession(): AssessmentSession | null {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ACTIVE_SESSION);
    if (!data) return null;
    return JSON.parse(data) as AssessmentSession;
  } catch (e) {
    console.error('Erro ao carregar sessão ativa:', e);
    return null;
  }
}

/**
 * Limpa sessão ativa após conclusão ou reinício voluntário
 */
export function clearActiveSession(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_SESSION);
  } catch (e) {
    console.error('Erro ao limpar sessão ativa:', e);
  }
}

/**
 * Salva relatório completo no histórico permanente do Módulo 1 (Positividade + ELOT)
 */
export function saveCompletedReport(report: AssessmentReport): void {
  try {
    const list: AssessmentReport[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.SESSIONS) || '[]');
    const filtered = list.filter((r) => r.id !== report.id);
    filtered.unshift(report);
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(filtered));
  } catch (e) {
    console.error('Erro ao salvar relatório no histórico:', e);
  }
}

/**
 * Força a inclusão de relatórios de exemplo de teste do Módulo 1
 */
export function seedSampleReports(): AssessmentReport[] {
  try {
    const list: AssessmentReport[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.SESSIONS) || '[]');
    const samples = createSampleReports();

    const existingIds = new Set(list.map((r) => r.id));
    const newSamples = samples.filter((s) => !existingIds.has(s.id));
    
    const updatedList = [...newSamples, ...list];
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(updatedList));
    return updatedList;
  } catch (e) {
    console.error('Erro ao gerar relatórios de exemplo do Módulo 1:', e);
    return [];
  }
}

/**
 * Retorna relatórios do Módulo 1
 */
export function getSavedReports(): AssessmentReport[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    let list: AssessmentReport[] = data ? JSON.parse(data) : [];
    if (!list || list.length === 0) {
      list = seedSampleReports();
    }
    const seen = new Set<string>();
    return list.map((report, idx) => {
      let uniqueId = report.id || `m1_${idx}`;
      if (seen.has(uniqueId)) {
        uniqueId = `${uniqueId}_dup_${idx}`;
      }
      seen.add(uniqueId);
      return { ...report, id: uniqueId };
    });
  } catch (e) {
    console.error('Erro ao carregar histórico do Módulo 1:', e);
    return [];
  }
}

/**
 * Salva relatório no histórico permanente do Módulo 2 (PCQ-24 + ASQ)
 */
export function saveCompletedPCQASQReport(report: PsyCapASQIntegratedReport): void {
  try {
    const list: PsyCapASQIntegratedReport[] = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.PCQ_ASQ_SESSIONS) || '[]'
    );
    const filtered = list.filter((r) => r.id !== report.id);
    filtered.unshift(report);
    localStorage.setItem(STORAGE_KEYS.PCQ_ASQ_SESSIONS, JSON.stringify(filtered));
  } catch (e) {
    console.error('Erro ao salvar relatório do Módulo 2:', e);
  }
}

/**
 * Força a inclusão de relatórios de exemplo do Módulo 2 (PCQ-24 + ASQ)
 */
export function seedSamplePCQASQReports(): PsyCapASQIntegratedReport[] {
  try {
    const list: PsyCapASQIntegratedReport[] = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.PCQ_ASQ_SESSIONS) || '[]'
    );
    const samples = createSamplePCQASQReports();

    const existingIds = new Set(list.map((r) => r.id));
    const newSamples = samples.filter((s) => !existingIds.has(s.id));

    const updatedList = [...newSamples, ...list];
    localStorage.setItem(STORAGE_KEYS.PCQ_ASQ_SESSIONS, JSON.stringify(updatedList));
    return updatedList;
  } catch (e) {
    console.error('Erro ao gerar amostras do Módulo 2:', e);
    return [];
  }
}

/**
 * Retorna relatórios do Módulo 2 (preenche com amostras se estiver vazio)
 */
export function getSavedPCQASQReports(): PsyCapASQIntegratedReport[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PCQ_ASQ_SESSIONS);
    let list: PsyCapASQIntegratedReport[] = data ? JSON.parse(data) : [];
    if (!list || list.length === 0) {
      list = seedSamplePCQASQReports();
    }
    const seen = new Set<string>();
    return list.map((report, idx) => {
      let uniqueId = report.id || `m2_${idx}`;
      if (seen.has(uniqueId)) {
        uniqueId = `${uniqueId}_dup_${idx}`;
      }
      seen.add(uniqueId);
      return { ...report, id: uniqueId };
    });
  } catch (e) {
    console.error('Erro ao carregar histórico do Módulo 2:', e);
    return [];
  }
}

/**
 * Salva a sessão ativa do Módulo 2 (PCQ-24 + ASQ)
 */
export function saveActivePCQASQSession(session: PCQASQSession): void {
  try {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_PCQ_ASQ_SESSION, JSON.stringify(session));
  } catch (e) {
    console.error('Erro ao salvar sessão ativa do Módulo 2:', e);
  }
}

/**
 * Recupera sessão ativa do Módulo 2 se houver
 */
export function getActivePCQASQSession(): PCQASQSession | null {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ACTIVE_PCQ_ASQ_SESSION);
    if (!data) return null;
    return JSON.parse(data) as PCQASQSession;
  } catch (e) {
    console.error('Erro ao carregar sessão ativa do Módulo 2:', e);
    return null;
  }
}

/**
 * Limpa a sessão ativa do Módulo 2
 */
export function clearActivePCQASQSession(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_PCQ_ASQ_SESSION);
  } catch (e) {
    console.error('Erro ao limpar sessão ativa do Módulo 2:', e);
  }
}

