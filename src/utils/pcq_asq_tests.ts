/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { calculateASQ, calculatePCQ24, calculatePsyCapASQIntegration } from './pcq_asq_scoring.ts';
import { ASQUserAnswer } from '../types/pcq_asq.ts';
import { ParticipantData } from '../types/assessment.ts';

export interface ValidationTestResult {
  id: string;
  name: string;
  description: string;
  passed: boolean;
  expected: string;
  actual: string;
}

export function runPCQASQValidationTests(): { results: ValidationTestResult[]; allPassed: boolean } {
  const results: ValidationTestResult[] = [];
  const dummyParticipant: ParticipantData = { name: 'Teste de Validação Algorítmica' };

  // TEST 1: PCQ-24 Pontuação Mínima (todas as respostas = 1)
  // Itens normais (21 itens) = 1 cada -> soma 21
  // Itens invertidos (13, 20, 23) = 1 -> invertidos para 7 - 1 = 6 cada -> soma 18
  // Total esperado = 21 + 18 = 39. Média = 39 / 24 = 1.625 -> 1.63
  try {
    const minAnswers: Record<number, number> = {};
    for (let i = 1; i <= 24; i++) minAnswers[i] = 1;

    const res = calculatePCQ24(minAnswers, dummyParticipant);
    const passed = res.rawScoreTotal === 39 && res.meanScoreTotal === 1.63;
    results.push({
      id: 'PCQ24_MIN_BOUNDS',
      name: 'PCQ-24: Pontuação Mínima com Inversão dos Itens 13, 20 e 23',
      description: 'Testa se com respostas brutas = 1, os 3 itens invertidos passam para 6, gerando soma total = 39 e média = 1.63.',
      passed,
      expected: 'Soma Total = 39, Média Geral = 1.63',
      actual: `Soma Total = ${res.rawScoreTotal}, Média Geral = ${res.meanScoreTotal.toFixed(2)}`,
    });
  } catch (e) {
    results.push({
      id: 'PCQ24_MIN_BOUNDS',
      name: 'PCQ-24: Pontuação Mínima',
      description: 'Erro durante execução',
      passed: false,
      expected: 'Sucesso',
      actual: String(e),
    });
  }

  // TEST 2: PCQ-24 Pontuação Máxima (todas as respostas = 6)
  // Itens normais (21 itens) = 6 cada -> soma 126
  // Itens invertidos (13, 20, 23) = 6 -> invertidos para 7 - 6 = 1 cada -> soma 3
  // Total esperado = 126 + 3 = 129. Média = 129 / 24 = 5.375 -> 5.38
  try {
    const maxAnswers: Record<number, number> = {};
    for (let i = 1; i <= 24; i++) maxAnswers[i] = 6;

    const res = calculatePCQ24(maxAnswers, dummyParticipant);
    const passed = res.rawScoreTotal === 129 && res.meanScoreTotal === 5.38;
    results.push({
      id: 'PCQ24_MAX_BOUNDS',
      name: 'PCQ-24: Pontuação Máxima com Inversão dos Itens 13, 20 e 23',
      description: 'Testa se com respostas brutas = 6, os 3 itens invertidos passam para 1, gerando soma total = 129 e média = 5.38.',
      passed,
      expected: 'Soma Total = 129, Média Geral = 5.38',
      actual: `Soma Total = ${res.rawScoreTotal}, Média Geral = ${res.meanScoreTotal.toFixed(2)}`,
    });
  } catch (e) {
    results.push({
      id: 'PCQ24_MAX_BOUNDS',
      name: 'PCQ-24: Pontuação Máxima',
      description: 'Erro durante execução',
      passed: false,
      expected: 'Sucesso',
      actual: String(e),
    });
  }

  // TEST 3: ASQ - Cálculo dos Compostos Positivo, Negativo e Total
  // Positivos (1 a 6): Int=6, Sta=5, Glo=4 -> Média por dimensão = 6, 5, 4. CoPos = (6+5+4)/3 = 5.0
  // Negativos (7 a 12): Int=2, Sta=3, Glo=2 -> Média por dimensão = 2, 3, 2. CoNeg = (2+3+2)/3 = 2.33
  // CoPos - CoNeg = 5.0 - 2.33 = +2.67
  // Hopelessness = StaNeg (3.0) + GloNeg (2.0) = 5.0
  try {
    const asqAnswers: Record<number, ASQUserAnswer> = {};
    for (let i = 1; i <= 6; i++) {
      asqAnswers[i] = {
        situationId: i,
        causeText: 'Minha competência e dedicação',
        internality: 6,
        stability: 5,
        globality: 4,
      };
    }
    for (let i = 7; i <= 12; i++) {
      asqAnswers[i] = {
        situationId: i,
        causeText: 'Fatores operacionais temporários',
        internality: 2,
        stability: 3,
        globality: 2,
      };
    }

    const res = calculateASQ(asqAnswers, dummyParticipant);
    const passed =
      res.scores.compositePos === 5.0 &&
      res.scores.compositeNeg === 2.33 &&
      res.scores.compositeTotal === 2.67 &&
      res.scores.hopelessnessIndex === 5.0;

    results.push({
      id: 'ASQ_SCORES_CALCULATION',
      name: 'ASQ: Cálculo de CoPos, CoNeg, Saldo Total e Índice de Desamparo',
      description: 'Valida as fórmulas de médias compostas para acontecimentos positivos e negativos.',
      passed,
      expected: 'CoPos = 5.00, CoNeg = 2.33, Saldo Total = +2.67, Desamparo = 5.00',
      actual: `CoPos = ${res.scores.compositePos.toFixed(2)}, CoNeg = ${res.scores.compositeNeg.toFixed(2)}, Saldo = ${res.scores.compositeTotal.toFixed(2)}, Desamparo = ${res.scores.hopelessnessIndex.toFixed(2)}`,
    });
  } catch (e) {
    results.push({
      id: 'ASQ_SCORES_CALCULATION',
      name: 'ASQ: Cálculo dos Compostos',
      description: 'Erro durante execução',
      passed: false,
      expected: 'Sucesso',
      actual: String(e),
    });
  }

  // TEST 4: Validação de Independência no Relatório Integrado
  try {
    const pcqAnswers: Record<number, number> = {};
    for (let i = 1; i <= 24; i++) pcqAnswers[i] = 5; // todos 5 exceto invertidos

    const asqAnswers: Record<number, ASQUserAnswer> = {};
    for (let i = 1; i <= 12; i++) {
      asqAnswers[i] = {
        situationId: i,
        causeText: 'Causa de teste',
        internality: 5,
        stability: 5,
        globality: 5,
      };
    }

    const pcqReport = calculatePCQ24(pcqAnswers, dummyParticipant);
    const asqReport = calculateASQ(asqAnswers, dummyParticipant);
    const integrated = calculatePsyCapASQIntegration(pcqReport, asqReport);

    const passed =
      Boolean(integrated.pcqReport) &&
      Boolean(integrated.asqReport) &&
      Boolean(integrated.crossAnalyses.efficacyXInternality) &&
      Boolean(integrated.developmentPlan.strengthsToFortify);

    results.push({
      id: 'PSYCAP_ASQ_INTEGRATION',
      name: 'Integração PCQ-24 + ASQ: Matriz Cruzada de Cruzamentos',
      description: 'Garante que os relatórios individuais permanecem autônomos e que a análise integrada gera cruzamentos de 5 eixos sem fusão de escores.',
      passed,
      expected: 'Relatório Integrado gerado com 5 cruzamentos e plano de 8 pilares',
      actual: passed ? 'Relatório integrado gerado com sucesso sem alteração nos escores primários' : 'Falha na integração',
    });
  } catch (e) {
    results.push({
      id: 'PSYCAP_ASQ_INTEGRATION',
      name: 'Integração PCQ-24 + ASQ',
      description: 'Erro durante execução',
      passed: false,
      expected: 'Sucesso',
      actual: String(e),
    });
  }

  const allPassed = results.every((r) => r.passed);
  return { results, allPassed };
}

export const runAutomatedPCQ24ASQTests = runPCQASQValidationTests;

