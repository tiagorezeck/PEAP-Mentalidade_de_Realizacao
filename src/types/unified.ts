/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AssessmentReport, ParticipantData } from './assessment.ts';
import { ASQUserAnswer, PsyCapASQIntegratedReport } from './pcq_asq.ts';

export interface UnifiedCometReport {
  id: string;
  participant: ParticipantData;
  calculatedAt: string;
  
  // Respostas Brutas dos 4 Blocos
  answers: {
    pScale: Record<number, number>;
    elot: Record<number, number>;
    pcq24: Record<number, number>;
    asq: Record<number, ASQUserAnswer>;
  };

  // Relatórios dos Módulos Primários
  module1Report: AssessmentReport;
  module2Report: PsyCapASQIntegratedReport;

  // Análise Unificada Holística (Cruzamento dos 4 Instrumentos)
  unifiedAnalysis: {
    globalMindsetIndex: number; // 0 a 100
    globalMindsetLabel: string;
    globalProfileSummary: string;
    synergiesAndTensions: {
      positivityXPsyCap: string;
      optimismXExplanatoryStyle: string;
      pessimismXResilience: string;
      overallExecutiveStance: string;
    };
    unifiedDevelopmentPlan: {
      coreStrengths: string[];
      keyVulnerabilities: string[];
      executiveActions: string[];
    };
  };
}

export type UnifiedReportTab = 'global' | 'module1' | 'module2';
export type Module1SubTab = 'm1_overview' | 'p_scale' | 'elot' | 'm1_matrix';
export type Module2SubTab = 'm2_overview' | 'pcq24' | 'asq' | 'm2_matrix';
