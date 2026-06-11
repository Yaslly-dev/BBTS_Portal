import { useState, useEffect } from 'react';
import { Plus, Trash2, Search, ChevronDown, ChevronUp, Edit2, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ItemPesquisa {
  id: number;
  nome: string;
  categoria: string;
  classificacao: string;
  quantidade: number;
}

interface Pesquisa {
  id: number;
  nome: string;
  descricao: string;
  itens: ItemPesquisa[];
  status: 'rascunho' | 'ativa' | 'concluida';
  dataCriacao: string;
}

export default function CadastroPesquisa() {
  const navigate = useNavigate();
  const [pesquisas, setPesquisas] = useState<Pesquisa[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [criandoNova, setCriandoNova] = useState(false);

  // Form nova pesquisa
  const [nomePesquisa, setNomePesquisa] = useState('');
  const [descricao, setDescricao] = useState('');
  const [itens, setItens] = useState<ItemPesquisa[]>([]);

  // Edição de pesquisa existente
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [itensEdicao, setItensEdicao] = useState<{ [key: number]: ItemPesquisa[] }>({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('pesquisas') || '[]');
    if (saved.length === 0) {
      // Dados de exemplo para demonstração
      const exemplos: Pesquisa[] = [
        {
          id: 1,
          nome: 'Pesquisa de Cadeiras Executivas - Jan/2026',
          descricao: 'Levantamento de preços de cadeiras para os escritórios da sede',
          itens: [
            { id: 1, nome: 'Cadeira Presidente Giratória', categoria: 'Móveis', classificacao: 'Móveis de Escritório', quantidade: 20 },
            { id: 2, nome: 'Cadeira Executiva Ergonômica', categoria: 'Móveis', classificacao: 'Móveis de Escritório', quantidade: 50 },
          ],
          status: 'ativa',
          dataCriacao: '2026-01-10',
        },
        {
          id: 2,
          nome: 'Pesquisa de Notebooks - Fev/2026',
          descricao: 'Aquisição de notebooks para equipe de TI',
          itens: [
            { id: 3, nome: 'Notebook i7 16GB RAM', categoria: 'Informática', classificacao: 'Equipamentos', quantidade: 15 },
          ],
          status: 'concluida',
          dataCriacao: '2026-02-05',
        },
        {
          id: 3,
          nome: 'Pesquisa de Material de Escritório - Mar/2026',
          descricao: 'Reposição de material de escritório para todas as agências',
          itens: [
            { id: 4, nome: 'Resma de Papel A4', categoria: 'Material de Escritório', classificacao: 'Consumíveis', quantidade: 500 },
            { id: 5, nome: 'Caneta Esferográfica', categoria: 'Material de Escritório', classificacao: 'Consumíveis', quantidade: 1000 },
            { id: 6, nome: 'Grampeador', categoria: 'Material de Escritório', classificacao: 'Equipamentos', quantidade: 30 },
          ],
          status: 'rascunho',
          dataCriacao: '2026-03-01',
        },
      ];
      setPesquisas(exemplos);
      localStorage.setItem('pesquisas', JSON.stringify(exemplos));
    } else {
      setPesquisas(saved);
    }
  }, []);

  const savePesquisas = (list: Pesquisa[]) => {
    setPesquisas(list);
    localStorage.setItem('pesquisas', JSON.stringify(list));
  };

  const addItem = () => {
    const novoItem: ItemPesquisa = {
      id: Date.now(),
      nome: '',
      categoria: '',
      classificacao: '',
      quantidade: 1,
    };
    setItens([...itens, novoItem]);
  };

  const removeItem = (id: number) => {
    setItens(itens.filter(item => item.id !== id));
  };

  const updateItem = (id: number, field: keyof ItemPesquisa, value: string | number) => {
    setItens(itens.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const addItemToExistente = (pesquisaId: number) => {
    const novoItem: ItemPesquisa = { id: Date.now(), nome: '', categoria: '', classificacao: '', quantidade: 1 };
    setItensEdicao(prev => ({
      ...prev,
      [pesquisaId]: [...(prev[pesquisaId] || pesquisas.find(p => p.id === pesquisaId)!.itens), novoItem],
    }));
    setEditandoId(pesquisaId);
  };

  const removeItemExistente = (pesquisaId: number, itemId: number) => {
    const base = itensEdicao[pesquisaId] || pesquisas.find(p => p.id === pesquisaId)!.itens;
    setItensEdicao(prev => ({ ...prev, [pesquisaId]: base.filter(i => i.id !== itemId) }));
  };

  const updateItemExistente = (pesquisaId: number, itemId: number, field: keyof ItemPesquisa, value: string | number) => {
    const base = itensEdicao[pesquisaId] || pesquisas.find(p => p.id === pesquisaId)!.itens;
    setItensEdicao(prev => ({
      ...prev,
      [pesquisaId]: base.map(i => i.id === itemId ? { ...i, [field]: value } : i),
    }));
  };

  const salvarItensExistente = (pesquisaId: number) => {
    const novosItens = itensEdicao[pesquisaId] || [];
    const updated = pesquisas.map(p => p.id === pesquisaId ? { ...p, itens: novosItens } : p);
    savePesquisas(updated);
    setEditandoId(null);
  };

  const handleSubmit = () => {
    if (!nomePesquisa || itens.length === 0) {
      alert('Preencha o nome da pesquisa e adicione pelo menos um item');
      return;
    }
    const nova: Pesquisa = {
      id: Date.now(),
      nome: nomePesquisa,
      descricao,
      itens,
      status: 'ativa',
      dataCriacao: new Date().toISOString().slice(0, 10),
    };
    savePesquisas([...pesquisas, nova]);
    setNomePesquisa('');
    setDescricao('');
    setItens([]);
    setCriandoNova(false);
  };

  const iniciarPesquisa = (pesquisa: Pesquisa) => {
    localStorage.setItem('pesquisa_ativa', JSON.stringify(pesquisa));
    navigate('/resultado-busca');
  };

  const statusBadge = (status: Pesquisa['status']) => {
    const map = {
      ativa: 'bg-blue-100 text-blue-700',
      concluida: 'bg-green-100 text-green-700',
      rascunho: 'bg-yellow-100 text-yellow-700',
    };
    const labels = { ativa: 'Ativa', concluida: 'Concluída', rascunho: 'Rascunho' };
    return <span className={`px-2 py-0.5 rounded text-xs font-semibold ${map[status]}`}>{labels[status]}</span>;
  };

  const ItemRow = ({
    item, pesquisaId, editMode,
  }: {
    item: ItemPesquisa;
    pesquisaId?: number;
    editMode: boolean;
  }) => {
    if (!editMode) {
      return (
        <div className="flex items-center gap-4 text-sm py-1">
          <span className="flex-1 font-medium text-gray-700">{item.nome || '—'}</span>
          <span className="text-gray-500 w-32">{item.categoria || '—'}</span>
          <span className="text-gray-500 w-24">{item.classificacao || '—'}</span>
          <span className="text-gray-500 w-16 text-right">{item.quantidade}x</span>
        </div>
      );
    }

    return (
      <div className="border rounded-lg p-3 bg-gray-50 mb-2">
        <div className="flex items-start justify-between mb-2">
          <span className="text-xs text-gray-500 font-semibold">Item</span>
          <button
            onClick={() => {
              if (pesquisaId !== undefined) {
                removeItemExistente(pesquisaId, item.id);
              } else {
                removeItem(item.id);
              }
            }}
            className="p-1 text-red-500 hover:bg-red-50 rounded"
          >
            <Trash2 size={14} />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <div className="col-span-2">
            <input
              type="text"
              value={item.nome}
              onChange={e => {
                const val = e.target.value;
                if (pesquisaId !== undefined) {
                  updateItemExistente(pesquisaId, item.id, 'nome', val);
                } else {
                  updateItem(item.id, 'nome', val);
                }
              }}
              placeholder="Nome do item"
              className="w-full px-2 py-1.5 border rounded text-xs focus:ring-1 focus:ring-[#003E7E]"
            />
          </div>
          <select
            value={item.categoria}
            onChange={e => {
              const val = e.target.value;
              if (pesquisaId !== undefined) {
                updateItemExistente(pesquisaId, item.id, 'categoria', val);
              } else {
                updateItem(item.id, 'categoria', val);
              }
            }}
            className="w-full px-2 py-1.5 border rounded text-xs focus:ring-1 focus:ring-[#003E7E]"
          >
            <option value="">Categoria</option>
            <option>Móveis</option>
            <option>Informática</option>
            <option>Material de Escritório</option>
            <option>Eletrônicos</option>
          </select>
          <input
            type="number"
            value={item.quantidade}
            onChange={e => {
              const val = parseInt(e.target.value) || 1;
              if (pesquisaId !== undefined) {
                updateItemExistente(pesquisaId, item.id, 'quantidade', val);
              } else {
                updateItem(item.id, 'quantidade', val);
              }
            }}
            min="1"
            className="w-full px-2 py-1.5 border rounded text-xs focus:ring-1 focus:ring-[#003E7E]"
          />
          <div className="col-span-4">
            <select
              value={item.classificacao}
              onChange={e => {
                const val = e.target.value;
                if (pesquisaId !== undefined) {
                  updateItemExistente(pesquisaId, item.id, 'classificacao', val);
                } else {
                  updateItem(item.id, 'classificacao', val);
                }
              }}
              className="w-full px-2 py-1.5 border rounded text-xs focus:ring-1 focus:ring-[#003E7E]"
            >
              <option value="">Classificação</option>
              <option>Móveis de Escritório</option>
              <option>Equipamentos</option>
              <option>Periféricos</option>
              <option>Consumíveis</option>
            </select>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-8">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Cadastro de Pesquisa</h1>
          <p className="text-gray-600 mt-1">Gerencie suas pesquisas de mercado</p>
        </div>
        <button
          onClick={() => setCriandoNova(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#003E7E] text-white rounded-lg hover:bg-[#005CA9] transition-colors"
        >
          <Plus size={18} />
          Nova Pesquisa
        </button>
      </div>

      {/* Formulário Nova Pesquisa */}
      {criandoNova && (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-[#005CA9] mb-6">
          <h2 className="text-lg font-semibold mb-4 text-[#003E7E]">Nova Pesquisa</h2>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Pesquisa</label>
              <input
                type="text"
                value={nomePesquisa}
                onChange={e => setNomePesquisa(e.target.value)}
                placeholder="Ex: Pesquisa de Cadeiras - Abr/2026"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#003E7E]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea
                value={descricao}
                onChange={e => setDescricao(e.target.value)}
                placeholder="Descreva o objetivo desta pesquisa..."
                rows={2}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#003E7E]"
              />
            </div>
          </div>

          {/* Itens */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-700">Itens da Pesquisa</h3>
              <button
                onClick={addItem}
                className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-50 text-[#003E7E] border border-[#003E7E] rounded-lg hover:bg-blue-100"
              >
                <Plus size={14} />
                Adicionar Item
              </button>
            </div>
            {itens.length === 0 ? (
              <div className="text-center py-6 border-2 border-dashed border-gray-200 rounded-lg">
                <p className="text-sm text-gray-400">Nenhum item adicionado ainda</p>
              </div>
            ) : (
              itens.map(item => (
                <ItemRow key={item.id} item={item} editMode={true} />
              ))
            )}
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => { setCriandoNova(false); setNomePesquisa(''); setDescricao(''); setItens([]); }}
              className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              disabled={!nomePesquisa || itens.length === 0}
              className={`px-5 py-2 rounded-lg text-sm font-semibold ${
                nomePesquisa && itens.length > 0
                  ? 'bg-[#FFDD00] text-[#003E7E] hover:bg-[#FDB913]'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Salvar Pesquisa
            </button>
          </div>
        </div>
      )}

      {/* Lista de Pesquisas */}
      <div className="space-y-3">
        {pesquisas.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-lg bg-white">
            <Search className="mx-auto text-gray-300 mb-3" size={48} />
            <p className="text-gray-500">Nenhuma pesquisa cadastrada</p>
            <p className="text-sm text-gray-400 mt-1">Clique em "Nova Pesquisa" para começar</p>
          </div>
        ) : (
          pesquisas.map(pesquisa => {
            const isExpanded = expandedId === pesquisa.id;
            const isEditing = editandoId === pesquisa.id;
            const currentItens = isEditing
              ? (itensEdicao[pesquisa.id] || pesquisa.itens)
              : pesquisa.itens;

            return (
              <div key={pesquisa.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                {/* Header */}
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedId(isExpanded ? null : pesquisa.id)}
                >
                  <div className="flex items-center gap-3">
                    {pesquisa.status === 'concluida' ? (
                      <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                    ) : (
                      <Clock size={20} className="text-blue-400 flex-shrink-0" />
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-800">{pesquisa.nome}</h3>
                        {statusBadge(pesquisa.status)}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {pesquisa.itens.length} iten(s) · Criada em {new Date(pesquisa.dataCriacao).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={e => { e.stopPropagation(); iniciarPesquisa(pesquisa); }}
                      className="px-3 py-1.5 bg-[#FFDD00] text-[#003E7E] rounded-lg text-sm font-semibold hover:bg-[#FDB913] transition-colors"
                    >
                      Iniciar Pesquisa
                    </button>
                    {isExpanded ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
                  </div>
                </div>

                {/* Expanded content */}
                {isExpanded && (
                  <div className="border-t px-4 pb-4 pt-3">
                    {pesquisa.descricao && (
                      <p className="text-sm text-gray-600 mb-3">{pesquisa.descricao}</p>
                    )}

                    {/* Itens header */}
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold text-gray-700">Itens da Pesquisa</h4>
                      <button
                        onClick={() => {
                          if (!isEditing) {
                            setItensEdicao(prev => ({ ...prev, [pesquisa.id]: [...pesquisa.itens] }));
                            setEditandoId(pesquisa.id);
                          }
                          addItemToExistente(pesquisa.id);
                        }}
                        className="flex items-center gap-1 px-3 py-1 text-xs bg-blue-50 text-[#003E7E] border border-blue-200 rounded-lg hover:bg-blue-100"
                      >
                        <Plus size={12} />
                        Adicionar Item
                      </button>
                    </div>

                    {/* Itens list */}
                    {isEditing ? (
                      <>
                        {currentItens.map(item => (
                          <ItemRow key={item.id} item={item} pesquisaId={pesquisa.id} editMode={true} />
                        ))}
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={() => setEditandoId(null)}
                            className="px-4 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                          >
                            Cancelar
                          </button>
                          <button
                            onClick={() => salvarItensExistente(pesquisa.id)}
                            className="flex items-center gap-1 px-4 py-1.5 text-sm bg-[#003E7E] text-white rounded-lg hover:bg-[#005CA9]"
                          >
                            <Edit2 size={12} />
                            Salvar Alterações
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="border rounded-lg overflow-hidden">
                        <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 bg-gray-50 px-3 py-2 border-b">
                          <span className="flex-1">Nome do Item</span>
                          <span className="w-32">Categoria</span>
                          <span className="w-24">Classificação</span>
                          <span className="w-16 text-right">Qtd</span>
                        </div>
                        <div className="divide-y px-3">
                          {pesquisa.itens.map(item => (
                            <ItemRow key={item.id} item={item} editMode={false} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
