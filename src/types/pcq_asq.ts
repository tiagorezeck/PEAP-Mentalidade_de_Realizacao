/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ParticipantData } from './assessment.ts';

export type ModuleType = 'POSITIVITY_ELOT' | 'PSYCAP_ASQ';

export type PCQDimensionKey = 'EFFICACY' | 'HOPE' | 'RESILIENCE' | 'OPTIMISM';

export interface PCQ24Question {
  id: number; // 1 to 24
  itemNumber: number; // 1 to 6 within dimension
  dimension: PCQDimensionKey;
  dimensionNamePtBr: string;
  originalText: string;
  textPtBr: string;
  isInverted: boolean; // items 13, 20, 23 in standard PCQ-24
}

export type ASQEventType = 'POSITIVE' | 'NEGATIVE';
export type ASQDomain = 'ACHIEVEMENT' | 'AFFILIATION';

export interface ASQSituation {
  id: number; // 1 to 12
  situationType: ASQEventType;
  domain: ASQDomain;
  titlePtBr: string;
  textPtBr: string;
  originalText: string;
}

export interface ASQUserAnswer {
  situationId: number; // 1 to 12
  causeText?: string; // Optional open text (legacy / historical compatibility)
  internality: number; // 1 to 7
  stability: number; // 1 to 7
  globality: number; // 1 to 7
}

export interface PCQ24DimensionResult {
  dimensionKey: PCQDimensionKey;
  dimensionTitle: string;
  rawScore: number; // 6 to 36
  meanScore: number; // 1.00 to 6.00
  levelLabel: string;
  description: string;
  strengths: string[];
  cautions: string[];
  professionalImpacts: string[];
  developmentRecommendations: string[];
}

export interface PCQ24Report {
  id: string;
  participant: ParticipantData;
  calculatedAt: string;
  rawScoreTotal: number; // 24 to 144
  meanScoreTotal: number; // 1.00 to 6.00
  overallLevelLabel: string;
  overallDescription: string;
  efficacy: PCQ24DimensionResult;
  hope: PCQ24DimensionResult;
  resilience: PCQ24DimensionResult;
  optimism: PCQ24DimensionResult;
}

export interface ASQDimensionScore {
  internalityPos: number; // 1.00 to 7.00
  stabilityPos: number; // 1.00 to 7.00
  globalityPos: number; // 1.00 to 7.00
  compositePos: number; // 1.00 to 7.00 (CoPos)

  internalityNeg: number; // 1.00 to 7.00
  stabilityNeg: number; // 1.00 to 7.00
  globalityNeg: number; // 1.00 to 7.00
  compositeNeg: number; // 1.00 to 7.00 (CoNeg)

  compositeTotal: number; // -6.00 to +6.00 (CoPos - CoNeg)
  hopelessnessIndex: number; // 2.00 to 14.00 (Stable_Neg + Global_Neg)
}

export interface ASQReport {
  id: string;
  participant: ParticipantData;
  calculatedAt: string;
  answers: Record<number, ASQUserAnswer>;
  scores: ASQDimensionScore;
  positiveProfile: {
    title: string;
    description: string;
    level: string;
  };
  negativeProfile: {
    title: string;
    description: string;
    level: string;
  };
  strengths: string[];
  cautions: string[];
  professionalImpacts: string[];
  developmentRecommendations: string[];
}

export interface PsyCapASQIntegratedReport {
  id: string;
  participant: ParticipantData;
  calculatedAt: string;
  pcqReport: PCQ24Report;
  asqReport: ASQReport;
  crossAnalyses: {
    efficacyXInternality: string;
    hopeXStability: string;
    resilienceXNegativeAttributions: string;
    optimismXPositiveAttributions: string;
    overallPsyCapXExplanatoryStyle: string;
  };
  convergences: string[];
  divergences: string[];
  tensions: string[];
  businessImpacts: {
    leadership: string;
    peopleManagement: string;
    decisionMaking: string;
    execution: string;
    persistence: string;
    adversityHandling: string;
    learningFromErrors: string;
    changeAdaptation: string;
    autonomy: string;
  };
  developmentPlan: {
    strengthsToFortify: string;
    attentionPoints: string;
    competenciesToDevelop: string;
    practicalRecommendations: string;
    individualExercises: string;
    workplaceActions: string;
    behavioralIndicators: string;
    followUpSuggestions: string;
  };
}

export interface PCQASQSession {
  id: string;
  participant: ParticipantData;
  createdAt: string;
  completedAt?: string;
  status: 'IN_PROGRESS' | 'COMPLETED';
  mode?: 'FULL' | 'PCQ_ONLY' | 'ASQ_ONLY';
  currentStep:
    | 'presentation'
    | 'block1_pcq'
    | 'transition'
    | 'block2_asq'
    | 'processing'
    | 'report_pcq'
    | 'report_asq'
    | 'report_integrated';
  pcqAnswers: Record<number, number>; // questionId -> 1..6
  asqAnswers: Record<number, ASQUserAnswer>; // situationId -> answer
}
