import { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Configuracao() {
  const navigate = useNavigate();
  const [nomeItem, setNomeItem] = useState('Cadeira de Escritório - Modelo Executivo');
  const [categoria, setCategoria] = useState('Móveis');
  const [quantidade, setQuantidade] = useState('50');
  const [fontesDisponiveis, setFontesDisponiveis] = useState([
    { id: 1, nome: 'Magazine Luiza', logo: '🏪', selecionada: false },
    { id: 2, nome: 'Americanas', logo: '🏬', selecionada: false },
    { id: 3, nome: 'Kabum', logo: '🖥️', selecionada: false },
    { id: 4, nome: 'Shopee', logo: '🛍️', selecionada: false },
    { id: 5, nome: 'AliExpress', logo: '📦', selecionada: false },
    { id: 6, nome: 'ComprasNet', logo: '🏛️', selecionada: false },
    { id: 7, nome: 'Portal Governamental', logo: '🇧🇷', selecionada: false },
  ]);
  const [fontesSelecionadas, setFontesSelecionadas] = useState([
    { id: 8, nome: 'Mercado Livre', logo: '💛', selecionada: true },
    { id: 9, nome: 'Amazon BR', logo: '📦', selecionada: true },
  ]);

  const totalSelecionadas = fontesSelecionadas.length;
  const minFontes = 3;

  const toggleFonte = (id: number, lista: 'disponiveis' | 'selecionadas') => {
    if (lista === 'disponiveis') {
      const fonte = fontesDisponiveis.find(f => f.id === id);
      if (fonte) {
        setFontesDisponiveis(fontesDisponiveis.filter(f => f.id !== id));
        setFontesSelecionadas([...fontesSelecionadas, { ...fonte, selecionada: true }]);
      }
    } else {
      const fonte = fontesSelecionadas.find(f => f.id === id);
      if (fonte) {
        setFontesSelecionadas(fontesSelecionadas.filter(f => f.id !== id));
        setFontesDisponiveis([...fontesDisponiveis, { ...fonte, selecionada: false }]);
      }
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-5xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Configuração e Entrada</h1>
        <p className="text-gray-600 mb-8">Defina os parâmetros e selecione as fontes de pesquisa</p>

        {/* Informações do Item */}
        <div className="bg-white rounded-lg p-6 shadow-sm border mb-6">
          <h2 className="text-lg font-semibold mb-4">Informações do Item</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Item</label>
              <input
                type="text"
                value={nomeItem}
                onChange={(e) => setNomeItem(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option>Móveis</option>
                <option>Eletrônicos</option>
                <option>Material de Escritório</option>
                <option>Informática</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantidade</label>
              <input
                type="number"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Fontes de Dados */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Fontes de Dados</h2>
            <button className="px-4 py-2 bg-[#0a2647] text-white text-sm rounded-lg hover:bg-blue-900">
              Mostrar 5 fontes
            </button>
          </div>

          {/* Selecionadas */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Selecionadas ({totalSelecionadas})</h3>
            <div className="grid grid-cols-4 gap-4">
              {fontesSelecionadas.map((fonte) => (
                <div
                  key={fonte.id}
                  className="relative border-2 border-blue-500 rounded-lg p-4 bg-blue-50 hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => toggleFonte(fonte.id, 'selecionadas')}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                  >
                    <X size={14} />
                  </button>
                  <div className="text-center">
                    <div className="text-4xl mb-2">{fonte.logo}</div>
                    <p className="text-sm font-medium text-gray-800">{fonte.nome}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Disponíveis */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Disponíveis</h3>
            <div className="grid grid-cols-4 gap-4">
              {fontesDisponiveis.map((fonte) => (
                <button
                  key={fonte.id}
                  onClick={() => toggleFonte(fonte.id, 'disponiveis')}
                  className="border-2 border-gray-300 rounded-lg p-4 hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-2">{fonte.logo}</div>
                    <p className="text-sm font-medium text-gray-800">{fonte.nome}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Alerta */}
          {totalSelecionadas < minFontes && (
            <div className="mt-6 flex items-center gap-2 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertCircle className="text-yellow-600" size={20} />
              <p className="text-sm text-yellow-800">
                Você precisa de pelo menos {minFontes} fontes ({totalSelecionadas}/{minFontes})
              </p>
            </div>
          )}

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={() => navigate('/execucao-pesquisa')}
              disabled={totalSelecionadas < minFontes}
              className={`px-6 py-2 rounded-lg ${
                totalSelecionadas >= minFontes
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Iniciar Pesquisa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
