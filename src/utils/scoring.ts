/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CometCrossAnalysis,
  DevelopmentPlan,
  OptimismResult,
  PessimismResult,
  PositivityResult,
} from '../types/assessment.ts';

/**
 * Cálculo oficial e independente da Escala de Positividade (P-Scale)
 * Base: Caprara et al. (2012) e validação brasileira Borsa et al. (2015).
 * Item 4 é estritamente invertido (6 - X).
 */
export function calculatePositivity(answers: Record<number, number>): PositivityResult {
  const pScaleItemIds = [1, 2, 3, 4, 5, 6, 7, 8];
  
  // Validar se todas as 8 respostas existem
  for (const id of pScaleItemIds) {
    if (!answers[id] || answers[id] < 1 || answers[id] > 5) {
      throw new Error(`Resposta ausente ou inválida para o item ${id} da Escala de Positividade.`);
    }
  }

  let totalRawScore = 0;

  for (const id of pScaleItemIds) {
    const rawVal = answers[id];
    if (id === 4) {
      // Item 4 Invertido: 1->5, 2->4, 3->3, 4->2, 5->1
      totalRawScore += (6 - rawVal);
    } else {
      totalRawScore += rawVal;
    }
  }

  const meanScore = Number((totalRawScore / 8).toFixed(2));

  let level: 'BAIXO' | 'MODERADO_BAIXO' | 'MODERADO_ALTO' | 'ALTO';
  let levelLabel: string;
  let description: string;
  let characteristics: string[];
  let strengths: string[];
  let cautions: string[];
  let personalProfessionalReflections: string[];

  if (meanScore < 3.0) {
    level = 'BAIXO';
    levelLabel = 'Positividade Baixa';
    description =
      'Indica uma orientação geral menos favorável em relação a si mesmo, à vida e ao futuro. Há uma tendência a avaliar experiências com tom autocrítico acentuado ou ceticismo existencial.';
    characteristics = [
      'Visão predominantemente sóbria e por vezes desencantada do cotidiano',
      'Maior probabilidade de focalizar frustrações passadas ou incertezas do porvir',
      'Percepção atenuada do apoio social disponível e da própria autoeficácia',
    ];
    strengths = [
      'Ausência de ilusões ingênuas ou otimismo tóxico descolado da realidade',
      'Olhar analítico agudo para inconsistências e fragilidades em processos e relações',
    ];
    cautions = [
      'Risco de desgaste emocional diante de adversidades prolongadas',
      'Possível tendência ao isolamento afetivo ou desvalorização de conquistas alcançadas',
    ];
    personalProfessionalReflections = [
      'No ambiente de trabalho, pode transmitir excesso de severidade ou desânimo à equipe.',
      'Exercitar o reconhecimento intencional de progressos diários auxilia na preservação da energia vital.',
    ];
  } else if (meanScore < 3.75) {
    level = 'MODERADO_BAIXO';
    levelLabel = 'Positividade Moderada Baixa';
    description =
      'Apresenta uma atitude oscilante entre o realismo cauteloso e momentos de autoconfiança. A visão positiva tende a depender fortemente da estabilidade de circunstâncias externas favoráveis.';
    characteristics = [
      'Equilíbrio tênue entre satisfação pessoal e receios sobre o futuro',
      'Confiança situacional que oscila conforme o ambiente imediato de suporte',
      'Capacidade de recuperação após impactos, ainda que com certa hesitação inicial',
    ];
    strengths = [
      'Capacidade de avaliar situações sem extremos de euforia ou pessimismo absoluto',
      'Sensibilidade para reconhecer quando o cenário requer prudência ou reajuste de rota',
    ];
    cautions = [
      'Vulnerabilidade ao desânimo quando múltiplos desafios ocorrem simultaneamente',
      'Pode adiar iniciativas de expansão por excesso de cautela quanto ao futuro',
    ];
    personalProfessionalReflections = [
      'Em liderança, tende a manter operações estáveis, mas pode demorar a celebrar avanços com seus liderados.',
      'Construir rituais conscientes de autoapreciação fortalece a estabilidade da postura positiva.',
    ];
  } else if (meanScore < 4.5) {
    level = 'MODERADO_ALTO';
    levelLabel = 'Positividade Moderada Alta';
    description =
      'Reflete uma sólida e equilibrada orientação positiva em relação à própria identidade, trajetória de vida e perspectivas de futuro, ancorada em boa percepção de suporte interpessoal.';
    characteristics = [
      'Autoconceito estável e saudável com capacidade genuína de valorizar as próprias conquistas',
      'Postura construtiva perante impasses e abertura para pedir e oferecer colaboração',
      'Expectativa consistente de que o futuro guarda oportunidades realizáveis',
    ];
    strengths = [
      'Resiliência psicológica madura diante de reveses e cobranças profissionais',
      'Influência catalisadora no clima organizacional, promovendo cooperação e ânimo',
      'Disposição para enfrentar transformações mantendo a estabilidade emocional interna',
    ];
    cautions = [
      'Manter atenção para não desconsiderar incertezas pontuais legítimas em projetos complexos',
      'Garantir que a boa relação com os outros não gere complacência excessiva em cobranças necessárias',
    ];
    personalProfessionalReflections = [
      'Inspira segurança e credibilidade em posições de liderança e gestão de pessoas.',
      'Sua estabilidade interna atua como âncora de serenidade em períodos de reestruturação organizacional.',
    ];
  } else {
    level = 'ALTO';
    levelLabel = 'Positividade Alta';
    description =
      'Expressa uma elevada predisposição disposicional para enxergar a si mesmo, a própria história, o futuro e as redes humanas com profunda confiança, entusiasmo e gratidão.';
    characteristics = [
      'Forte convicção na própria capacidade de superação e orgulho saudável da trajetória percorrida',
      'Crença vívida nas possibilidades do porvir e ampla confiança no valor da cooperação humana',
      'Sensação consistente de plenitude e propósito no cotidiano',
    ];
    strengths = [
      'Notável vitalidade anímica que mobiliza indivíduos e times em direção a metas ambiciosas',
      'Alta tolerância ao estresse e extraordinária capacidade de regeneração emocional',
      'Propensão a inspirar coragem e solidariedade nos ambientes em que atua',
    ];
    cautions = [
      'Importância de exercitar escuta atenta a alertas críticos trazidos por colegas mais céticos',
      'Evitar a suposição de que todas as pessoas possuem a mesma facilidade natural para manter o ânimo',
    ];
    personalProfessionalReflections = [
      'Atua como um potente motor motivacional em posições executivas e estratégicas.',
      'O desafio gerencial é assegurar que a energia positiva seja acompanhada de disciplina analítica rigorosa.',
    ];
  }

  return {
    rawScore: totalRawScore,
    meanScore,
    level,
    levelLabel,
    description,
    characteristics,
    strengths,
    cautions,
    personalProfessionalReflections,
  };
}

