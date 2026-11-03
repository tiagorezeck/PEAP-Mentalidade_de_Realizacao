# Assessment COMET — Plano de Reformulação do Relatório do Módulo 2 (PCQ-24 & ASQ)

Enriquecimento completo do relatório do Módulo 2 (Capital Psicológico e Estilo de Atribuição Explicativa), transformando uma visualização simples em um relatório executivo profundo com gráficos interativos e dinâmicos (Radar/Teia de Aranha, Barras Agrupadas e Medidores Dial) e análises comportamentais aplicadas ao contexto corporativo e de liderança.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> As escolhas abaixo foram confirmadas pelo usuário na etapa de planejamento e orientam toda a construção visual e técnica do Módulo 2:

- **Decisão Confirmada 1 (Visualização PCQ-24)**: Gráfico de Radar (Teia de Aranha) SVG interativo exibindo as 4 dimensões (Autoeficácia, Esperança, Resiliência, Otimismo) sobreposto com histórico e benchmark + Barras Detalhadas por Dimensão com classificações formais (Baixo, Moderado, Alto, Elevado).
- **Decisão Confirmada 2 (Visualização ASQ)**: Gráfico de Barras Agrupadas comparando CoPos (Situações Positivas) vs. CoNeg (Situações Negativas) nas 3 dimensões atribucionais (Internalidade, Estabilidade, Globalidade) + Medidor Dial SVG de Saldo Limpo e Índice de Desesperança.
- **Decisão Confirmada 3 (Aprofundamento Analítico)**: Análise executiva completa por dimensão contemplando: Diagnóstico Técnico, Impactos Comportamentais no Trabalho, Pontos Fortes e Riscos/Gargalos, além de um Plano de Ação Executivo customizado por perfil.

---

## 1. Overview & Core Concept

- **O que faz**: O Módulo 2 avalia o Capital Psicológico (PCQ-24: Autoeficácia, Esperança, Resiliência, Otimismo) e o Estilo Atribucional (ASQ: Internalidade, Estabilidade e Globalidade em eventos positivos e negativos). O relatório aprimorado traduz os números brutos em insights práticos sobre tomada de decisão, enfrentamento de crises, perseverança e risco de burnout/desesperança.
- **Público-Alvo**: Avaliados, Líderes de Gestão de Pessoas, Business Partners (HRBPs), Coaches Executivos e Consultores Organizacionais.
- **Valor Principal**: Transforma dados psicométricos abstratos em uma radiografia executiva clara, com suporte visual moderno em gráficos SVG leves (Radar, Barras Agrupadas e Diais), compatíveis com os modos Claro e Escuro do sistema.

---

## 2. User Experience & Visual Design

### Fluxos Principais de Navegação no Relatório
1. **Visão Geral do Módulo 2**:
   - Card de Resumo do Capital Psicológico Global (Escore Médio de 1 a 6 com badge de nível) e Saldo Atribucional Limpo (CoPos - CoNeg).
   - Visualização lado a lado ou tabulada dos dois instrumentos (PCQ-24 e ASQ).
2. **Seção PCQ-24 (Capital Psicológico)**:
   - **Gráfico de Radar SVG (Teia de Aranha)** com eixos para Autoeficácia, Esperança, Resiliência e Otimismo, destacando a forma da "muralha psicológica" do indivíduo.
   - **Cards de Dimensão**: Exibição da pontuação individual (ex: 4.8 / 6.0), nível (Elevado), barras de progresso com marcador e 4 abas/seções de conteúdo: *Comportamento observado*, *Pontos Fortes*, *Riscos/Vulnerabilidades* e *Recomendações Práticas*.
3. **Seção ASQ (Estilo Atribucional Explicativo)**:
   - **Gráfico de Barras Agrupadas**: CoPos vs CoNeg para Internalidade (EU), Estabilidade (SEMPRE) e Globalidade (TUDO).
   - **Medidores Dial Circular (Gauge)**: Saldo Atribucional Limpo (com zona verde/amarela/vermelha) e Índice de Desesperança (Hopelessness Index).
   - **Matriz de Atribuição Explicativa**: Explicação didática de como o avaliado interpreta sucessos (atribuição interna/estável/global é saudável) e fracassos (atribuição interna/estável/global é fator de risco).
