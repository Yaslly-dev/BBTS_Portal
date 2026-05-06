import { useState } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';

interface Item {
  id: number;
  nome: string;
  categoria: string;
  classificacao: string;
  marca: string;
  unidadeMedida: string;
}

export default function CadastroItens() {
  const [items, setItems] = useState<Item[]>([
    { id: 1, nome: 'Cadeira Executiva Giratória', categoria: 'Móveis', classificacao: 'Móveis de Escritório', marca: 'Flexform', unidadeMedida: 'UN' },
    { id: 2, nome: 'Notebook Dell Inspiron 15', categoria: 'Informática', classificacao: 'Equipamentos', marca: 'Dell', unidadeMedida: 'UN' },
    { id: 3, nome: 'Impressora HP LaserJet', categoria: 'Informática', classificacao: 'Periféricos', marca: 'HP', unidadeMedida: 'UN' },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = items.filter(item =>
    item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Cadastro de Itens</h1>
        <p className="text-gray-600 mt-2">Gerencie os itens do sistema</p>
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
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus size={20} />
              Novo Item
            </button>
          </div>
        </div>

        {showForm && (
          <div className="p-6 border-b bg-blue-50">
            <h3 className="font-semibold mb-4">Novo Item</h3>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Nome do Item" className="px-4 py-2 border rounded-lg" />
              <select className="px-4 py-2 border rounded-lg">
                <option>Selecione a Categoria</option>
                <option>Móveis</option>
                <option>Informática</option>
                <option>Material de Escritório</option>
              </select>
              <select className="px-4 py-2 border rounded-lg">
                <option>Selecione a Classificação</option>
                <option>Móveis de Escritório</option>
                <option>Equipamentos</option>
                <option>Periféricos</option>
              </select>
              <input type="text" placeholder="Marca" className="px-4 py-2 border rounded-lg" />
              <select className="px-4 py-2 border rounded-lg">
                <option>Unidade de Medida</option>
                <option>UN - Unidade</option>
                <option>CX - Caixa</option>
                <option>KG - Quilograma</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Classificação</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marca</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Un. Medida</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{item.nome}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{item.categoria}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{item.classificacao}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{item.marca}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{item.unidadeMedida}</td>
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
