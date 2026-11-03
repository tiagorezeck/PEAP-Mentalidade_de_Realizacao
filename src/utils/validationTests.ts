/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  calculateCometCrossAnalysis,
  calculateOptimism,
  calculatePessimism,
  calculatePositivity,
} from './scoring.ts';

export interface TestResult {
  id: string;
  name: string;
  description: string;
  passed: boolean;
  expected: string;
  actual: string;
  details?: string;
}

export function runAutomatedValidationTests(): { results: TestResult[]; allPassed: boolean } {
  const results: TestResult[] = [];

  // TEST 1: Pontuação Mínima da P-Scale (todas as respostas = 1)
  // Itens 1, 2, 3, 5, 6, 7, 8 = 1 cada -> soma 7
  // Item 4 = 1 -> invertido = 6 - 1 = 5
  // Soma total esperada = 7 + 5 = 12. Média = 12 / 8 = 1.50
  try {
    const minAnswers: Record<number, number> = {
      1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1,
    };
    const res = calculatePositivity(minAnswers);
    const passed = res.rawScore === 12 && res.meanScore === 1.5 && res.level === 'BAIXO';
    results.push({
      id: 'P_SCALE_MIN',
      name: 'P-Scale: Pontuação Mínima (Todas as respostas = 1)',
      description: 'Valida se com respostas mínimas (1), o Item 4 inverte para 5 e a soma totaliza 12 (média 1.50).',
      passed,
      expected: 'Escore Bruto = 12, Média = 1.50, Nível = BAIXO',
      actual: `Escore Bruto = ${res.rawScore}, Média = ${res.meanScore.toFixed(2)}, Nível = ${res.level}`,
    });
  } catch (err) {
    results.push({
      id: 'P_SCALE_MIN',
      name: 'P-Scale: Pontuação Mínima',
      description: 'Erro durante execução do teste de mínimo',
      passed: false,
      expected: 'Cálculo bem-sucedido',
      actual: String(err),
    });
  }

  // TEST 2: Pontuação Máxima da P-Scale (todas as respostas = 5)
  // Itens 1, 2, 3, 5, 6, 7, 8 = 5 cada -> soma 35
  // Item 4 = 5 -> invertido = 6 - 5 = 1
  // Soma total esperada = 35 + 1 = 36. Média = 36 / 8 = 4.50
  try {
    const maxAnswers: Record<number, number> = {
      1: 5, 2: 5, 3: 5, 4: 5, 5: 5, 6: 5, 7: 5, 8: 5,
    };
    const res = calculatePositivity(maxAnswers);
    const passed = res.rawScore === 36 && res.meanScore === 4.5 && res.level === 'ALTO';
    results.push({
      id: 'P_SCALE_MAX',
      name: 'P-Scale: Pontuação Máxima (Todas as respostas = 5)',
      description: 'Valida se com respostas máximas (5), o Item 4 inverte para 1 e a soma totaliza 36 (média 4.50).',
      passed,
      expected: 'Escore Bruto = 36, Média = 4.50, Nível = ALTO',
      actual: `Escore Bruto = ${res.rawScore}, Média = ${res.meanScore.toFixed(2)}, Nível = ${res.level}`,
    });
  } catch (err) {
    results.push({
      id: 'P_SCALE_MAX',
      name: 'P-Scale: Pontuação Máxima',
      description: 'Erro durante execução',
      passed: false,
      expected: 'Cálculo bem-sucedido',
      actual: String(err),
    });
  }

  // TEST 3: Inversão Estrita do Item 4 (P-Scale) para todos os valores 1 a 5
  try {
    let inversionPassed = true;
    const testCases = [
      { raw: 1, expectedInverted: 5 },
      { raw: 2, expectedInverted: 4 },
      { raw: 3, expectedInverted: 3 },
      { raw: 4, expectedInverted: 2 },
      { raw: 5, expectedInverted: 1 },
    ];
    for (const tc of testCases) {
      const baseAnswers: Record<number, number> = {
        1: 3, 2: 3, 3: 3, 4: tc.raw, 5: 3, 6: 3, 7: 3, 8: 3,
      };
      const res = calculatePositivity(baseAnswers);
      // Soma dos 7 itens fixos em 3 = 21. Total esperado = 21 + tc.expectedInverted
      const expectedTotal = 21 + tc.expectedInverted;
      if (res.rawScore !== expectedTotal) {
        inversionPassed = false;
        break;
      }
    }
    results.push({
      id: 'P_SCALE_INVERSION_TABLE',
      name: 'P-Scale: Tabela Completa de Inversão do Item 4 (6 - X)',
      description: 'Testa rigorosamente a fórmula (6 - X) para os 5 valores da escala: 1->5, 2->4, 3->3, 4->2, 5->1.',
      passed: inversionPassed,
      expected: 'Inversão exata para todos os 5 valores Likert',
      actual: inversionPassed ? 'Todos os 5 casos testados e confirmados com sucesso' : 'Falha na inversão',
    });
  } catch (err) {
    results.push({
      id: 'P_SCALE_INVERSION_TABLE',
      name: 'P-Scale: Inversão Item 4',
      description: 'Erro durante execução',
      passed: false,
      expected: 'Sucesso',
      actual: String(err),
    });
  }

  // TEST 4: Otimismo ELOT — Pontuação Mínima e Máxima
  // 6 itens de otimismo (11, 14, 16, 19, 25, 27). Mínimo = 6 * 1 = 6. Máximo = 6 * 5 = 30.
  try {
    const minAnswers: Record<number, number> = {};
    const maxAnswers: Record<number, number> = {};
    for (let i = 9; i <= 28; i++) {
      minAnswers[i] = 1;
      maxAnswers[i] = 5;
    }
    const minRes = calculateOptimism(minAnswers);
    const maxRes = calculateOptimism(maxAnswers);
    const passed = minRes.rawScore === 6 && minRes.meanScore === 1.0 && maxRes.rawScore === 30 && maxRes.meanScore === 5.0;
    results.push({
      id: 'ELOT_OPTIMISM_BOUNDS',
      name: 'ELOT: Limites da Subescala de Otimismo (Mínimo 6 e Máximo 30)',
      description: 'Valida se os 6 itens de otimismo resultam rigorosamente em 6 (média 1.0) no mínimo e 30 (média 5.0) no máximo.',
      passed,
      expected: 'Min: Escore=6, Média=1.00 | Max: Escore=30, Média=5.00',
      actual: `Min: Escore=${minRes.rawScore}, Média=${minRes.meanScore.toFixed(2)} | Max: Escore=${maxRes.rawScore}, Média=${maxRes.meanScore.toFixed(2)}`,
    });
  } catch (err) {
    results.push({
      id: 'ELOT_OPTIMISM_BOUNDS',
      name: 'ELOT: Limites de Otimismo',
      description: 'Erro',
      passed: false,
      expected: 'Sucesso',
      actual: String(err),
    });
  }

  // TEST 5: Pessimismo ELOT — Pontuação Mínima e Máxima
  // 9 itens de pessimismo (10, 12, 13, 18, 20, 22, 24, 26, 28). Mínimo = 9 * 1 = 9. Máximo = 9 * 5 = 45.
  try {
    const minAnswers: Record<number, number> = {};
    const maxAnswers: Record<number, number> = {};
    for (let i = 9; i <= 28; i++) {
      minAnswers[i] = 1;
      maxAnswers[i] = 5;
    }
    const minRes = calculatePessimism(minAnswers);
    const maxRes = calculatePessimism(maxAnswers);
    const passed = minRes.rawScore === 9 && minRes.meanScore === 1.0 && maxRes.rawScore === 45 && maxRes.meanScore === 5.0;
    results.push({
      id: 'ELOT_PESSIMISM_BOUNDS',
      name: 'ELOT: Limites da Subescala de Pessimismo (Mínimo 9 e Máximo 45)',
      description: 'Valida se os 9 itens de pessimismo resultam rigorosamente em 9 (média 1.0) no mínimo e 45 (média 5.0) no máximo.',
      passed,
      expected: 'Min: Escore=9, Média=1.00 | Max: Escore=45, Média=5.00',
      actual: `Min: Escore=${minRes.rawScore}, Média=${minRes.meanScore.toFixed(2)} | Max: Escore=${maxRes.rawScore}, Média=${maxRes.meanScore.toFixed(2)}`,
    });
  } catch (err) {
    results.push({
      id: 'ELOT_PESSIMISM_BOUNDS',
      name: 'ELOT: Limites de Pessimismo',
      description: 'Erro',
      passed: false,
      expected: 'Sucesso',
      actual: String(err),
    });
  }

  // TEST 6: Isolamento Estrito dos 5 Distratores do ELOT
  // Os itens 9, 15, 17, 21, 23 (ELOT 1, 7, 9, 13, 15) não podem influenciar os escores de otimismo ou pessimismo.
  try {
    const baseAnswers: Record<number, number> = {};
    for (let i = 9; i <= 28; i++) baseAnswers[i] = 3;

    const optBefore = calculateOptimism(baseAnswers).rawScore;
    const pessBefore = calculatePessimism(baseAnswers).rawScore;

    // Alterar os 5 distratores de 3 para 5
    const alteredAnswers = { ...baseAnswers };
    alteredAnswers[9] = 5; // Filler 1
    alteredAnswers[15] = 5; // Filler 2
    alteredAnswers[17] = 5; // Filler 3
    alteredAnswers[21] = 5; // Filler 4
    alteredAnswers[23] = 5; // Filler 5

    const optAfter = calculateOptimism(alteredAnswers).rawScore;
    const pessAfter = calculatePessimism(alteredAnswers).rawScore;

    const passed = optBefore === optAfter && pessBefore === pessAfter;
    results.push({
      id: 'ELOT_DISTRACTORS_ISOLATION',
      name: 'ELOT: Neutralidade Absoluta dos 5 Itens Distratores',
      description: 'Garante que os 5 distratores (itens 9, 15, 17, 21 e 23) são descartados da pontuação e têm impacto zero nos índices.',
      passed,
      expected: 'Variação nos 5 distratores não afeta pontuação de Otimismo nem Pessimismo',
      actual: passed
        ? `Otimismo permaneceu ${optAfter} e Pessimismo permaneceu ${pessAfter} (variação 0.00)`
        : 'Falha: distratores contaminaram a pontuação',
    });
  } catch (err) {
    results.push({
      id: 'ELOT_DISTRACTORS_ISOLATION',
      name: 'ELOT: Isolamento de Distratores',
      description: 'Erro',
      passed: false,
      expected: 'Sucesso',
      actual: String(err),
    });
  }

  // TEST 7: Independência dos Construtos na Análise Integrada COMET
  // Comprova que não há subtração ou unificação das pontuações originais.
  try {
    const pAnswers: Record<number, number> = { 1: 4, 2: 4, 3: 4, 4: 2, 5: 4, 6: 4, 7: 4, 8: 4 };
    const eAnswers: Record<number, number> = {};
    for (let i = 9; i <= 28; i++) eAnswers[i] = 4;

    const pos = calculatePositivity(pAnswers);
    const opt = calculateOptimism(eAnswers);
    const pess = calculatePessimism(eAnswers);

    const cross = calculateCometCrossAnalysis(pos, opt, pess);
    // Verificar se as pontuações originais foram preservadas intactas
    const passed =
      pos.rawScore === 32 && // (4*7 + (6-2)=4 = 32)
      opt.rawScore === 24 && // (6 * 4)
      pess.rawScore === 36 && // (9 * 4)
      Boolean(cross.quadrantKey);

    results.push({
      id: 'COMET_ALGORITHM_INDEPENDENCE',
      name: 'COMET: Preservação da Independência das 3 Pontuações Originais',
      description: 'Verifica se a análise integrada preserva as 3 pontuações matemáticas autônomas sem qualquer fusão artificial.',
      passed,
      expected: 'Três escores preservados intactos: Positividade (32), Otimismo (24), Pessimismo (36)',
      actual: `Positividade = ${pos.rawScore}, Otimismo = ${opt.rawScore}, Pessimismo = ${pess.rawScore}. Quadrante = ${cross.quadrantKey}`,
    });
  } catch (err) {
    results.push({
      id: 'COMET_ALGORITHM_INDEPENDENCE',
      name: 'COMET: Independência de Construtos',
      description: 'Erro',
      passed: false,
      expected: 'Sucesso',
      actual: String(err),
    });
  }

  const allPassed = results.every((r) => r.passed);
  return { results, allPassed };
}