4. **Plano de Ação Executivo Unificado do Módulo 2**:
   - Matriz de Prioridades de Desenvolvimento com ações para alavancar os pontos fortes do PsyCap e reestruturar viéses cognitivos negativos.

### Estética & Modos Claro/Escuro
- **Paleta de Cores**:
  - Autoeficácia: Índigo / Azul Real (`#6366f1` / `#4f46e5`)
  - Esperança: Esmeralda (`#10b981` / `#059669`)
  - Resiliência: Âmbar / Laranja (`#f59e0b` / `#d97706`)
  - Otimismo: Violeta / Púrpura (`#8b5cf6` / `#7c3aed`)
- **Compatibilidade Dual-Theme**:
  - Suporte completo a `.dark` com variáveis Tailwind (`bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-800`).
  - Sem contraste quebrado em cards, gráficos ou modais.

---

## 3. Key Product Decisions & Trade-Offs

- **Gráficos SVG Nativos sem Bibliotecas Pesadas**:
  - *Abordagem Escolhida*: Construção dos gráficos de Radar, Barras Agrupadas e Diais em SVG puro com React e Tailwind.
  - *Motivo*: Garante carregamento instantâneo, exportação limpa para PDF/impressão, controle total do estilo dark/light e zero dependência de pacotes externos pesados.
- **Preservação da Rigidez Científica (Luthans et al. & Peterson et al.)**:
  - *Abordagem Escolhida*: As fórmulas de cálculo de pontuação em `pcq_asq_scoring.ts` permanecem fiéis às chaves originais (PCQ-24 em escala de 1 a 6; ASQ em escalas de 1 a 7 com cálculos de CoPos, CoNeg e Saldo Limpo).
  - *Motivo*: Respeito absoluto às normas acadêmicas dos testes sem distorcer as pontuações brutas.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        COMPONENTE DE RELATÓRIO                         │
│                    ReportPCQASQIntegratedView.tsx                      │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
           ┌────────────────────────┴────────────────────────┐
           ▼                                                 ▼
┌───────────────────────────────┐         ┌───────────────────────────────┐
│     PAINEL PCQ-24 (PSYCAP)    │         │      PAINEL ASQ (ESTILO)      │
├───────────────────────────────┤         ├───────────────────────────────┤
│ • RadarChartSVG.tsx           │         │ • GroupedBarChartSVG.tsx      │
│ • DimensionBarCard.tsx        │         │ • GaugeDialSVG.tsx            │
│ • BehavioralAnalysisPCQ.tsx   │         │ • AttributionMatrixCard.tsx   │
└───────────────────────────────┘         └───────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                PLANO DE AÇÃO EXECUTIVO UNIFICADO                      │
│                    Module2ExecutivePlanCard.tsx                        │
└────────────────────────────────────────────────────────────────────────┘
```

### Mapeamento de Arquivos e Alterações
1. `src/components/ReportPCQASQIntegratedView.tsx`: Reformulação visual completa do relatório integrado do Módulo 2 com tabs/seções interativas, gráficos SVG dinâmicos e análises de impacto comportamental.
2. `src/components/ReportPCQ24View.tsx`: Atualização do relatório individual do PCQ-24 incluindo o Gráfico de Radar SVG e cartões expandidos de dimensão.
3. `src/components/ReportASQView.tsx`: Atualização do relatório individual do ASQ com Gráfico de Barras Agrupadas (CoPos vs CoNeg) e Medidores Dial.
4. `src/utils/pcq_asq_scoring.ts`: Adição de geradores de diagnósticos comportamentais detalhados e recomendações executivas contextualizadas com base nas pontuações obtidas.

---

## Próximos Passos
Após a aprovação deste plano pelo usuário, iniciaremos a implementação no código fonte com compilação e verificação de linting.
