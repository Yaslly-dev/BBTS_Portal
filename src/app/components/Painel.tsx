import { ArrowRight, TrendingUp, FileText, Clock, Users, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

function readStats() {
  const fornecedores = JSON.parse(localStorage.getItem('fornecedores') || '[]');
  const pesquisas = JSON.parse(localStorage.getItem('pesquisas') || '[]');
  const pesquisasPendentes = JSON.parse(localStorage.getItem('pesquisas_pendentes') || '[]');
  const categorias = JSON.parse(localStorage.getItem('categorias') || '[]');
  const marcas = JSON.parse(localStorage.getItem('marcas') || '[]');
  const classificacoes = JSON.parse(localStorage.getItem('classificacoes') || '[]');

  return {
    pesquisasAtivas: pesquisas.filter((p: any) => p.status === 'ativa').length || pesquisas.length,
    itensCadastrados: categorias.length + marcas.length + classificacoes.length,
    fornecedores: fornecedores.length,
    aguardandoValidacao: pesquisasPendentes.filter((p: any) => p.status === 'pendente').length,
    totalPesquisas: pesquisas.length,
  };
}

export default function Painel() {
  const [stats, setStats] = useState(readStats());

  const refresh = useCallback(() => setStats(readStats()), []);

  useEffect(() => {
    refresh();
    // Atualiza quando a aba ganha foco
    window.addEventListener('focus', refresh);
    // Atualiza quando localStorage muda em outra aba
    window.addEventListener('storage', refresh);
    // Polling leve para mudanças na mesma aba
    const interval = setInterval(refresh, 2000);
    return () => {
      window.removeEventListener('focus', refresh);
      window.removeEventListener('storage', refresh);
      clearInterval(interval);
    };
  }, [refresh]);

  const cards = [
    {
      label: 'Pesquisas Ativas',
      value: stats.pesquisasAtivas,
      icon: FileText,
      color: 'bg-[#003E7E]',
      textColor: 'text-white',
      iconColor: 'text-white',
      link: '/cadastro-pesquisa',
    },
    {
      label: 'Itens Cadastrados',
      value: stats.itensCadastrados,
      icon: Package,
      color: 'bg-[#005CA9]',
      textColor: 'text-white',
      iconColor: 'text-white',
      link: '/cadastro-categorias',
    },
    {
      label: 'Fornecedores',
      value: stats.fornecedores,
      icon: Users,
      color: 'bg-[#FFDD00]',
      textColor: 'text-[#003E7E]',
      iconColor: 'text-[#003E7E]',
      link: '/informacoes-fornecedor',
    },
    {
      label: 'Aguardando Validação',
      value: stats.aguardandoValidacao,
      icon: Clock,
      color: 'bg-green-600',
      textColor: 'text-white',
      iconColor: 'text-white',
      link: '/auditoria',
    },
  ];

  const recentActivity = [
    { title: 'Pesquisa #2026-045', subtitle: 'Cadeiras de escritório — Concluída', time: 'há 2 horas' },
    { title: 'Pesquisa #2026-044', subtitle: 'Notebooks — Em andamento', time: 'há 5 horas' },
    { title: 'Pesquisa #2026-043', subtitle: 'Impressoras — Validação pendente', time: 'há 1 dia' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Painel de Controle</h1>
        <p className="text-gray-600 mt-2">Visão geral do sistema de pesquisa de mercado</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {cards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link
              key={index}
              to={stat.link}
              className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow block"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className={`${stat.color} rounded-lg p-3`}>
                  <Icon className={stat.iconColor} size={24} />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs text-[#005CA9]">
                <TrendingUp size={12} />
                <span>Ver detalhes</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions + Activity */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Ações Rápidas</h3>
          <div className="space-y-3">
            <Link
              to="/cadastro-pesquisa"
              className="flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <span className="font-medium text-[#003E7E]">Nova Pesquisa</span>
              <ArrowRight className="text-[#003E7E]" size={20} />
            </Link>
            <Link
              to="/cadastro-categorias"
              className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
            >
              <span className="font-medium text-[#003E7E]">Cadastrar Categoria</span>
              <ArrowRight className="text-[#003E7E]" size={20} />
            </Link>
            <Link
              to="/informacoes-fornecedor"
              className="flex items-center justify-between p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <span className="font-medium text-green-900">Cadastrar Fornecedor</span>
              <ArrowRight className="text-green-600" size={20} />
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Atividades Recentes</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 pb-4 border-b last:border-0">
                <div className="w-2 h-2 bg-[#FFDD00] rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{activity.title}</p>
                  <p className="text-sm text-gray-600">{activity.subtitle}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
