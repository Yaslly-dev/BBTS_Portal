import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, X, Check } from 'lucide-react';

interface Item {
  id: number;
  nome: string;
  categoria: string;
  classificacao: string;
  marca: string;
  unidadeMedida: string;
  dataCriacao: string;
}

export default function CadastroItens() {
  const [items, setItems] = useState<Item[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form fields
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [classificacao, setClassificacao] = useState('');
  const [marca, setMarca] = useState('');
  const [unidadeMedida, setUnidadeMedida] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('itens_cadastrados');
    if (saved) {
      setItems(JSON.parse(saved));
    } else {
      // Dados de exemplo
      const exemplos: Item[] = [
        { id: 1, nome: 'Cadeira Executiva Giratória', categoria: 'Móveis', classificacao: 'Móveis de Escritório', marca: 'Flexform', unidadeMedida: 'UN', dataCriacao: '2026-01-15' },
        { id: 2, nome: 'Notebook Dell Inspiron 15', categoria: 'Informática', classificacao: 'Equipamentos', marca: 'Dell', unidadeMedida: 'UN', dataCriacao: '2026-02-10' },
        { id: 3, nome: 'Impressora HP LaserJet', categoria: 'Informática', classificacao: 'Periféricos', marca: 'HP', unidadeMedida: 'UN', dataCriacao: '2026-03-05' },
      ];
      setItems(exemplos);
      localStorage.setItem('itens_cadastrados', JSON.stringify(exemplos));
    }
  }, []);

  const saveItems = (list: Item[]) => {
    setItems(list);
    localStorage.setItem('itens_cadastrados', JSON.stringify(list));
  };

  const handleSubmit = () => {
    if (!nome || !categoria || !unidadeMedida) {
      alert('Preencha os campos obrigatórios: Nome, Categoria e Unidade de Medida');
      return;
    }

    if (editingId !== null) {
      // Editar item existente
      const updated = items.map(item =>
        item.id === editingId
          ? { ...item, nome, categoria, classificacao, marca, unidadeMedida }
          : item
      );
      saveItems(updated);
    } else {
      // Novo item
      const novoItem: Item = {
        id: Date.now(),
        nome,
        categoria,
        classificacao,
        marca,
        unidadeMedida,
        dataCriacao: new Date().toISOString().slice(0, 10),
      };
      saveItems([...items, novoItem]);
    }

    resetForm();
  };

  const handleEdit = (item: Item) => {
    setNome(item.nome);
    setCategoria(item.categoria);
    setClassificacao(item.classificacao);
    setMarca(item.marca);
    setUnidadeMedida(item.unidadeMedida);
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este item?')) {
      saveItems(items.filter(item => item.id !== id));
    }
  };

  const resetForm = () => {
    setNome('');
    setCategoria('');
    setClassificacao('');
    setMarca('');
    setUnidadeMedida('');
    setEditingId(null);
    setShowForm(false);
  };

  const filteredItems = items.filter(item =>
    item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.marca.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Cadastro de Itens</h1>
        <p className="text-gray-600 mt-2">Gerencie os itens disponíveis no sistema</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar itens..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#003E7E] focus:border-[#003E7E]"
                />
              </div>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-4 py-2 bg-[#003E7E] text-white rounded-lg hover:bg-[#005CA9] transition-colors"
            >
              <Plus size={20} />
              Novo Item
            </button>
          </div>
        </div>

        {showForm && (
          <div className="p-6 border-b bg-blue-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#003E7E]">
                {editingId !== null ? 'Editar Item' : 'Novo Item'}
              </h3>
              <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Item <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex: Cadeira Executiva Giratória"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#003E7E] focus:border-[#003E7E]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoria <span className="text-red-500">*</span>
                </label>
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#003E7E] focus:border-[#003E7E]"
                >
                  <option value="">Selecione a Categoria</option>
                  <option>Móveis</option>
                  <option>Informática</option>
                  <option>Material de Escritório</option>
                  <option>Eletrônicos</option>
                  <option>Equipamentos</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Classificação</label>
                <select
                  value={classificacao}
                  onChange={(e) => setClassificacao(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#003E7E] focus:border-[#003E7E]"
                >
                  <option value="">Selecione a Classificação</option>
                  <option>Móveis de Escritório</option>
                  <option>Equipamentos</option>
                  <option>Periféricos</option>
                  <option>Consumíveis</option>
                  <option>Eletrônicos</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Marca</label>
                <input
                  type="text"
                  value={marca}
                  onChange={(e) => setMarca(e.target.value)}
                  placeholder="Ex: Dell, HP, Flexform"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#003E7E] focus:border-[#003E7E]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unidade de Medida <span className="text-red-500">*</span>
                </label>
                <select
                  value={unidadeMedida}
                  onChange={(e) => setUnidadeMedida(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#003E7E] focus:border-[#003E7E]"
                >
                  <option value="">Selecione</option>
                  <option>UN - Unidade</option>
                  <option>CX - Caixa</option>
                  <option>KG - Quilograma</option>
                  <option>L - Litro</option>
                  <option>M - Metro</option>
                  <option>PC - Peça</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={resetForm}
                className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-5 py-2 bg-[#FFDD00] text-[#003E7E] font-semibold rounded-lg hover:bg-[#FDB913] transition-colors"
              >
                <Check size={18} />
                {editingId !== null ? 'Salvar Alterações' : 'Cadastrar Item'}
              </button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Classificação</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marca</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Un. Medida</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    {searchTerm ? 'Nenhum item encontrado' : 'Nenhum item cadastrado ainda'}
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{item.nome}</td>
                    <td className="px-6 py-4 text-gray-600">{item.categoria}</td>
                    <td className="px-6 py-4 text-gray-600">{item.classificacao || '—'}</td>
                    <td className="px-6 py-4 text-gray-600">{item.marca || '—'}</td>
                    <td className="px-6 py-4 text-gray-600">{item.unidadeMedida}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 text-[#003E7E] hover:bg-blue-50 rounded transition-colors"
                          title="Editar"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Excluir"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {filteredItems.length > 0 && (
          <div className="p-4 border-t bg-gray-50">
            <p className="text-sm text-gray-600 text-center">
              {filteredItems.length} {filteredItems.length === 1 ? 'item encontrado' : 'itens encontrados'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
