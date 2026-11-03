/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ParticipantData, AssessmentReport } from '../types/assessment.ts';
import { ASQUserAnswer, PsyCapASQIntegratedReport } from '../types/pcq_asq.ts';
import { UnifiedCometReport } from '../types/unified.ts';
import {
  calculatePositivity,
  calculateOptimism,
  calculatePessimism,
  calculateCometCrossAnalysis,
  generateDevelopmentPlan,
} from './scoring.ts';
import {
  calculatePCQ24,
  calculateASQ,
  calculatePsyCapASQIntegration,
} from './pcq_asq_scoring.ts';

/**
 * Helper para calcular o relatório completo do Módulo 1 (P-Scale + ELOT)
 */
export function calculateModule1AssessmentReport(
  pScaleAnswers: Record<number, number>,
  elotAnswers: Record<number, number>,
  participant: ParticipantData,
  calculatedAt?: string,
  customId?: string
): AssessmentReport {
  const timestamp = calculatedAt || new Date().toISOString();
  const id = customId || `m1_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  const positivity = calculatePositivity(pScaleAnswers);
  const optimism = calculateOptimism(elotAnswers);
  const pessimism = calculatePessimism(elotAnswers);

  const cometAnalysis = calculateCometCrossAnalysis(positivity, optimism, pessimism);
  const developmentPlan = generateDevelopmentPlan(positivity, optimism, pessimism, cometAnalysis);

  return {
    id,
    participant: {
      ...participant,
      date: timestamp,
    },
    calculatedAt: timestamp,
    pScaleAnswers,
    elotAnswers,
    positivity,
    optimism,
    pessimism,
    cometAnalysis,
    developmentPlan,
  };
}

/**
 * Algoritmo Unificado Mestre do Assessment COMET (Módulo 1 + Módulo 2)
 */
export function calculateUnifiedCometReport(
  answers: {
    pScale: Record<number, number>;
    elot: Record<number, number>;
    pcq24: Record<number, number>;
    asq: Record<number, ASQUserAnswer>;
  },
  participant: ParticipantData,
  customId?: string
): UnifiedCometReport {
  const timestamp = new Date().toISOString();
  const reportId = customId || `unified_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  // 1. Relatório Módulo 1 (P-Scale + ELOT)
  const module1Report = calculateModule1AssessmentReport(
    answers.pScale,
    answers.elot,
    participant,
    timestamp,
    `m1_${reportId}`
  );

  // 2. Relatório Módulo 2 (PCQ-24 + ASQ)
  const pcqReport = calculatePCQ24(answers.pcq24, participant);
  const asqReport = calculateASQ(answers.asq, participant);

  const module2Report = calculatePsyCapASQIntegration(
    `m2_${reportId}`,
    participant,
    pcqReport,
    asqReport
  );

  // 3. Normalizações para o Escore Global de Mentalidade COMET (0 a 100)
  const posScore100 = ((module1Report.positivity.meanScore - 1) / 4) * 100;
  
  const netElot = module1Report.optimism.meanScore - module1Report.pessimism.meanScore;
  const elotScore100 = Math.max(0, Math.min(100, ((netElot + 4) / 8) * 100));

  const psyCapScore100 = ((module2Report.pcqReport.meanScoreTotal - 1) / 5) * 100;

  const asqNet = module2Report.asqReport.scores.compositeTotal;
  const asqScore100 = Math.max(0, Math.min(100, ((asqNet + 18) / 36) * 100));

  // Escore Global Ponderado: 25% P-Scale, 25% ELOT, 25% PsyCap, 25% ASQ
  const globalMindsetIndex = Number(
    ((posScore100 * 0.25) + (elotScore100 * 0.25) + (psyCapScore100 * 0.25) + (asqScore100 * 0.25)).toFixed(1)
  );

  let globalMindsetLabel = 'Mentalidade Estratégica Equilibrada';
  if (globalMindsetIndex >= 82) {
    globalMindsetLabel = 'Mentalidade de Alto Impacto e Expansão';
  } else if (globalMindsetIndex >= 68) {
    globalMindsetLabel = 'Mentalidade Resiliente e Construtiva';
  } else if (globalMindsetIndex >= 50) {
    globalMindsetLabel = 'Mentalidade Pragmática e Vigilante';
  } else {
    globalMindsetLabel = 'Mentalidade Cautelosa com Necessidade de Recomposição';
  }

  // Resumo do Perfil Executivo Integrado
  const globalProfileSummary = `O participante ${participant.name} apresenta um Escore Global de Mentalidade COMET de ${globalMindsetIndex}/100 (${globalMindsetLabel}). Integra uma Positividade Geral em nível ${module1Report.positivity.levelLabel.toLowerCase()}, um Capital Psicológico (PsyCap) ${module2Report.pcqReport.overallLevelLabel.toLowerCase()} (${module2Report.pcqReport.meanScoreTotal}/6), e um Estilo Explicativo com saldo de atribuição de ${module2Report.asqReport.scores.compositeTotal}.`;

  // Análise de Sinergias e Tensões entre os 4 Instrumentos
  const positivityXPsyCap = module1Report.positivity.meanScore >= 3.8 && module2Report.pcqReport.meanScoreTotal >= 4.5
    ? 'Alta Sinergia Emocional: A positividade disposicional (P-Scale) serve como catalisador direto para a autoeficácia e esperança do PsyCap, criando um motor de autorregulação sustentável.'
    : 'Equilíbrio Funcional: Positividade e recursos do PsyCap operam de forma complementar, garantindo estabilidade no enfrentamento de metas cotidianas.';

  const optimismXExplanatoryStyle = module1Report.optimism.meanScore >= 3.5 && module2Report.asqReport.scores.compositePos >= 4.5
    ? 'Sinergia de Expectativa e Atribuição: O otimismo disposicional (ELOT) é sustentado por atribuições internas e estáveis para eventos positivos (ASQ), permitindo converter chances em conquistas duradouras.'
    : 'Alinhamento em Construção: As expectativas de futuro exigem reforço nas atribuições de responsabilidade pessoal para maximizar a autoria de sucessos.';

  const pessimismXResilience = module1Report.pessimism.meanScore >= 3.0 && module2Report.pcqReport.resilience.meanScore >= 4.5
    ? 'Blindagem Estratégica de Elite: O pessimismo prudente antecipa ameaças operacionais, enquanto a elevada resiliência garante rápida recuperação sem perda de vigor decisório.'
    : 'Filtro Defensivo Ativo: O pessimismo atua como auditoria de riscos sem comprometer a estabilidade do participante.';

  const overallExecutiveStance = globalMindsetIndex >= 70
    ? 'Postura Executiva de Alta Performance: Capacidade diferenciada de liderar transformações, inspirar times e tomar decisões sob volatilidade mantendo lucidez e bem-estar.'
    : 'Postura Executiva de Sustentação: Atuação focada em consolidação, segurança processual e gestão criteriosa de riscos.';

  // Plano de Desenvolvimento Holístico (Interseção das 4 dimensões)
  const coreStrengths: string[] = [
    `Positividade: ${module1Report.positivity.strengths[0] || 'Boa estabilidade anímica'}`,
    `PsyCap: Pilar mais forte é ${module2Report.pcqReport.efficacy.dimensionTitle} (${module2Report.pcqReport.efficacy.meanScore}/6)`,
    `Estilo Atribucional: Saldo CoB vs CoW de ${module2Report.asqReport.scores.compositeTotal > 0 ? '+' : ''}${module2Report.asqReport.scores.compositeTotal}`,
    `Gestão de Futuro: Quadrante ${module1Report.cometAnalysis.quadrantTitle}`,
  ];

  const keyVulnerabilities: string[] = [
    module1Report.pessimism.meanScore >= 3.3
      ? 'Atenção ao risco de hipervigilância e ceticismo com novas iniciativas'
      : 'Atenção para não ignorar contingências e testes de estresse em novos projetos',
    module2Report.asqReport.scores.compositeNeg >= 4.5
      ? 'Alerta para a tendência de internalizar ou perenizar a causa de falhas pontuais'
      : 'Manter disciplina na execução contínua de metas de longo prazo',
  ];

  const executiveActions: string[] = [
    'Instituir rodadas formais de "Pré-Mortem" antes de aprovar investimentos estratégicos.',
    'Desenvolver diário de atribuição de sucessos (reforçando a autoria interna em vitórias de equipe).',
    'Estabelecer rituais de alinhamento com liderados que combinem visão otimista de futuro e auditoria criteriosa de riscos.',
    'Revisar quinzenalmente as 4 alavancas do PsyCap (Autoeficácia, Esperança, Resiliência e Otimismo) aplicadas aos OKRs vigentes.',
  ];

  return {
    id: reportId,
    participant,
    calculatedAt: timestamp,
    answers,
    module1Report,
    module2Report,
    unifiedAnalysis: {
      globalMindsetIndex,
      globalMindsetLabel,
      globalProfileSummary,
      synergiesAndTensions: {
        positivityXPsyCap,
        optimismXExplanatoryStyle,
        pessimismXResilience,
        overallExecutiveStance,
      },
      unifiedDevelopmentPlan: {
        coreStrengths,
        keyVulnerabilities,
        executiveActions,
      },
    },
  };
}