/**
 * Cálculo oficial da subescala de OTIMISMO do ELOT (Extended Life Orientation Test)
 * 6 Itens de Otimismo: Itens globais 11, 14, 16, 19, 25, 27 (ELOT 3, 6, 8, 11, 17, 19).
 * Intervalo de pontuação bruta: 6 a 30.
 * Pontuação direta (sem inversões — mensura expectativa positiva generalizada).
 */
export function calculateOptimism(answers: Record<number, number>): OptimismResult {
  const optimismItemIds = [11, 14, 16, 19, 25, 27];

  for (const id of optimismItemIds) {
    if (!answers[id] || answers[id] < 1 || answers[id] > 5) {
      throw new Error(`Resposta ausente ou inválida para o item de Otimismo ${id}.`);
    }
  }

  const rawScore = optimismItemIds.reduce((acc, id) => acc + answers[id], 0);
  const meanScore = Number((rawScore / 6).toFixed(2));

  let level: 'BAIXO' | 'MODERADO' | 'ELEVADO';
  let levelLabel: string;
  let description: string;
  let strengths: string[];
  let cautions: string[];
  let decisionMakingReflections: string[];
  let opportunityReflections: string[];

  if (meanScore < 3.0) {
    level = 'BAIXO';
    levelLabel = 'Otimismo Baixo';
    description =
      'Indica pouca tendência espontânea a antecipar desfechos favoráveis. Há reticência em presumir que iniciativas inéditas darão certo sem garantias imediatas e tangíveis.';
    strengths = [
      'Prudência na alocação de recursos antes de dar novos passos',
      'Postura ancorada em fatos comprovados, evitando expectativas infundadas',
    ];
    cautions = [
      'Risco de hesitação em capturar janelas de oportunidade que exijam ousadia rápida',
      'Tendência a subestimar as probabilidades reais de sucesso em cenários incertos',
    ];
    decisionMakingReflections = [
      'Nas decisões de negócios, exige evidências exaustivas, o que protege contra precipitações mas pode retardar a entrada em novos mercados.',
    ];
    opportunityReflections = [
      'Pode enxergar propostas inovadoras inicialmente sob o prisma da desconfiança, necessitando de estímulo estruturado para mapear potenciais ganhos.',
    ];
  } else if (meanScore < 4.0) {
    level = 'MODERADO';
    levelLabel = 'Otimismo Moderado';
    description =
      'Demonstra expectativa equilibrada em relação ao futuro. Consegue vislumbrar o sucesso de projetos sem ignorar os requisitos práticos necessários para que ocorram.';
    strengths = [
      'Otimismo funcional: espera o melhor, mas condiciona os resultados à competência e ao esforço',
      'Capacidade de manter equipes mobilizadas sem criar expectativas fantasiosas',
    ];
    cautions = [
      'Em momentos de alta pressão, pode pender para a paralisia se o horizonte parecer nebuloso',
    ];
    decisionMakingReflections = [
      'Tomada de decisão equilibrada, buscando calibrar ambição com validação empírica e planos de contingência realistas.',
    ];
    opportunityReflections = [
      'Filtra oportunidades com critério lúcido, avançando com passos consistentes e mensuráveis.',
    ];
  } else {
    level = 'ELEVADO';
    levelLabel = 'Otimismo Elevado';
    description =
      'Expressa uma forte expectativa de que os eventos futuros tenderão a desfechos positivos. Caracteriza-se por alta disposição para empreender, experimentar novidades e liderar movimentos transformadores.';
    strengths = [
      'Coragem executiva para abrir frentes pioneiras e enfrentar cenários de volatilidade',
      'Capacidade magnética de engajar pessoas em visões de futuro estimulantes',
      'Persistência acima da média diante de recuos temporários em projetos estratégicos',
    ];
    cautions = [
      'Vulnerabilidade ao viés de confirmação e à subestimação do tempo ou custo exigido para implementação',
      'Risco de interpretar alertas legítimos da equipe como simples resistência à mudança',
    ];
    decisionMakingReflections = [
      'Tende a decidir com agilidade e foco na recompensa futura; beneficia-se imensamente de contrapesos analíticos e auditorias prévias.',
    ];
    opportunityReflections = [
      'Enxerga oportunidades mesmo em contextos de turbulência, funcionando como catalisador de inovação e disrupção.',
    ];
  }

  return {
    rawScore,
    meanScore,
    level,
    levelLabel,
    description,
    strengths,
    cautions,
    decisionMakingReflections,
    opportunityReflections,
  };
}

