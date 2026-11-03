/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ASQDimensionScore,
  ASQReport,
  ASQUserAnswer,
  PCQ24DimensionResult,
  PCQ24Report,
  PsyCapASQIntegratedReport,
} from '../types/pcq_asq.ts';
import { ParticipantData } from '../types/assessment.ts';
import { ASQ_SITUATIONS } from '../data/pcq_asq_data.ts';

/**
 * Algoritmo oficial de correção do PCQ-24 (Luthans et al., 2007)
 * Escala Likert de 6 pontos (1 a 6).
 * Itens Invertidos: 13, 20, 23 (Fórmula: 7 - X).
 */
export function calculatePCQ24(
  answers: Record<number, number>,
  participant: ParticipantData = { name: 'Participante' }
): PCQ24Report {
  for (let i = 1; i <= 24; i++) {
    if (!answers[i] || answers[i] < 1 || answers[i] > 6) {
      throw new Error(`Resposta ausente ou inválida para o item ${i} do PCQ-24.`);
    }
  }

  // 1. Autoeficácia (items 1 a 6)
  const effRaw = [1, 2, 3, 4, 5, 6].reduce((acc, id) => acc + answers[id], 0);
  const effMean = Number((effRaw / 6).toFixed(2));

  // 2. Esperança (items 7 a 12)
  const hopeRaw = [7, 8, 9, 10, 11, 12].reduce((acc, id) => acc + answers[id], 0);
  const hopeMean = Number((hopeRaw / 6).toFixed(2));

  // 3. Resiliência (items 13 a 18, item 13 invertido)
  const resRaw = [13, 14, 15, 16, 17, 18].reduce((acc, id) => {
    const val = id === 13 ? 7 - answers[id] : answers[id];
    return acc + val;
  }, 0);
  const resMean = Number((resRaw / 6).toFixed(2));

  // 4. Otimismo (items 19 a 24, items 20 e 23 invertidos)
  const optRaw = [19, 20, 21, 22, 23, 24].reduce((acc, id) => {
    const val = id === 20 || id === 23 ? 7 - answers[id] : answers[id];
    return acc + val;
  }, 0);
  const optMean = Number((optRaw / 6).toFixed(2));

  // Escore Geral do PsyCap
  const rawScoreTotal = effRaw + hopeRaw + resRaw + optRaw;
  const meanScoreTotal = Number((rawScoreTotal / 24).toFixed(2));

  // Classificações e conteúdos para Autoeficácia
  const efficacy: PCQ24DimensionResult = {
    dimensionKey: 'EFFICACY',
    dimensionTitle: 'Autoeficácia (Confidence)',
    rawScore: effRaw,
    meanScore: effMean,
    levelLabel:
      effMean >= 5.0
        ? 'Autoeficácia Elevada'
        : effMean >= 4.0
        ? 'Autoeficácia Moderada Alta'
        : effMean >= 3.0
        ? 'Autoeficácia Moderada'
        : 'Autoeficácia Baixa',
    description:
      'Avalia a convicção do indivíduo em sua própria capacidade de mobilizar motivação, recursos cognitivos e cursos de ação necessários para executar tarefas complexas.',
    strengths: [
      'Segurança em assumir responsabilidade por decisões estratégicas e liderança de projetos.',
      'Iniciativa em articular ideias e propor soluções em fóruns corporativos de alta visibilidade.',
    ],
    cautions: [
      'Cuidado para que a alta autoconfiança não gere centralização de decisões na equipe.',
      'Atenção para manter a receptividade a feedbacks de melhoria técnica fornecidos por terceiros.',
    ],
    professionalImpacts: [
      'Alta propensão a aceitar desafios arrojados e impulsionar inovações no negócio.',
    ],
    developmentRecommendations: [
      'Praticar o compartilhamento de conhecimento e o mentorar liderados em suas competências de destaque.',
    ],
  };

  // Esperança
  const hope: PCQ24DimensionResult = {
    dimensionKey: 'HOPE',
    dimensionTitle: 'Esperança (Willpower & Pathways)',
    rawScore: hopeRaw,
    meanScore: hopeMean,
    levelLabel:
      hopeMean >= 5.0
        ? 'Esperança Elevada'
        : hopeMean >= 4.0
        ? 'Esperança Moderada Alta'
        : hopeMean >= 3.0
        ? 'Esperança Moderada'
        : 'Esperança Baixa',
    description:
      'Avalia o estado motivacional positivo baseado na determinação orientada a metas (Willpower) e no planejamento de caminhos alternativos para contornar obstáculos (Pathways).',
    strengths: [
      'Alta determinação e persistência em manter o foco nos objetivos estratégicos de longo prazo.',
      'Flexibilidade cognitiva para reconfigurar rotas e encontrar saídas criativas em bloqueios.',
    ],
    cautions: [
      'Garantir que a persistência não se converta em insistência em estratégias já obsoletas.',
      'Assegurar que os caminhos alternativos sejam alinhados com a capacidade operacional do time.',
    ],
    professionalImpacts: [
      'Excelente capacidade de manter o alinhamento com a visão de futuro mesmo sob turbulência.',
    ],
    developmentRecommendations: [
      'Mapear e documentar antecipadamente planos B para projetos que possuam alto risco de interrupção.',
    ],
  };

  // Resiliência
  const resilience: PCQ24DimensionResult = {
    dimensionKey: 'RESILIENCE',
    dimensionTitle: 'Resiliência (Bouncing Back)',
    rawScore: resRaw,
    meanScore: resMean,
    levelLabel:
      resMean >= 5.0
        ? 'Resiliência Elevada'
        : resMean >= 4.0
        ? 'Resiliência Moderada Alta'
        : resMean >= 3.0
        ? 'Resiliência Moderada'
        : 'Resiliência Baixa',
    description:
      'Avalia a capacidade de suportar e recuperar-se rapidamente de adversidades, conflitos, incertezas e fracassos temporários, emergindo fortalecido das dificuldades.',
    strengths: [
      'Rápida recomposição emocional e foco imediato no aprendizado pós-crise.',
      'Tolerância ao estresse e estabilidade comportamental sob alta pressão operacional.',
    ],
    cautions: [
      'Evitar naturalizar ambientes cronicamente estressantes ou relevar problemas estruturais.',
      'Sensibilidade com membros da equipe que necessitam de mais tempo para processar frustrações.',
    ],
    professionalImpacts: [
      'Insubstituível para conduzir reestruturações corporativas e ambientes de alta volatilidade.',
    ],
    developmentRecommendations: [
      'Desenvolver rituais formais de "Post-Mortem" após crises para extrair aprendizado organizacional.',
    ],
  };

  // Otimismo
  const optimism: PCQ24DimensionResult = {
    dimensionKey: 'OPTIMISM',
    dimensionTitle: 'Otimismo (Positive Expectancies)',
    rawScore: optRaw,
    meanScore: optMean,
    levelLabel:
      optMean >= 5.0
        ? 'Otimismo Elevado'
        : optMean >= 4.0
        ? 'Otimismo Moderado Alto'
        : optMean >= 3.0
        ? 'Otimismo Moderado'
        : 'Otimismo Baixo',
    description:
      'Avalia a tendência de construir atribuições positivas sobre o sucesso presente e futuro, combinando entusiasmo com um realismo flexível e adaptativo.',
    strengths: [
      'Foco espontâneo nas oportunidades e no lado construtivo de transições organizacionais.',
      'Capacidade de contagiar positivamente o clima de trabalho e estimular a inovação.',
    ],
    cautions: [
      'Proteger-se contra o viés de confirmação e a subestimação de riscos técnicos ou prazos.',
      'Validar hipóteses com dados empíricos antes de assumir compromissos orçamentários rígidos.',
    ],
    professionalImpacts: [
      'Atua como motor de engajamento em momentos de expansão e transformação cultural.',
    ],
    developmentRecommendations: [
      'Aliar o otimismo a simulações de cenários pessimistas para garantir a solidez das entregas.',
    ],
  };

  const overallLevelLabel =
    meanScoreTotal >= 5.0
      ? 'Capital Psicológico Elevado (PsyCap Pleno)'
      : meanScoreTotal >= 4.0
      ? 'Capital Psicológico Consolidado'
      : meanScoreTotal >= 3.0
      ? 'Capital Psicológico Moderado'
      : 'Capital Psicológico a Desenvolver';

  const overallDescription =
    'O Capital Psicológico (PsyCap) representa um recurso psicológico de ordem superior composto por Autoeficácia, Esperança, Resiliência e Otimismo. Seus componentes funcionam de forma sinérgica para impulsionar a performance, a satisfação profissional e a adaptabilidade do indivíduo no ambiente organizacional.';

  return {
    id: `pcq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    participant,
    calculatedAt: new Date().toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    rawScoreTotal,
    meanScoreTotal,
    overallLevelLabel,
    overallDescription,
    efficacy,
    hope,
    resilience,
    optimism,
  };
}

/**
 * Algoritmo oficial de correção do ASQ (Peterson et al., 1982)
 * 12 Situações hipotéticas (6 Positivas + 6 Negativas).
 * Cada situação é avaliada em 3 dimensões de 1 a 7 (Internalidade, Estabilidade, Globalidade).
 */
export function calculateASQ(
  answers: Record<number, ASQUserAnswer>,
  participant: ParticipantData = { name: 'Participante' }
): ASQReport {
  // Validar se todas as 12 situações possuem respostas preenchidas
  for (let i = 1; i <= 12; i++) {
    const ans = answers[i];
    if (
      !ans ||
      !ans.causeText?.trim() ||
      !ans.internality ||
      !ans.stability ||
      !ans.globality ||
      ans.internality < 1 || ans.internality > 7 ||
      ans.stability < 1 || ans.stability > 7 ||
      ans.globality < 1 || ans.globality > 7
    ) {
      throw new Error(`Resposta ausente ou incompleta para a situação ${i} do ASQ.`);
    }
  }

  // Separar itens positivos (1 a 6) e negativos (7 a 12)
  const posIds = [1, 2, 3, 4, 5, 6];
  const negIds = [7, 8, 9, 10, 11, 12];

  // Acontecimentos Positivos
  const intPos = Number((posIds.reduce((a, id) => a + answers[id].internality, 0) / 6).toFixed(2));
  const staPos = Number((posIds.reduce((a, id) => a + answers[id].stability, 0) / 6).toFixed(2));
  const gloPos = Number((posIds.reduce((a, id) => a + answers[id].globality, 0) / 6).toFixed(2));
  const coPos = Number(((intPos + staPos + gloPos) / 3).toFixed(2));

  // Acontecimentos Negativos
  const intNeg = Number((negIds.reduce((a, id) => a + answers[id].internality, 0) / 6).toFixed(2));
  const staNeg = Number((negIds.reduce((a, id) => a + answers[id].stability, 0) / 6).toFixed(2));
  const gloNeg = Number((negIds.reduce((a, id) => a + answers[id].globality, 0) / 6).toFixed(2));
  const coNeg = Number(((intNeg + staNeg + gloNeg) / 3).toFixed(2));

  // Índices Compostos
  const compositeTotal = Number((coPos - coNeg).toFixed(2));
  const hopelessnessIndex = Number((staNeg + gloNeg).toFixed(2));

  const scores: ASQDimensionScore = {
    internalityPos: intPos,
    stabilityPos: staPos,
    globalityPos: gloPos,
    compositePos: coPos,
    internalityNeg: intNeg,
    stabilityNeg: staNeg,
    globalityNeg: gloNeg,
    compositeNeg: coNeg,
    compositeTotal,
    hopelessnessIndex,
  };

  // Perfil Positivo
  let posTitle = 'Atribuição Construtiva de Sucesso';
  let posLevel = 'Elevado';
  let posDesc =
    'Você tende a atribuir seus sucessos a fatores internos (suas habilidades e empenho), estáveis (características duradouras) e globais (que geram impactos em várias áreas da vida). Isso fortalece a autoestima e a autoconfiança executiva.';

  if (coPos < 4.2) {
    posTitle = 'Atribuição Cautelosa de Sucesso';
    posLevel = 'Moderado/Baixo';
    posDesc =
      'Você tende a atribuir acontecimentos positivos a causas circunstanciais, temporárias ou fatores externos (sorte, ajuda de terceiros), podendo subestimar o papel direto de sua competência na conquista.';
  }

  // Perfil Negativo
  let negTitle = 'Atribuição Protetora e Ponderada de Fracassos';
  let negLevel = 'Otimista / Protetor';
  let negDesc =
    'Diante de dificuldades, você enxerga as causas como específicas e temporárias, evitando culpar-se excessivamente de forma global. Essa postura protege contra o desânimo e facilita a recuperação.';

  if (coNeg >= 4.5) {
    negTitle = 'Atribuição Vulnerável ao Desânimo (Estilo Pessimista)';
    negLevel = 'Pessimista / Vulnerável';
    negDesc =
      'Quando surgem problemas, há uma tendência de percebê-los como pessoais (internos), permanentes (estáveis) e abrangentes (globais). Essa combinação pode gerar sobrecarga emocional e sensação de desamparo.';
  }

  const strengths = [
    coPos >= 4.5
      ? 'Apropriação saudável de suas vitórias profissionais, reconhecendo seu próprio mérito e esforço.'
      : 'Humildade e abertura para reconhecer a contribuição da equipe nos resultados alcançados.',
    coNeg < 4.2
      ? 'Resiliência cognitiva ao interpretar falhas como eventos pontuais, contornáveis e restritos no tempo.'
      : 'Elevado senso de responsabilidade pessoal diante de problemas e empenho em corrigir rumos.',
  ];

  const cautions = [
    coNeg >= 4.5
      ? 'Atenção para não generalizar um erro pontual como se afetasse toda a sua capacidade ou carreira.'
      : 'Cuidado para não desconsiderar a necessidade de autoanálise crítica quando um problema exigir mudança de atitude.',
    coPos < 4.2
      ? 'Aprender a celebrar e internalizar suas conquistas sem atribuí-las exclusivamente ao acaso.'
      : 'Manter a consciência de que o ambiente externo e os parceiros também influenciam o sucesso sustentável.',
  ];

  const professionalImpacts = [
    'O estilo explicativo molda a velocidade de recuperação diante de perdas e a disposição para aceitar novas metas.',
    'A forma como você justifica sucessos e erros impacta diretamente a maturidade emocional no clima da equipe.',
  ];

  const developmentRecommendations = [
    'Praticar o reenquadramento cognitivo (Reframing): diante de um fracasso, listar causas específicas e mutáveis em vez de frases generalistas.',
    'Registrar sistematicamente suas conquistas diárias e os comportamentos específicos que as tornaram possíveis.',
  ];

  return {
    id: `asq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    participant,
    calculatedAt: new Date().toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    answers,
    scores,
    positiveProfile: {
      title: posTitle,
      description: posDesc,
      level: posLevel,
    },
    negativeProfile: {
      title: negTitle,
      description: negDesc,
      level: negLevel,
    },
    strengths,
    cautions,
    professionalImpacts,
    developmentRecommendations,
  };
}

