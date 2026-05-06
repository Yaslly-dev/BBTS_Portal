import { useState, useEffect } from 'react';
import { Eye, CheckCircle, XCircle, User, Clock, Filter } from 'lucide-react';

interface LogEntry {
  id: number;
  usuario: string;
  acao: string;
  tipo: 'cadastro' | 'pesquisa' | 'aprovacao' | 'cancelamento';
  data: string;
  detalhes: string;
}

interface PesquisaPendente {
  id: number;
  nome: string;
  usuario: string;
  itens: number;
  data: string;
  status: 'pendente' | 'aprovada' | 'cancelada';
}

export default function Auditoria() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [pesquisasPendentes, setPesquisasPendentes] = useState<PesquisaPendente[]>([]);
  const [filtroTipo, setFiltroTipo] = useState<string>('todos');

  useEffect(() => {
    // Carregar logs do localStorage
    const savedLogs = localStorage.getItem('auditoria_logs');
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    } else {
      // Logs de exemplo
      const initialLogs: LogEntry[] = [
        {
          id: 1,
          usuario: 'João Silva',
          acao: 'Cancelou cadastro de fornecedor',
          tipo: 'cancelamento',
          data: new Date().toISOString(),
          detalhes: 'Fornecedor: Tech Solutions Ltda'
        },
        {
          id: 2,
          usuario: 'Maria Santos',
          acao: 'Criou nova pesquisa',
          tipo: 'pesquisa',
          data: new Date(Date.now() - 3600000).toISOString(),
          detalhes: 'Pesquisa #2024-046 - Cadeiras Executivas'
        },
        {
          id: 3,
          usuario: 'Admin',
          acao: 'Aprovou pesquisa',
          tipo: 'aprovacao',
          data: new Date(Date.now() - 7200000).toISOString(),
          detalhes: 'Pesquisa #2024-045 aprovada'
        }
      ];
      setLogs(initialLogs);
      localStorage.setItem('auditoria_logs', JSON.stringify(initialLogs));
    }

    // Carregar pesquisas pendentes
    const savedPesquisas = localStorage.getItem('pesquisas_pendentes');
    if (savedPesquisas) {
      setPesquisasPendentes(JSON.parse(savedPesquisas));
    } else {
      const initialPesquisas: PesquisaPendente[] = [
        {
          id: 1,
          nome: 'Pesquisa de Notebooks - Maio/2026',
          usuario: 'João Silva',
          itens: 3,
          data: new Date().toISOString(),
          status: 'pendente'
        },
        {
          id: 2,
          nome: 'Pesquisa de Impressoras HP',
          usuario: 'Maria Santos',
          itens: 2,
          data: new Date(Date.now() - 3600000).toISOString(),
          status: 'pendente'
        }
      ];
      setPesquisasPendentes(initialPesquisas);
      localStorage.setItem('pesquisas_pendentes', JSON.stringify(initialPesquisas));
    }
  }, []);

  const aprovarPesquisa = (id: number) => {
    const pesquisa = pesquisasPendentes.find(p => p.id === id);
    if (!pesquisa) return;

    const updated = pesquisasPendentes.map(p =>
      p.id === id ? { ...p, status: 'aprovada' as const } : p
    );
    setPesquisasPendentes(updated);
    localStorage.setItem('pesquisas_pendentes', JSON.stringify(updated));

    const novoLog: LogEntry = {
      id: Date.now(),
      usuario: 'Administrador',
      acao: 'Aprovou pesquisa',
      tipo: 'aprovacao',
      data: new Date().toISOString(),
      detalhes: `Pesquisa: ${pesquisa.nome}`
    };
    const updatedLogs = [novoLog, ...logs];
    setLogs(updatedLogs);
    localStorage.setItem('auditoria_logs', JSON.stringify(updatedLogs));
  };

  const cancelarPesquisa = (id: number) => {
    const pesquisa = pesquisasPendentes.find(p => p.id === id);
    if (!pesquisa) return;

    const updated = pesquisasPendentes.map(p =>
      p.id === id ? { ...p, status: 'cancelada' as const } : p
    );
    setPesquisasPendentes(updated);
    localStorage.setItem('pesquisas_pendentes', JSON.stringify(updated));

    const novoLog: LogEntry = {
      id: Date.now(),
      usuario: 'Administrador',
      acao: 'Cancelou pesquisa',
      tipo: 'cancelamento',
      data: new Date().toISOString(),
      detalhes: `Pesquisa: ${pesquisa.nome}`
    };
    const updatedLogs = [novoLog, ...logs];
    setLogs(updatedLogs);
    localStorage.setItem('auditoria_logs', JSON.stringify(updatedLogs));
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'cadastro': return <User className="text-blue-600" size={16} />;
      case 'pesquisa': return <Eye className="text-purple-600" size={16} />;
      case 'aprovacao': return <CheckCircle className="text-green-600" size={16} />;
      case 'cancelamento': return <XCircle className="text-red-600" size={16} />;
      default: return <Clock className="text-gray-600" size={16} />;
    }
  };

  const getTipoBadgeColor = (tipo: string) => {
    switch (tipo) {
      case 'cadastro': return 'bg-blue-100 text-blue-800';
      case 'pesquisa': return 'bg-purple-100 text-purple-800';
      case 'aprovacao': return 'bg-green-100 text-green-800';
      case 'cancelamento': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const logsFiltered = filtroTipo === 'todos'
    ? logs
    : logs.filter(log => log.tipo === filtroTipo);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Auditoria e Aprovações</h1>
        <p className="text-gray-600 mt-2">Visualize atividades do sistema e gerencie aprovações</p>
      </div>

      {/* Pesquisas Pendentes */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Pesquisas Pendentes de Aprovação</h2>
        <div className="grid grid-cols-1 gap-4">
          {pesquisasPendentes.filter(p => p.status === 'pendente').map(pesquisa => (
            <div key={pesquisa.id} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{pesquisa.nome}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <User size={14} />
                      {pesquisa.usuario}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye size={14} />
                      {pesquisa.itens} itens
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {new Date(pesquisa.data).toLocaleString('pt-BR')}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => aprovarPesquisa(pesquisa.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <CheckCircle size={18} />
                    Aprovar
                  </button>
                  <button
                    onClick={() => cancelarPesquisa(pesquisa.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    <XCircle size={18} />
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          ))}
          {pesquisasPendentes.filter(p => p.status === 'pendente').length === 0 && (
            <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
              <CheckCircle className="mx-auto text-green-500 mb-4" size={48} />
              <p className="text-gray-500">Nenhuma pesquisa pendente de aprovação</p>
            </div>
          )}
        </div>
      </div>

      {/* Logs de Auditoria */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">Histórico de Atividades</h2>
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-600" />
              <select
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#003E7E] focus:border-[#003E7E]"
              >
                <option value="todos">Todos</option>
                <option value="cadastro">Cadastros</option>
                <option value="pesquisa">Pesquisas</option>
                <option value="aprovacao">Aprovações</option>
                <option value="cancelamento">Cancelamentos</option>
              </select>
            </div>
          </div>
        </div>

        <div className="divide-y max-h-[600px] overflow-y-auto">
          {logsFiltered.map(log => (
            <div key={log.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  {getTipoIcon(log.tipo)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-gray-800">{log.usuario}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTipoBadgeColor(log.tipo)}`}>
                      {log.tipo.charAt(0).toUpperCase() + log.tipo.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-1">{log.acao}</p>
                  <p className="text-sm text-gray-500">{log.detalhes}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(log.data).toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
