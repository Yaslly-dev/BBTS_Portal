import { useState } from 'react';
import { PlayCircle, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ExecucaoPesquisa() {
  const navigate = useNavigate();
  const [executando, setExecutando] = useState(false);
  const [progresso, setProgresso] = useState(0);

  const fontes = [
    { nome: 'Mercado Livre', status: 'concluido', resultados: 45 },
    { nome: 'Amazon BR', status: 'concluido', resultados: 38 },
    { nome: 'Magazine Luiza', status: 'executando', resultados: 0 },
    { nome: 'Americanas', status: 'pendente', resultados: 0 },
    { nome: 'Shopee', status: 'pendente', resultados: 0 },
  ];

  const iniciarPesquisa = () => {
    setExecutando(true);
    const interval = setInterval(() => {
      setProgresso((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => navigate('/resultado-busca'), 500);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Execução de Pesquisa</h1>
        <p className="text-gray-600 mt-2">Acompanhe o progresso da pesquisa de mercado</p>
      </div>

      <div className="max-w-3xl">
        <div className="bg-white rounded-lg p-6 shadow-sm border mb-6">
          <h2 className="text-lg font-semibold mb-4">Item da Pesquisa</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium text-gray-800">Cadeira de Escritório - Modelo Executivo</p>
            <p className="text-sm text-gray-600 mt-1">Categoria: Móveis | Quantidade: 50 unidades</p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Progresso da Busca</h2>
            <span className="text-2xl font-bold text-blue-600">{progresso}%</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progresso}%` }}
            ></div>
          </div>

          <div className="space-y-3">
            {fontes.map((fonte, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {fonte.status === 'concluido' && <CheckCircle className="text-green-500" size={20} />}
                  {fonte.status === 'executando' && <Clock className="text-blue-500 animate-spin" size={20} />}
                  {fonte.status === 'pendente' && <AlertCircle className="text-gray-400" size={20} />}
                  <span className="font-medium text-gray-800">{fonte.nome}</span>
                </div>
                <div className="text-sm">
                  {fonte.status === 'concluido' && (
                    <span className="text-green-600">{fonte.resultados} resultados encontrados</span>
                  )}
                  {fonte.status === 'executando' && (
                    <span className="text-blue-600">Buscando...</span>
                  )}
                  {fonte.status === 'pendente' && (
                    <span className="text-gray-400">Aguardando...</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end gap-3">
            {!executando ? (
              <button
                onClick={iniciarPesquisa}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <PlayCircle size={20} />
                Iniciar Pesquisa
              </button>
            ) : progresso === 100 ? (
              <button
                onClick={() => navigate('/resultado-busca')}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Ver Resultados
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
