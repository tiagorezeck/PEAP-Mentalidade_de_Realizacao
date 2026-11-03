/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ASQUserAnswer, PsyCapASQIntegratedReport } from '../types/pcq_asq.ts';
import { ParticipantData } from '../types/assessment.ts';
import { calculateASQ, calculatePCQ24, calculatePsyCapASQIntegration } from './pcq_asq_scoring.ts';

export function createSamplePCQASQReports(): PsyCapASQIntegratedReport[] {
  // Amostra 1: Mariana Ferreira (Gerente Sênior de Produtos)
  const participant1: ParticipantData = {
    name: 'Mariana Ferreira',
    role: 'Gerente Sênior de Produtos',
    organization: 'Vanguard Digital',
    date: new Date().toLocaleDateString('pt-BR'),
  };

  const pcq1: Record<number, number> = {
    1: 5, 2: 5, 3: 5, 4: 5, 5: 4, 6: 5, // Efficacy
    7: 5, 8: 5, 9: 5, 10: 4, 11: 5, 12: 5, // Hope
    13: 2, 14: 5, 15: 5, 16: 5, 17: 4, 18: 5, // Resilience (13 inverted: 7-2=5)
    19: 5, 20: 2, 21: 5, 22: 5, 23: 2, 24: 5, // Optimism (20,23 inverted: 7-2=5)
  };

  const asq1: Record<number, ASQUserAnswer> = {
    1: { situationId: 1, causeText: 'Minha preparação técnica e visão estratégica', internality: 6, stability: 6, globality: 5 },
    2: { situationId: 2, causeText: 'Dedicação intensa da equipe e planejamento prévio', internality: 6, stability: 5, globality: 6 },
    3: { situationId: 3, causeText: 'Minha empatia e postura colaborativa diária', internality: 5, stability: 5, globality: 5 },
    4: { situationId: 4, causeText: 'Histórico consistente de entregas de alto valor', internality: 6, stability: 6, globality: 6 },
    5: { situationId: 5, causeText: 'Boa capacidade de escuta ativa e diálogo aberto', internality: 5, stability: 5, globality: 5 },
    6: { situationId: 6, causeText: 'Relações de confiança cultivadas com transparência', internality: 6, stability: 6, globality: 5 },

    7: { situationId: 7, causeText: 'Alta concorrência no mercado atual', internality: 2, stability: 3, globality: 2 },
    8: { situationId: 8, causeText: 'Falta de contexto prévio da audiência', internality: 3, stability: 2, globality: 2 },
    9: { situationId: 9, causeText: 'Falta de tempo para revisão de detalhes técnicos', internality: 3, stability: 2, globality: 3 },
    10: { situationId: 10, causeText: 'Estresse momentâneo da outra pessoa', internality: 2, stability: 2, globality: 1 },
    11: { situationId: 11, causeText: 'Mudança de prioridades do parceiro', internality: 2, stability: 3, globality: 2 },
    12: { situationId: 12, causeText: 'Oscilação imprevista de custos de terceiros', internality: 3, stability: 2, globality: 2 },
  };

  const pcqReport1 = calculatePCQ24(pcq1, participant1);
  const asqReport1 = calculateASQ(asq1, participant1);
  const integrated1 = calculatePsyCapASQIntegration('sample_mariana_ferreira', participant1, pcqReport1, asqReport1);

  // Amostra 2: Roberto Andrade (Diretor Financeiro)
  const participant2: ParticipantData = {
    name: 'Roberto Andrade',
    role: 'Diretor Financeiro',
    organization: 'Fintech Polaris',
    date: new Date().toLocaleDateString('pt-BR'),
  };

  const pcq2: Record<number, number> = {
    1: 4, 2: 4, 3: 4, 4: 4, 5: 3, 6: 4,
    7: 4, 8: 4, 9: 4, 10: 3, 11: 4, 12: 4,
    13: 3, 14: 4, 15: 4, 16: 4, 17: 4, 18: 4,
    19: 4, 20: 3, 21: 4, 22: 4, 23: 3, 24: 4,
  };

  const asq2: Record<number, ASQUserAnswer> = {
    1: { situationId: 1, causeText: 'Suporte de consultores externos e oportunidade de mercado', internality: 4, stability: 4, globality: 4 },
    2: { situationId: 2, causeText: 'Trabalho de auditoria minucioso e rigor do processo', internality: 5, stability: 5, globality: 4 },
    3: { situationId: 3, causeText: 'Boa vontade do colega de trabalho', internality: 4, stability: 4, globality: 3 },
    4: { situationId: 4, causeText: 'Política salarial da empresa e tempo de casa', internality: 4, stability: 4, globality: 4 },
    5: { situationId: 5, causeText: 'Intervenção neutra da diretoria', internality: 4, stability: 4, globality: 3 },
    6: { situationId: 6, causeText: 'Circunstância favorável no ambiente de trabalho', internality: 4, stability: 4, globality: 4 },

    7: { situationId: 7, causeText: 'Cenário econômico e retração de contratações', internality: 3, stability: 4, globality: 3 },
    8: { situationId: 8, causeText: 'Falta de familiaridade com o tema apresentado', internality: 4, stability: 3, globality: 3 },
    9: { situationId: 9, causeText: 'Nível de exigência do teste muito acima do padrão', internality: 3, stability: 3, globality: 3 },
    10: { situationId: 10, causeText: 'Conflito de interesses na área comercial', internality: 3, stability: 3, globality: 2 },
    11: { situationId: 11, causeText: 'Reestruturação de metas da gerência', internality: 3, stability: 3, globality: 3 },
    12: { situationId: 12, causeText: 'Alteração repentina na taxa de câmbio', internality: 2, stability: 4, globality: 3 },
  };

  const pcqReport2 = calculatePCQ24(pcq2, participant2);
  const asqReport2 = calculateASQ(asq2, participant2);
  const integrated2 = calculatePsyCapASQIntegration('sample_roberto_andrade', participant2, pcqReport2, asqReport2);

  return [integrated1, integrated2];
}