/**
 * Cálculo oficial da subescala de PESSIMISMO do ELOT (Extended Life Orientation Test)
 * 9 Itens de Pessimismo: Itens globais 10, 12, 13, 18, 20, 22, 24, 26, 28 (ELOT 2, 4, 5, 10, 12, 14, 16, 18, 20).
 * Intervalo de pontuação bruta: 9 a 45.
 * Pontuação direta (sem inversões — mensura a intensidade da expectativa negativa generalizada).
 * IMPORTANTE: O pessimismo não é tratado como patologia ou defeito, mas como recurso de antecipação de risco e cautela estratégica.
 */
export function calculatePessimism(answers: Record<number, number>): PessimismResult {
  const pessimismItemIds = [10, 12, 13, 18, 20, 22, 24, 26, 28];

  for (const id of pessimismItemIds) {
    if (!answers[id] || answers[id] < 1 || answers[id] > 5) {
      throw new Error(`Resposta ausente ou inválida para o item de Pessimismo ${id}.`);
    }
  }

  const rawScore = pessimismItemIds.reduce((acc, id) => acc + answers[id], 0);
  const meanScore = Number((rawScore / 9).toFixed(2));

  let level: 'BAIXO' | 'MODERADO' | 'ELEVADO';
  let levelLabel: string;
  let description: string;
  let strengths: string[];
  let cautions: string[];
  let riskAnticipationReflections: string[];
  let difficultyPerceptionReflections: string[];

  if (meanScore < 2.33) {
    level = 'BAIXO';
    levelLabel = 'Pessimismo Baixo';
    description =
      'Indica pouca inclinação espontânea a antecipar cenários de fracasso ou percalços. Há confiança de que as coisas encontrarão naturalmente um desfecho favorável, raramente pressupondo desastres.';
    strengths = [
      'Leveza emocional no trabalho e ausência de preocupações desgastantes ou ruminações improdutivas',
      'Agilidade em manter projetos fluindo sem travas causadas pelo medo do erro',
    ];
    cautions = [
      'Possível vulnerabilidade a riscos operacionais não mapeados ou surpresas desfavoráveis',
      'Pode desconsiderar planos B e matrizes de contingência por considerá-los burocracia desnecessária',
    ];
    riskAnticipationReflections = [
      'Beneficia-se de instituir processos formais de auditoria de risco e pré-mortem em projetos críticos para suprir pontos cegos defensivos.',
    ];
    difficultyPerceptionReflections = [
      'Tende a encarar dificuldades como meros detalhes superficiais, o que é ótimo para o ânimo, mas exige cuidado para não subestimar gargalos estruturais.',
    ];
  } else if (meanScore < 3.33) {
    level = 'MODERADO';
    levelLabel = 'Pessimismo Moderado';
    description =
      'Expressa uma cautela atenta e construtiva. O participante reconhece que adversidades e falhas são inevitáveis na vida e nos negócios, utilizando essa percepção para se blindar e prever defesas.',
    strengths = [
      'Prudência estratégica sem derrotismo: antecipa o que pode dar errado para prevenir com antecedência',
      'Excelente equilíbrio para funções de gestão de riscos, governança e alocação orçamentária',
    ];
    cautions = [
      'Sob estresse contínuo, a atenção preventiva pode se transformar em preocupação desproporcional',
    ];
    riskAnticipationReflections = [
      'Excelente capacidade de prever contingências e desenhar alternativas viáveis antes de se comprometer com caminhos irreversíveis.',
    ];
    difficultyPerceptionReflections = [
      'Enxerga obstáculos com sobriedade técnica, sem desespero e sem ingenuidade, focando no saneamento de fragilidades.',
    ];
  } else {
    level = 'ELEVADO';
    levelLabel = 'Pessimismo Elevado';
    description =
      'Demonstra elevada e sistemática antecipação de resultados negativos e falhas potenciais. Essa postura pode funcionar como uma poderosa blindagem crítica (pessimismo defensivo) ou, se descalibrada, gerar sobrecarga de apreensão.';
    strengths = [
      'Faro aguçado para detecção de vulnerabilidades ocultas, falhas de compliance e riscos regulatórios',
      'Rigor analítico exemplar em auditorias, revisão de contratos e testes de estresse de sistemas complexos',
      'Raramente é pego de surpresa por crises, pois tende a manter defesas ativas de prontidão',
    ];
    cautions = [
      'Risco de ceticismo excessivo que desmotive equipes e gere atrito com perfis mais arrojados',
      'Perigo de paralisia por análise: protelar decisões importantes na busca de uma segurança absoluta inexistente',
    ];
    riskAnticipationReflections = [
      'Sua mente mapeia cenários catastróficos quase instantaneamente; o segredo de ouro é traduzir essa capacidade em checklists e soluções preventivas, e não em bloqueios de iniciativa.',
    ];
    difficultyPerceptionReflections = [
      'Pode sentir que as cartas estão marcadas contra si ou que Murphy sempre vence; separar fatos objetivos de profecias autorrealizáveis é essencial para a produtividade.',
    ];
  }

  return {
    rawScore,
    meanScore,
    level,
    levelLabel,
    description,
    strengths,
    cautions,
    riskAnticipationReflections,
    difficultyPerceptionReflections,
  };
}