/**
 * Análise Integrada Metodologia COMET (PCQ-24 + ASQ)
 * Cruzamentos entre Recursos Psicológicos (PsyCap) e Estilo de Atribuição (ASQ).
 * SEM somar os resultados ou criar índices irreais.
 */
export function calculatePsyCapASQIntegration(
  arg1: any,
  arg2: any,
  arg3?: any,
  arg4?: any
): PsyCapASQIntegratedReport {
  let pcq: PCQ24Report;
  let asq: ASQReport;
  let customId: string | undefined;

  if (arg3 && arg4) {
    customId = arg1;
    pcq = arg3;
    asq = arg4;
  } else {
    pcq = arg1;
    asq = arg2;
  }
  // 1. Autoeficácia x Internalidade
  const effVal = pcq.efficacy.meanScore;
  const intPosVal = asq.scores.internalityPos;
  const intNegVal = asq.scores.internalityNeg;

  let efficacyXInternality =
    `Você apresenta Autoeficácia ${pcq.efficacy.levelLabel} (Média ${effVal}) combinada com Internalidade Positiva de ${intPosVal}/7. `;
  if (effVal >= 4.5 && intPosVal >= 4.5) {
    efficacyXInternality +=
      'Sinergia altamente positiva: você possui forte convicção em suas capacidades e assume com clareza o protagonismo de suas vitórias.';
  } else if (effVal >= 4.5 && intPosVal < 4.0) {
    efficacyXInternality +=
      'Configuração interessante: você se sente seguro para realizar tarefas, porém tende a atribuir o crédito final a variáveis de contexto ou do time.';
  } else {
    efficacyXInternality +=
      'O fortalecimento da autoeficácia será acelerado à medida que você internalizar os fatores específicos que geram seus bons resultados.';
  }

  // 2. Esperança x Estabilidade
  const hopeVal = pcq.hope.meanScore;
  const staPosVal = asq.scores.stabilityPos;
  const staNegVal = asq.scores.stabilityNeg;

  let hopeXStability =
    `Sua Esperança no PCQ-24 é ${pcq.hope.levelLabel} (Média ${hopeVal}), enquanto a Estabilidade em Eventos Negativos no ASQ é ${staNegVal}/7. `;
  if (hopeVal >= 4.5 && staNegVal <= 4.0) {
    hopeXStability +=
      'Combinação de alta fluidez: você vislumbra múltiplos caminhos para os objetivos e enxerga os percalços como passageiros e contornáveis.';
  } else if (hopeVal >= 4.5 && staNegVal > 4.5) {
    hopeXStability +=
      'Tensão produtiva: você possui grande força de vontade e gera alternativas para metas, mas precisa de esforço extra para não perceber os obstáculos como permanentes.';
  } else {
    hopeXStability +=
      'Trabalhar a estabilidade temporária das dificuldades apoiará a construção contínua de rotas para alcance de objetivos.';
  }

  // 3. Resiliência x Atribuições Negativas
  const resVal = pcq.resilience.meanScore;
  const coNegVal = asq.scores.compositeNeg;

  let resilienceXNegativeAttributions =
    `Resiliência ${pcq.resilience.levelLabel} (Média ${resVal}) frente a um Composto de Atribuição Negativa de ${coNegVal}/7 no ASQ. `;
  if (resVal >= 4.5 && coNegVal < 4.2) {
    resilienceXNegativeAttributions +=
      'Excelente blindagem cognitiva: você se recupera velozmente das adversidades porque interpreta falhas como eventos específicos e transitórios.';
  } else if (resVal >= 4.5 && coNegVal >= 4.5) {
    resilienceXNegativeAttributions +=
      'Sua alta resiliência atua como um escudo vital: mesmo quando você tende a personalizar um erro, sua força interna o impulsiona a superar a dor e seguir em frente.';
  } else {
    resilienceXNegativeAttributions +=
      'Sua capacidade de recuperação será potencializada dividindo problemas complexos em causas específicas e gerenciáveis.';
  }

  // 4. Otimismo x Atribuições Positivas
  const optVal = pcq.optimism.meanScore;
  const coPosVal = asq.scores.compositePos;

  let optimismXPositiveAttributions =
    `Otimismo no PCQ-24 de ${optVal}/6 associado a um Composto de Atribuição Positiva de ${coPosVal}/7 no ASQ. `;
  if (optVal >= 4.5 && coPosVal >= 4.5) {
    optimismXPositiveAttributions +=
      'Coerência plena de futuro e passado: a confiança em conquistas anteriores nutre uma visão vibrante e promissora sobre o porvir.';
  } else {
    optimismXPositiveAttributions +=
      'Equilíbrio entre a expectativa de boas ocorrências futuras e a avaliação criteriosa das realizações passadas.';
  }

  // 5. Capital Psicológico Geral x Estilo Explicativo
  const totalPsyCap = pcq.meanScoreTotal;
  const compTotal = asq.scores.compositeTotal;

  let overallPsyCapXExplanatoryStyle =
    `Capital Psicológico Geral de ${totalPsyCap}/6 (${pcq.overallLevelLabel}) e Saldo de Atribuição de ${compTotal} no ASQ. `;
  if (totalPsyCap >= 4.5 && compTotal > 0) {
    overallPsyCapXExplanatoryStyle +=
      'Perfil de alto dinamismo executivo e maturidade anímica: recursos psicológicos abundantes aliados a um estilo explicativo saudável e protetor.';
  } else {
    overallPsyCapXExplanatoryStyle +=
      'Maturidade em consolidação: bom reservatório de recursos emocionais com oportunidade de otimizar a leitura cognitiva das experiências.';
  }

  const convergences = [
    `Consistência entre a prontidão para ação (PsyCap ${pcq.meanScoreTotal}/6) e o padrão de interpretação causal.`,
    `Capacidade de manter o foco no desenvolvimento profissional sustentável e de longo prazo.`,
    `Alinhamento entre o reservatório de resiliência e a interpretação de contingências de mercado.`,
  ];

  const divergences = [
    asq.scores.compositeNeg > 4.5 && pcq.resilience.meanScore >= 4.5
      ? 'Contraste entre a tendência de personalizar erros e a alta capacidade prática de dar a volta por cima.'
      : 'Interpretação causal bem ajustada ao nível de recursos psicológicos declarados.',
  ];

  const tensions = [
    pcq.efficacy.meanScore >= 5.0 && asq.scores.internalityPos < 4.0
      ? 'Autoeficácia alta em tarefas, mas relutância em reivindicar o crédito pessoal pelos sucessos obtidos.'
      : 'Harmonia entre a percepção de competência e a atribuição de causalidade.',
  ];

  const businessImpacts = {
    leadership:
      pcq.meanScoreTotal >= 4.5
        ? 'Liderança mobilizadora e inspiradora, capaz de guiar equipes em momentos de volatilidade com firmeza e empatia.'
        : 'Liderança sóbria e pautada no exemplo prático e no cumprimento rigoroso de etapas.',
    peopleManagement:
      'Capacidade de acolher falhas operacionais do time como oportunidades de aprendizado sem gerar clima de caça às bruxas.',
    decisionMaking:
      'Decisões fundamentadas em planejamento estratégico (Hope Pathways) com rápida absorção de correções de rota.',
    execution:
      'Elevada disciplina na entrega e perseverança até a conclusão de projetos complexos.',
    persistence:
      'Resistência acima da média diante de negociações arrastadas ou recusas de clientes e parceiros.',
    adversityHandling:
      'Superação madura de crises mantendo a estabilidade do clima e a coesão das equipes.',
    learningFromErrors:
      'Habilidade em desconstruir problemas em causas específicas sem paralisia por culpa ou busca de chivos expiatórios.',
    changeAdaptation:
      'Abertura flexível a transformações tecnológicas, de processos ou reestruturações societárias.',
    autonomy:
      'Genuína independência operacional para propor inovações e gerenciar o próprio tempo com responsabilidade.',
  };

  const developmentPlan = {
    strengthsToFortify:
      'Aproveitar seu elevado reservatório de Capital Psicológico para atuar como patrocinador(a) de projetos de inovação e mentor(a) de novos talentos.',
    attentionPoints:
      'Monitorar a tendência de sobrecarregar-se quando erros ocorrerem, praticando a atribuição causal objetiva e fundamentada em dados.',
    competenciesToDevelop:
      'Desenvolver a habilidade de Reframing Cognitivo e a construção sistemática de planos B (Hope Pathways) para cenários de incerteza.',
    practicalRecommendations:
      'Realizar mensalmente uma sessão de revisão de conquistas e aprendizados com a equipe, catalogando o que deu certo e quais causas específicas foram determinantes.',
    individualExercises:
      'Exercício do Diário de Conquistas: ao final da semana, listar 3 realizações marcantes e descrever explicitamente o seu papel direto em cada uma delas.',
    workplaceActions:
      'Implementar a prática de Análise Causal Objetiva em reuniões de pós-projeto, focando em processos e melhorias estruturais.',
    behavioralIndicators:
      'Redução do tempo de recomposição do time após falhas em projetos e aumento no índice de alcance das metas trimestrais.',
    followUpSuggestions:
      'Reaplicação deste módulo em 6 meses para avaliar a evolução do Capital Psicológico e a consolidação do Estilo Explicativo Otimista.',
  };

  return {
    id: customId || `integrated_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    participant: pcq.participant,
    calculatedAt: new Date().toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    pcqReport: pcq,
    asqReport: asq,
    crossAnalyses: {
      efficacyXInternality,
      hopeXStability,
      resilienceXNegativeAttributions,
      optimismXPositiveAttributions,
      overallPsyCapXExplanatoryStyle,
    },
    convergences,
    divergences,
    tensions,
    businessImpacts,
    developmentPlan,
  };
}
