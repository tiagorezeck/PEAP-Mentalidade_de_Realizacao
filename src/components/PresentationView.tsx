/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Compass,
  FileCheck2,
  Play,
  RotateCcw,
  Sparkles,
  User,
  ShieldCheck,
  Target,
} from 'lucide-react';
import { ParticipantData } from '../types/assessment.ts';

interface PresentationViewProps {
  onStart: (participant: ParticipantData) => void;
  onResume?: () => void;
  hasActiveSession: boolean;
  onOpenAudit: () => void;
}

export const PresentationView: React.FC<PresentationViewProps> = ({
  onStart,
  onResume,
  hasActiveSession,
  onOpenAudit,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [organization, setOrganization] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Por favor, informe seu nome completo para emissão do relatório individual.');
      return;
    }
    setError('');
    onStart({
      name: name.trim(),
      email: email.trim() || undefined,
      role: role.trim() || undefined,
      organization: organization.trim() || undefined,
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-14 space-y-10">
      {/* Badge e Cabeçalho Oficial do Módulo PEAP */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800/60 px-4 py-1.5 rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-orange-500" />
          Área Mentalidade · Assessment COMET
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
          PEAP — MENTALIDADE DE REALIZAÇÃO
        </h1>

        <p className="text-sm sm:text-base font-medium text-orange-600 dark:text-orange-400 tracking-wide">
          Positividade, Expectativa, Atribuições e Psicológico.
        </p>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Avaliação científica unificada integrando os 4 pilares do funcionamento psicológico humano: P-Scale (Positividade), ELOT (Expectativas), ASQ (Atribuições Causais) e PCQ-24 (Recursos Psicológicos).
        </p>
      </div>

      {/* Sequência Progressiva dos 4 Instrumentos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-orange-600 dark:text-orange-400">
            <span className="w-6 h-6 rounded-lg bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 flex items-center justify-center text-xs">P</span>
            <span>1. Positividade</span>
          </div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-white">P-Scale (Caprara et al.)</h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
            Percepção de si mesmo, da vida, das pessoas e do futuro.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-indigo-600 dark:text-indigo-400">
            <span className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-xs">E</span>
            <span>2. Expectativas</span>
          </div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-white">ELOT (Chang et al.)</h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
            Expectativas futuras de otimismo e pessimismo.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400">
            <span className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-xs">A</span>
            <span>3. Atribuições</span>
          </div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-white">ASQ (Peterson et al.)</h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
            Interpretação causal de sucessos e adversidades.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-violet-600 dark:text-violet-400">
            <span className="w-6 h-6 rounded-lg bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 flex items-center justify-center text-xs">P</span>
            <span>4. Psicológico</span>
          </div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-white">PCQ-24 (Luthans et al.)</h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
            Recursos PsyCap para mobilização e realizações.
          </p>
        </div>
      </div>

      {/* Cartão do Formulário de Identificação */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md dark:shadow-2xl space-y-8 transition-colors">
        {/* Banner de Sessão Salva */}
        {hasActiveSession && onResume && (
          <div className="p-4 rounded-2xl bg-orange-50 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-orange-700 dark:text-orange-300 uppercase tracking-wider block">
                Sessão em Andamento Detectada
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                Você possui uma aplicação do PEAP iniciada anteriormente.
              </p>
            </div>
            <button
              onClick={onResume}
              className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" /> Continuar Avaliação
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <User className="w-5 h-5 text-orange-600 dark:text-orange-400" /> Identificação do Participante
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Preencha os dados abaixo para personalizar o relatório integrado PEAP.
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-xs font-semibold">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Nome Completo <span className="text-orange-600">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Dra. Mariana Ferreira"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">E-mail Corporativo</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mariana.ferreira@empresa.com.br"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Cargo / Função</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Ex: Gerente Executiva de Riscos"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Empresa / Organização</label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="Ex: TechSolutions Brasil"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onOpenAudit}
              className="text-xs text-orange-600 dark:text-orange-400 font-semibold hover:underline flex items-center gap-1.5 cursor-pointer"
            >
              <FileCheck2 className="w-4 h-4" /> Consultar Evidências Psicométricas e Rigor Científico
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Iniciar Avaliação PEAP (4 Etapas)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