/**
 * Inteligência Interpretativa Integrada Metodologia COMET
 * Cruzamentos tridimensionais sem fusão matemática forçada:
 * 1. Otimismo x Pessimismo (Matriz dos 4 Quadrantes Estratégicos)
 * 2. Positividade x Otimismo
 * 3. Positividade x Pessimismo
 */
export function calculateCometCrossAnalysis(
  pos: PositivityResult,
  opt: OptimismResult,
  pess: PessimismResult
): CometCrossAnalysis {
  let quadrantKey: 'OTIMISMO_PURO' | 'OTIMISMO_ESTRATEGICO' | 'PRAGMATISMO_NEUTRO' | 'PESSIMISMO_DEFENSIVO';
  let quadrantTitle: string;
  let quadrantSubtitle: string;
  let summary: string;

  const isHighOpt = opt.meanScore >= 3.5;
  const isHighPess = pess.meanScore >= 2.8;

  if (isHighOpt && !isHighPess) {
    quadrantKey = 'OTIMISMO_PURO';
    quadrantTitle = 'Otimismo Disposicional Puro (Foco na Recompensa)';
    quadrantSubtitle = 'Alta expectativa de sucesso combinada com baixa aversão ao risco.';
    summary =
      'Seu modelo mental é impulsionado prioritariamente pelas oportunidades e pela visão de conquista futura. Você acredita na fluidez dos desfechos positivos e tende a se desvencilhar rapidamente de ideias derrotistas.';
  } else if (isHighOpt && isHighPess) {
    quadrantKey = 'OTIMISMO_ESTRATEGICO';
    quadrantTitle = 'Otimismo Estratégico / Vigilante (Bipolaridade Construtiva)';
    quadrantSubtitle = 'Visão arrojada de futuro aliada a uma rigorosa antecipação de falhas.';
    summary =
      'Combinação de alta sofisticação executiva: você possui ambição e coragem para sonhar alto, mas concomitantemente aciona radares defensivos para mapear tudo o que pode dar errado no percurso.';
  } else if (!isHighOpt && isHighPess) {
    quadrantKey = 'PESSIMISMO_DEFENSIVO';
    quadrantTitle = 'Pessimismo Defensivo / Blindagem Analítica';
    quadrantSubtitle = 'Foco preponderante na mitigação de perdas e detecção de riscos.';
    summary =
      'Sua orientação cognitiva prioriza a segurança, a preservação do terreno conquistado e a eliminação de vulnerabilidades. Não se seduz por promessas fáceis e opera como um rigoroso auditor de viabilidade.';
  } else {
    quadrantKey = 'PRAGMATISMO_NEUTRO';
    quadrantTitle = 'Pragmatismo Factual / Realismo Neutro';
    quadrantSubtitle = 'Postura ponderada, imune tanto à euforia quanto ao alarme prematuro.';
    summary =
      'Você tende a manter um posicionamento centrado nos fatos objetivos do presente. Não gasta energia fantasiando desfechos miraculosos nem se desgasta prevendo desastres imaginários.';
  }

  // Análise de cruzamento com Positividade
  let positivityCrossInsight: string;
  if (pos.meanScore >= 3.75 && quadrantKey === 'OTIMISMO_PURO') {
    positivityCrossInsight =
      'Existe profunda coerência anímica: sua sólida autoestima e satisfação existencial (P-Scale) nutrem diretamente sua crença firme em vitórias futuras (Otimismo ELOT), com rara interferência de temores (Baixo Pessimismo).';
  } else if (pos.meanScore >= 3.75 && quadrantKey === 'OTIMISMO_ESTRATEGICO') {
    positivityCrossInsight =
      'Configuração de alta resiliência executiva: sua base interna de segurança e valorização pessoal (P-Scale) impede que o pessimismo elevado se converta em angústia, mantendo-o como uma ferramenta meramente técnica de planejamento e blindagem.';
  } else if (pos.meanScore < 3.5 && quadrantKey === 'OTIMISMO_PURO') {
    positivityCrossInsight =
      'Divergência intrigante a investigar: você demonstra expectativas futuras promissoras (Otimismo Alto), porém avalia sua situação de vida atual ou suporte imediato de forma mais restritiva (Positividade Baixa). O futuro é visto como refúgio de emancipação.';
  } else if (pos.meanScore >= 3.75 && quadrantKey === 'PESSIMISMO_DEFENSIVO') {
    positivityCrossInsight =
      'Combinação paradoxal fértil: você se sente bem consigo mesmo e confia em sua capacidade pessoal (P-Scale Alta), mas desconfia do ambiente e das variáveis externas (Pessimismo Alto). Você confia no seu braço, mas desconfia da sorte.';
  } else {
    positivityCrossInsight =
      'Relação equilibrada entre a autoavaliação pessoal e a interpretação de possibilidades futuras, apontando para uma governança psicológica estável e ajustada à realidade.';
  }

  const convergences = [
    `Abertura para desfechos ${opt.level === 'ELEVADO' ? 'muito promissores' : 'comedidos e graduais'}.`,
    `Filtro de cautela posicionado em nível ${pess.levelLabel.toLowerCase()}, calibrando o nível de salvaguardas exigidas.`,
    `A base de Positividade Geral (${pos.levelLabel}) atua como plataforma afetiva de sustentação para a tomada de decisões.`,
  ];

  const divergences = [
    opt.level === 'ELEVADO' && pess.level === 'ELEVADO'
      ? 'Tensão criativa entre o ímpeto de avançar aceleradamente e a urgência de checar checklists de contingência.'
      : 'Ausência de divergências radicais; as expectativas operam em harmonia com a leitura de riscos.',
    pos.meanScore >= 4.0 && pess.meanScore >= 3.3
      ? 'Contraste entre a sensação de autoeficácia calorosa e a antecipação gélida de percalços operacionais.'
      : 'Fluidez equilibrada entre o olhar para dentro de si e o olhar para o horizonte corporativo.',
  ];

  const hypothesesToInvestigate = [
    'Como seu padrão de expectativa afeta o ritmo em que você autoriza investimentos ou novas contratações?',
    'Até que ponto sua tolerância ao ceticismo alheio é afetada quando você lidera projetos desafiadores?',
    'Em momentos de crise repentina, você tende a buscar saídas criativas imediatamente ou se recolhe para contabilizar estragos?',
    'Sua equipe percebe sua postura como inspiradora, desafiadora, prudente ou exigente demais?',
  ];

  const businessImpacts = {
    leadership:
      opt.meanScore >= 3.8
        ? 'Liderança inspiradora e focada na visão de expansão; o cuidado é não soar desconectado das dificuldades reais do time de base.'
        : 'Liderança estruturada e realista; orienta os liderados com metas sólidas e pés no chão, evitando falsas esperanças.',
    management:
      pess.meanScore >= 3.0
        ? 'Gestão voltada para estabilidade, processos robustos e zero surpresas desfavoráveis na operação.'
        : 'Gestão ágil e dinâmica, com pouca burocracia preventiva e tolerância pragmática a desvios toleráveis.',
    planning:
      'Capacidade de projetar cenários futuros levando em consideração tanto as curvas ideais de crescimento quanto os testes de estresse necessários.',
    decisionMaking:
      opt.meanScore >= 3.5 && pess.meanScore < 2.5
        ? 'Decisão veloz orientada a ganhos; risco de subestimar cláusulas de saída ou planos de redundância.'
        : opt.meanScore >= 3.5 && pess.meanScore >= 2.8
        ? 'Decisão cirúrgica e bem fundamentada, avaliando o upside com atenção plena às armadilhas do downside.'
        : 'Decisão cuidadosa e sequencial, condicionada à validação de evidências e minimização de riscos patrimoniais.',
    changeManagement:
      'Capacidade de conduzir transições organizacionais preservando a motivação e antecipando resistências comportamentais no ecossistema.',
    opportunityPerception:
      opt.meanScore >= 3.5
        ? 'Radar de oportunidades aguçado e ávido por identificar tendências e pioneirismo no mercado.'
        : 'Percepção de oportunidades focada em eficiência interna, otimização de custos e consolidação de vantagens existentes.',
    riskAnticipation:
      pess.meanScore >= 3.0
        ? 'Vigilância contínua para proteger a organização contra vulnerabilidades fiscais, operacionais e de reputação.'
        : 'Abordagem descontraída em relação ao risco; beneficia-se de parceiros complementares que façam a auditoria técnica.',
  };

  return {
    quadrantKey,
    quadrantTitle,
    quadrantSubtitle,
    summary,
    convergences,
    divergences,
    hypothesesToInvestigate,
    positivityCrossInsight,
    businessImpacts,
  };
}

