/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type InstrumentType = 'P_SCALE' | 'ELOT';

export type DimensionType = 'POSITIVITY' | 'OPTIMISM' | 'PESSIMISM' | 'FILLER';

export interface LikertOption {
  value: number; // 1 to 5
  label: string;
  shortLabel: string;
}

export interface Question {
  id: number; // 1 to 28
  globalNumber: number; // 1 to 28
  instrument: InstrumentType;
  itemNumber: number; // 1 to 8 (P-Scale) or 1 to 20 (ELOT)
  originalText: string;
  portugueseSource: string;
  textPtBr: string;
  dimension: DimensionType;
  isInverted: boolean; // true only for P-Scale item 4
  notes?: string;
}

export interface ParticipantData {
  name: string;
  email?: string;
  role?: string;
  organization?: string;
  date?: string;
}

export type ScoreLevel = 'BAIXO' | 'MODERADO_BAIXO' | 'MODERADO' | 'MODERADO_ALTO' | 'ALTO' | 'ELEVADO';

export interface PositivityResult {
  rawScore: number; // 8 to 40
  meanScore: number; // 1.00 to 5.00
  level: 'BAIXO' | 'MODERADO_BAIXO' | 'MODERADO_ALTO' | 'ALTO';
  levelLabel: string;
  description: string;
  characteristics: string[];
  strengths: string[];
  cautions: string[];
  personalProfessionalReflections: string[];
}

export interface OptimismResult {
  rawScore: number; // 6 to 30
  meanScore: number; // 1.00 to 5.00
  level: 'BAIXO' | 'MODERADO' | 'ELEVADO';
  levelLabel: string;
  description: string;
  strengths: string[];
  cautions: string[];
  decisionMakingReflections: string[];
  opportunityReflections: string[];
}

export interface PessimismResult {
  rawScore: number; // 9 to 45
  meanScore: number; // 1.00 to 5.00
  level: 'BAIXO' | 'MODERADO' | 'ELEVADO';
  levelLabel: string;
  description: string;
  strengths: string[];
  cautions: string[];
  riskAnticipationReflections: string[];
  difficultyPerceptionReflections: string[];
}

export interface CometCrossAnalysis {
  quadrantKey: 'OTIMISMO_PURO' | 'OTIMISMO_ESTRATEGICO' | 'PRAGMATISMO_NEUTRO' | 'PESSIMISMO_DEFENSIVO';
  quadrantTitle: string;
  quadrantSubtitle: string;
  summary: string;
  convergences: string[];
  divergences: string[];
  hypothesesToInvestigate: string[];
  positivityCrossInsight: string;
  businessImpacts: {
    leadership: string;
    management: string;
    planning: string;
    decisionMaking: string;
    changeManagement: string;
    opportunityPerception: string;
    riskAnticipation: string;
  };
}

export interface DevelopmentPlan {
  mainStrength: string;
  mainAttentionPoint: string;
  developmentAspect: string;
  practicalRecommendation: string;
  reflectionExercise: string;
  professionalAction: string;
  behavioralIndicator: string;
}

export interface AssessmentSession {
  id: string;
  participant: ParticipantData;
  createdAt: string;
  completedAt?: string;
  status: 'IN_PROGRESS' | 'COMPLETED';
  currentStep: 'presentation' | 'block1_positivity' | 'transition' | 'block2_elot' | 'processing' | 'report';
  currentQuestionIndex: number;
  pScaleAnswers: Record<number, number>; // questionId -> 1..5
  elotAnswers: Record<number, number>; // questionId -> 1..5
  report?: AssessmentReport;
}

export interface AssessmentReport {
  id: string;
  participant: ParticipantData;
  calculatedAt: string;
  pScaleAnswers: Record<number, number>;
  elotAnswers: Record<number, number>;
  positivity: PositivityResult;
  optimism: OptimismResult;
  pessimism: PessimismResult;
  cometAnalysis: CometCrossAnalysis;
  developmentPlan: DevelopmentPlan;
}
