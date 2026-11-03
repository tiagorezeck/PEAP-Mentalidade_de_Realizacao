/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowRight, Brain, FileCheck2, RotateCcw, User } from 'lucide-react';
import { ParticipantData } from '../types/assessment.ts';

interface PresentationViewPCQASQProps {
  onStart: (participant: ParticipantData, mode: 'FULL' | 'PCQ_ONLY' | 'ASQ_ONLY') => void;
  onResume?: () => void;
  hasActiveSession?: boolean;
  onOpenAudit: () => void;
}

export const PresentationViewPCQASQ: React.FC<PresentationViewPCQASQProps> = ({
  onStart,
  onResume,
  hasActiveSession,
  onOpenAudit,
}) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [organization, setOrganization] = useState('');
  const [mode, setMode] = useState<'FULL' | 'PCQ_ONLY' | 'ASQ_ONLY'>('FULL');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Por favor, informe seu nome completo para emissão do relatório individual.');
      return;
    }
    setError('');
    onStart(
      {
        name: name.trim(),
        role: role.trim() || undefined,
        organization: organization.trim() || undefined,
      },
      mode
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      {/* Resume Banner */}
      {hasActiveSession && onResume && (
        <div className="mb-8 p-4 rounded-xl bg-[#ff6b00]/15 border border-[#ff6b00]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#ff6b00] flex items-center justify-center text-white shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Avaliação do Módulo 2 em Andamento</h4>
              <p className="text-xs text-[#cbd5e1]">
                Identificamos uma aplicação do PCQ-24 / ASQ não concluída neste navegador.
              </p>
            </div>
          </div>
          <button
            onClick={onResume}
            className="px-4 py-2 rounded-lg bg-[#ff6b00] hover:bg-[#e65c00] text-white text-xs font-bold whitespace-nowrap shadow-md transition-all"
          >
            Retomar Aplicação Salva →
          </button>
        </div>
      )}

      {/* Header */}
      <div className="text-center space-y-4 mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#ff6b00] bg-[#1a1c24] border border-[#ff6b00]/30 px-3.5 py-1.5 rounded-md">
          <Brain className="w-3.5 h-3.5" />
          Área Mentalidade · Assessment COMET
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
          Capital Psicológico e Estilo de Atribuição
        </h1>

        <div className="max-w-2xl mx-auto p-5 rounded-xl bg-[#141720] border border-[#222838] text-sm sm:text-base text-[#cbd5e1] leading-relaxed shadow-lg">
          <p className="italic">
            &ldquo;Este módulo avalia os recursos psicológicos de desenvolvimento (PCQ-24) e os padrões cognitivos de interpretação causal perante conquistas e adversidades (ASQ). Responda com base na sua maneira habitual de pensar e atuar.&rdquo;
          </p>
        </div>
      </div>

      {/* Grid informativo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        <div
          onClick={() => setMode('PCQ_ONLY')}
          className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
            mode === 'PCQ_ONLY' || mode === 'FULL'
              ? 'bg-[#151926] border-[#ff6b00] shadow-lg shadow-[#ff6b00]/10'
              : 'bg-[#13161f] border-[#23293a] hover:border-[#2d3548]'
          }`}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#ff8533]">
                Instrumento 01 · 24 Itens
              </span>
              <span className="text-xs text-[#64748b] font-mono">PCQ-24</span>
            </div>
            <h3 className="text-lg font-bold text-white">PCQ-24 — Capital Psicológico</h3>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Avalia o reservatório de recursos psicológicos de ordem superior: Autoeficácia, Esperança, Resiliência e Otimismo.
            </p>
            <div className="text-[11px] text-[#64748b] pt-1">
              Escala Likert oficial de 6 pontos (Luthans, Avolio & Avey, 2007).
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#1e2332] flex items-center justify-between text-xs text-[#cbd5e1]">
            <span>Dimensões:</span>
            <span className="font-semibold text-white">4 Recursos PsyCap</span>
          </div>
        </div>

        <div
          onClick={() => setMode('ASQ_ONLY')}
          className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
            mode === 'ASQ_ONLY' || mode === 'FULL'
              ? 'bg-[#151926] border-[#ff6b00] shadow-lg shadow-[#ff6b00]/10'
              : 'bg-[#13161f] border-[#23293a] hover:border-[#2d3548]'
          }`}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#ff8533]">
                Instrumento 02 · 12 Situações
              </span>
              <span className="text-xs text-[#64748b] font-mono">ASQ</span>
            </div>
            <h3 className="text-lg font-bold text-white">ASQ — Estilo de Atribuição</h3>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Investiga como você atribui causas a 6 acontecimentos positivos e 6 negativos nas dimensões de Internalidade, Estabilidade e Globalidade.
            </p>
            <div className="text-[11px] text-[#64748b] pt-1">
              Escala oficial de 7 pontos (Peterson, Seligman et al., 1982).
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#1e2332] flex items-center justify-between text-xs text-[#cbd5e1]">
            <span>Dimensões:</span>
            <span className="font-semibold text-white">Internalidade, Estabilidade & Globalidade</span>
          </div>
        </div>
      </div>

      {/* Seleção do Modo */}
      <div className="p-4 rounded-xl bg-[#141722] border border-[#222838] mb-8 space-y-3">
        <label className="text-xs font-bold text-white uppercase tracking-wider block">
          Escolha o modo de aplicação:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => setMode('FULL')}
            className={`p-3 rounded-lg border text-left text-xs transition-all ${
              mode === 'FULL'
                ? 'bg-[#ff6b00]/15 border-[#ff6b00] text-white font-bold ring-1 ring-[#ff6b00]'
                : 'bg-[#0f1118] border-[#222736] text-[#cbd5e1] hover:border-[#333c52]'
            }`}
          >
            <div className="font-semibold">Módulo Completo (Recomendado)</div>
            <div className="text-[11px] text-[#94a3b8] mt-0.5">PCQ-24 + ASQ + Relatório Integrado</div>
          </button>

          <button
            type="button"
            onClick={() => setMode('PCQ_ONLY')}
            className={`p-3 rounded-lg border text-left text-xs transition-all ${
              mode === 'PCQ_ONLY'
                ? 'bg-[#ff6b00]/15 border-[#ff6b00] text-white font-bold ring-1 ring-[#ff6b00]'
                : 'bg-[#0f1118] border-[#222736] text-[#cbd5e1] hover:border-[#333c52]'
            }`}
          >
            <div className="font-semibold">Apenas PCQ-24</div>
            <div className="text-[11px] text-[#94a3b8] mt-0.5">24 questões · Capital Psicológico</div>
          </button>

          <button
            type="button"
            onClick={() => setMode('ASQ_ONLY')}
            className={`p-3 rounded-lg border text-left text-xs transition-all ${
              mode === 'ASQ_ONLY'
                ? 'bg-[#ff6b00]/15 border-[#ff6b00] text-white font-bold ring-1 ring-[#ff6b00]'
                : 'bg-[#0f1118] border-[#222736] text-[#cbd5e1] hover:border-[#333c52]'
            }`}
          >
            <div className="font-semibold">Apenas ASQ</div>
            <div className="text-[11px] text-[#94a3b8] mt-0.5">12 situações · Estilo Explicativo</div>
          </button>
        </div>
      </div>

      {/* Formulário de Identificação */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-[#141722] border border-[#222838] shadow-2xl space-y-6">
        <div className="flex items-center gap-3 border-b border-[#222838] pb-4">
          <div className="w-8 h-8 rounded-lg bg-[#ff6b00]/15 flex items-center justify-center text-[#ff6b00]">
            <User className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Identificação para o Relatório</h3>
            <p className="text-xs text-[#94a3b8]">Os dados são salvos localmente e constarão no relatório executivo.</p>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-950/60 border border-red-700/50 text-red-200 text-xs">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-semibold text-[#e2e8f0]">
              Nome Completo <span className="text-[#ff6b00]">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex.: Mariana Ferreira"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0e1017] border border-[#2a3042] text-sm text-white placeholder-[#475569] focus:outline-none focus:border-[#ff6b00] transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#e2e8f0]">
              Cargo / Função <span className="text-xs text-[#64748b]">(opcional)</span>
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Ex.: Gerente Sênior de Produtos"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0e1017] border border-[#2a3042] text-sm text-white placeholder-[#475569] focus:outline-none focus:border-[#ff6b00] transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#e2e8f0]">
              Empresa / Organização <span className="text-xs text-[#64748b]">(opcional)</span>
            </label>
            <input
              type="text"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              placeholder="Ex.: Vanguard Digital"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0e1017] border border-[#2a3042] text-sm text-white placeholder-[#475569] focus:outline-none focus:border-[#ff6b00] transition-colors"
            />
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={onOpenAudit}
            className="text-xs text-[#94a3b8] hover:text-[#ff8533] flex items-center gap-1.5 transition-colors"
          >
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>Consultar referências científicas e direitos de utilização</span>
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-[#ff6b00] to-[#e65c00] hover:from-[#ff7919] hover:to-[#eb6408] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#ff6b00]/30 flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <span>
              {mode === 'FULL'
                ? 'Iniciar Módulo Completo (PCQ-24 + ASQ)'
                : mode === 'PCQ_ONLY'
                ? 'Iniciar PCQ-24 (24 Questões)'
                : 'Iniciar ASQ (12 Situações)'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
