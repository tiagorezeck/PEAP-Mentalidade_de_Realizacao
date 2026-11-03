/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ASQUserAnswer } from '../types/pcq_asq.ts';
import { UnifiedCometReport } from '../types/unified.ts';
import { calculateUnifiedCometReport } from './unified_scoring.ts';

/**
 * Gera um objeto de respostas do ASQ realista para testes
 */
function createSampleASQAnswers(pattern: 'positive' | 'balanced' | 'cautious'): Record<number, ASQUserAnswer> {
  const result: Record<number, ASQUserAnswer> = {};
  
  for (let i = 1; i <= 12; i++) {
    const isGood = i % 2 !== 0; // 1, 3, 5, 7, 9, 11 são boas
    if (pattern === 'positive') {
      result[i] = {
        situationId: i,
        causeText: isGood ? 'Minha dedicação, liderança e preparo contínuo' : 'Fatores conjunturais externos temporários',
        internality: isGood ? 6 : 3,
        stability: isGood ? 6 : 2,
        globality: isGood ? 6 : 3,
      };
    } else if (pattern === 'balanced') {
      result[i] = {
        situationId: i,
        causeText: isGood ? 'Trabalho em equipe e planejamento prévio' : 'Desafios normais de mercado e prazos justos',
        internality: isGood ? 5 : 4,
        stability: isGood ? 5 : 4,
        globality: isGood ? 5 : 4,
      };
    } else {
      result[i] = {
        situationId: i,
        causeText: isGood ? 'Sorte e momento favorável do mercado' : 'Falha na minha gestão e falta de antecipação',
        internality: isGood ? 3 : 6,
        stability: isGood ? 3 : 5,
        globality: isGood ? 3 : 5,
      };
    }
  }
  return result;
}

export function generateSampleUnifiedReports(): UnifiedCometReport[] {
  // Amostra 1: Carlos Eduardo - Perfil Executivo de Alto Impacto
  const sample1Answers = {
    pScale: { 1: 5, 2: 4, 3: 5, 4: 2, 5: 5, 6: 4, 7: 5, 8: 5 }, // Positividade elevada (item 4 invertido 6-2=4)
    elot: {
      9: 4, 10: 2, 11: 5, 12: 2, 13: 2, 14: 5, 15: 4, 16: 5,
      17: 4, 18: 2, 19: 5, 20: 2, 21: 4, 22: 2, 23: 4, 24: 2,
      25: 5, 26: 2, 27: 5, 28: 2,
    }, // Otimismo 5, Pessimismo 2
    pcq24: {
      1: 6, 2: 5, 3: 6, 4: 5, 5: 6, 6: 5, // Efficacy
      7: 5, 8: 6, 9: 5, 10: 6, 11: 5, 12: 6, // Hope
      13: 2, 14: 5, 15: 6, 16: 5, 17: 6, 18: 5, // Resilience (13 invertido: 7-2=5)
      19: 5, 20: 2, 21: 6, 22: 5, 23: 2, 24: 6, // Optimism (20,23 invertidos: 7-2=5)
    },
    asq: createSampleASQAnswers('positive'),
  };

  const report1 = calculateUnifiedCometReport(
    sample1Answers,
    {
      name: 'Dr. Carlos Eduardo Silveira',
      email: 'carlos.silveira@empresa.com.br',
      role: 'Diretor de Operações e Estratégia',
      organization: 'Grupo Nexus Inovação',
    },
    'sample_carlos_eduardo'
  );

  // Amostra 2: Mariana Ferreira - Perfil Otimista Estratégico & Vigilante
  const sample2Answers = {
    pScale: { 1: 4, 2: 4, 3: 4, 4: 3, 5: 4, 6: 4, 7: 4, 8: 4 },
    elot: {
      9: 3, 10: 4, 11: 4, 12: 3, 13: 4, 14: 4, 15: 3, 16: 4,
      17: 3, 18: 3, 19: 4, 20: 4, 21: 3, 22: 3, 23: 3, 24: 3,
      25: 4, 26: 4, 27: 4, 28: 4,
    }, // Otimismo e Pessimismo elevados (Otimismo Estratégico)
    pcq24: {
      1: 5, 2: 5, 3: 4, 4: 5, 5: 4, 6: 5,
      7: 4, 8: 5, 9: 4, 10: 5, 11: 4, 12: 5,
      13: 3, 14: 4, 15: 5, 16: 4, 17: 5, 18: 4,
      19: 4, 20: 3, 21: 5, 22: 4, 23: 3, 24: 5,
    },
    asq: createSampleASQAnswers('balanced'),
  };

  const report2 = calculateUnifiedCometReport(
    sample2Answers,
    {
      name: 'Dra. Mariana Ferreira',
      email: 'mariana.ferreira@techsol.com.br',
      role: 'Gerente Executiva de Riscos & Compliance',
      organization: 'TechSolutions Brasil',
    },
    'sample_mariana_ferreira'
  );

  return [report1, report2];
}
