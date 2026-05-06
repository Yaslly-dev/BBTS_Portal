import { useState } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';

interface Categoria {
  id: number;
  nome: string;
  descricao: string;
  ativa: boolean;
}

export default function CadastroCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([
    { id: 1, nome: 'Móveis', descricao: 'Mobiliário em geral para escritório', ativa: true },
    { id: 2, nome: 'Informática', descricao: 'Equipamentos e periféricos de informática', ativa: true },
    { id: 3, nome: 'Material de Escritório', descricao: 'Materiais de consumo para escritório', ativa: false },
    { id: 4, nome: 'Eletrônicos', descricao: 'Equipamentos eletrônicos diversos', ativa: true },
  ]);

  const toggleAtiva = (id: number) => {
    setCategorias(categorias.map(cat => cat.id === id ? { ...cat, ativa: !cat.ativa } : cat));
  };
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategorias = categorias.filter(cat =>
    cat.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Cadastro de Categorias</h1>
        <p className="text-gray-600 mt-2">Gerencie as categorias de itens</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar categorias..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#003E7E] focus:border-[#003E7E]"
                />
              </div>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-4 py-2 bg-[#003E7E] text-white rounded-lg hover:bg-[#005CA9]"
            >
              <Plus size={20} />
              Nova Categoria
            </button>
          </div>
        </div>

        {showForm && (
          <div className="p-6 border-b bg-blue-50">
            <h3 className="font-semibold mb-4">Nova Categoria</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Nome da Categoria" className="w-full px-4 py-2 border rounded-lg" />
              <textarea placeholder="Descrição" rows={3} className="w-full px-4 py-2 border rounded-lg"></textarea>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                Cancelar
              </button>
              <button className="px-4 py-2 bg-[#FFDD00] text-[#003E7E] font-semibold rounded-lg hover:bg-[#FDB913]">
                Salvar
              </button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCategorias.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{cat.nome}</td>
                  <td className="px-6 py-4 text-gray-600">{cat.descricao}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleAtiva(cat.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        cat.ativa ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          cat.ativa ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
