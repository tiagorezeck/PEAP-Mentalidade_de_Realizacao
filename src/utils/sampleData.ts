/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AssessmentReport } from '../types/assessment.ts';
import {
  calculateCometCrossAnalysis,
  calculateOptimism,
  calculatePessimism,
  calculatePositivity,
  generateDevelopmentPlan,
} from './scoring.ts';

export function createSampleReports(): AssessmentReport[] {
  // Exemplo 1: Ana Paula Silveira - Otimismo Estratégico / Vigilante
  const pScale1: Record<number, number> = {
    1: 5, // Eu tenho muita confiança no futuro
    2: 4, // Posso contar com outras pessoas quando preciso delas
    3: 5, // Eu estou satisfeito com a minha vida
    4: 2, // Algumas vezes o futuro parece incerto -> invertido 4
    5: 5, // Eu geralmente sinto confiança em mim mesmo
    6: 5, // Eu vejo o futuro com esperança e entusiasmo
    7: 4, // Eu sinto que tenho muitas coisas das quais me orgulhar
    8: 5, // No geral, estou satisfeito comigo mesmo
  };

  const elot1: Record<number, number> = {
    9: 3,  // Filler
    10: 3, // Pessimism 1
    11: 5, // Optimism 1
    12: 2, // Pessimism 2
    13: 3, // Pessimism 3
    14: 5, // Optimism 2
    15: 4, // Filler
    16: 4, // Optimism 3
    17: 3, // Filler
    18: 3, // Pessimism 4
    19: 5, // Optimism 4
    20: 2, // Pessimism 5
    21: 4, // Filler
    22: 2, // Pessimism 6
    23: 5, // Filler
    24: 2, // Pessimism 7
    25: 5, // Optimism 5
    26: 3, // Pessimism 8
    27: 4, // Optimism 6
    28: 2, // Pessimism 9
  };

  const pos1 = calculatePositivity(pScale1);
  const opt1 = calculateOptimism(elot1);
  const pess1 = calculatePessimism(elot1);
  const cross1 = calculateCometCrossAnalysis(pos1, opt1, pess1);
  const plan1 = generateDevelopmentPlan(pos1, opt1, pess1, cross1);

  const report1: AssessmentReport = {
    id: 'sample_report_ana_paula',
    participant: {
      name: 'Ana Paula Silveira',
      role: 'Diretora de Operações',
      organization: 'Grupo Innova Tech',
      date: new Date().toLocaleDateString('pt-BR'),
    },
    calculatedAt: `${new Date().toLocaleDateString('pt-BR')} 14:30`,
    pScaleAnswers: pScale1,
    elotAnswers: elot1,
    positivity: pos1,
    optimism: opt1,
    pessimism: pess1,
    cometAnalysis: cross1,
    developmentPlan: plan1,
  };

  // Exemplo 2: Carlos Eduardo Rocha - Pessimismo Defensivo / Blindagem Analítica
  const pScale2: Record<number, number> = {
    1: 3,
    2: 3,
    3: 4,
    4: 3, // invertido 3
    5: 4,
    6: 3,
    7: 4,
    8: 4,
  };

  const elot2: Record<number, number> = {
    9: 2,  // Filler
    10: 4, // Pessimism
    11: 3, // Optimism
    12: 3, // Pessimism
    13: 4, // Pessimism
    14: 3, // Optimism
    15: 3, // Filler
    16: 2, // Optimism
    17: 4, // Filler
    18: 4, // Pessimism
    19: 3, // Optimism
    20: 3, // Pessimism
    21: 2, // Filler
    22: 3, // Pessimism
    23: 3, // Filler
    24: 4, // Pessimism
    25: 3, // Optimism
    26: 4, // Pessimism
    27: 3, // Optimism
    28: 4, // Pessimism
  };

  const pos2 = calculatePositivity(pScale2);
  const opt2 = calculateOptimism(elot2);
  const pess2 = calculatePessimism(elot2);
  const cross2 = calculateCometCrossAnalysis(pos2, opt2, pess2);
  const plan2 = generateDevelopmentPlan(pos2, opt2, pess2, cross2);

  const report2: AssessmentReport = {
    id: 'sample_report_carlos_rocha',
    participant: {
      name: 'Carlos Eduardo Rocha',
      role: 'Gerente de Riscos & Compliance',
      organization: 'Nexus Engenharia',
      date: new Date().toLocaleDateString('pt-BR'),
    },
    calculatedAt: `${new Date().toLocaleDateString('pt-BR')} 09:15`,
    pScaleAnswers: pScale2,
    elotAnswers: elot2,
    positivity: pos2,
    optimism: opt2,
    pessimism: pess2,
    cometAnalysis: cross2,
    developmentPlan: plan2,
  };

  return [report1, report2];
}