/**
 * Plano de Desenvolvimento Individual COMET (7 Pilares Obrigatórios)
 * Recomendações práticas, corporativas e individualizadas.
 */
export function generateDevelopmentPlan(
  pos: PositivityResult,
  opt: OptimismResult,
  pess: PessimismResult,
  analysis: CometCrossAnalysis
): DevelopmentPlan {
  let mainStrength: string;
  let mainAttentionPoint: string;
  let developmentAspect: string;
  let practicalRecommendation: string;
  let reflectionExercise: string;
  let professionalAction: string;
  let behavioralIndicator: string;

  if (opt.meanScore >= 3.5 && pess.meanScore < 2.5) {
    mainStrength =
      'Elevada capacidade de iniciativa e contágio positivo, mobilizando pessoas em torno de metas arrojadas sem hesitação improdutiva.';
    mainAttentionPoint =
      'Tendência a subestimar atritos operacionais, atrasos de cronograma e custos ocultos em novos empreendimentos.';
    developmentAspect =
      'Desenvolver a disciplina metodológica de "Advocacia do Diabo" ou "Pré-Mortem" antes de homologar decisões críticas.';
    practicalRecommendation =
      'Antes de fechar qualquer contrato ou lançar um projeto, reserve 30 minutos com sua equipe mais cética com a pergunta: "Supondo que este projeto fracassou daqui a um ano, quais foram exatamente as causas?".';
    reflectionExercise =
      'Em que momentos recentes minha empolgação com uma oportunidade me levou a ignorar avisos fundamentados de parceiros ou subordinados?';
    professionalAction =
      'Instituir formalmente uma matriz de riscos (probabilidade x impacto) para todo projeto com investimento acima de valor relevante.';
    behavioralIndicator =
      'Redução de surpresas e retrabalhos em projetos estratégicos nos próximos 60 dias, atestada pelo feedback da equipe técnica.';
  } else if (opt.meanScore >= 3.5 && pess.meanScore >= 2.8) {
    mainStrength =
      'Excepcional acuidade estratégica combinando visão ampla de oportunidade (Otimismo Alto) com blindagem detalhada contra falhas (Pessimismo Alto).';
    mainAttentionPoint =
      'Risco de sobrecarga mental por hipervigilância, alternando entre a euforia criativa e o estresse da antecipação contínua de perigos.';
    developmentAspect =
      'Aprender a delegar o monitoramento dos riscos secundários para evitar o esgotamento por controle centralizado.';
    practicalRecommendation =
      'Classifique os riscos em "Críticos" (que você monitora pessoalmente) e "Operacionais" (que você delega integralmente com alçada definida para a equipe).';
    reflectionExercise =
      'Estou conseguindo desfrutar das vitórias alcançadas ou imediatamente salto para a próxima preocupação e ameaça no horizonte?';
    professionalAction =
      'Realizar uma reunião mensal de celebração de entregas antes de abrir a pauta de novos desafios e auditorias.';
    behavioralIndicator =
      'Aumento perceptível do tempo dedicado à estratégia e redução de reuniões de crise de última hora nos próximos 90 dias.';
  } else if (opt.meanScore < 3.0 && pess.meanScore >= 3.0) {
    mainStrength =
      'Capacidade ímpar de auditoria, diagnóstico de falhas e proteção patrimonial contra aventuras arriscadas no negócio.';
    mainAttentionPoint =
      'Risco de ceticismo paralisante que iniba a criatividade da equipe e postergue decisões que exigiriam algum apetite ao risco.';
    developmentAspect =
      'Desenvolver flexibilidade para autorizar projetos em fase piloto (testes em pequena escala) mesmo sem certeza total de sucesso.';
    practicalRecommendation =
      'Substitua a pergunta "Por que isso pode dar errado?" pela pergunta sequencial: "Qual é o custo máximo suportável para testarmos isso em escala reduzida por 30 dias?".';
    reflectionExercise =
      'Quantas oportunidades valiosas deixei de aproveitar nos últimos dois anos exclusivamente pelo medo de um resultado imperfeito?';
    professionalAction =
      'Aprovar e patrocinar 2 iniciativas de inovação ou melhoria com orçamento controlado propostas por liderados nos próximos 45 dias.';
    behavioralIndicator =
      'Percepção dos liderados de que o líder está mais receptivo a ideias inovadoras, avaliada em pesquisa de clima ou 1-on-1s.';
  } else {
    mainStrength =
      'Solidez factual e clareza analítica, atuando com discernimento desprovido de exageros emocionais ou afobação.';
    mainAttentionPoint =
      'Risco de manter-se em zona de conforto pelo apego ao pragmatismo estrito, deixando de inspirar a equipe com visões desafiadoras.';
    developmentAspect =
      'Ampliar a capacidade de projetar cenários aspiracionais de médio e longo prazo que engajem o time além da rotina imediata.';
    practicalRecommendation =
      'Dedique 1 hora por semana para ler sobre tendências tecnológicas e novos modelos de negócios fora do seu segmento habitual.';
    reflectionExercise =
      'Se eu não estivesse condicionado aos processos cotidianos, qual salto transformador proporia para minha área hoje?';
    professionalAction =
      'Construir e apresentar à diretoria ou à equipe um plano de visão para os próximos 3 anos focado em novas fronteiras de atuação.';
    behavioralIndicator =
      'Participação proativa em pelo menos um fórum ou comitê de inovação e novos negócios no próximo trimestre.';
  }

  return {
    mainStrength,
    mainAttentionPoint,
    developmentAspect,
    practicalRecommendation,
    reflectionExercise,
    professionalAction,
    behavioralIndicator,
  };
}
