import { useState } from 'react';
import { LayoutGrid, List, Download, Printer, Package, Building2, DollarSign } from 'lucide-react';

interface Produto {
  id: number;
  nome: string;
  fornecedor: string;
  marca: string;
  descricao: string;
  preco: number;
  quantidade: number;
}

export default function ItensSelecionados() {
  const [visualizacao, setVisualizacao] = useState<'cards' | 'tabela'>('cards');
  const [produtos] = useState<Produto[]>([
    { id: 1, nome: 'Cadeira Presidente Giratória', fornecedor: 'Mercado Livre', marca: 'Flexform', descricao: 'Cadeira executiva com ajuste de altura, encosto reclinável, braços reguláveis', preco: 890.00, quantidade: 15 },
    { id: 2, nome: 'Cadeira Executiva Premium', fornecedor: 'Amazon BR', marca: 'Flexform', descricao: 'Cadeira de couro sintético, apoio lombar, rodízios silenciosos', preco: 950.00, quantidade: 10 },
    { id: 3, nome: 'Cadeira Office Pro', fornecedor: 'Magazine Luiza', marca: 'Cavaletti', descricao: 'Cadeira ergonômica, tecido respirável, suporta até 120kg', preco: 780.00, quantidade: 15 },
    { id: 4, nome: 'Cadeira Diretor Luxo', fornecedor: 'Americanas', marca: 'Rivatti', descricao: 'Cadeira de escritório com acabamento premium, design moderno', preco: 1050.00, quantidade: 10 },
  ]);

  const totalItens = produtos.length;
  const totalQuantidade = produtos.reduce((sum, p) => sum + p.quantidade, 0);
  const fornecedoresUnicos = new Set(produtos.map(p => p.fornecedor)).size;
  const valorTotal = produtos.reduce((sum, p) => sum + (p.preco * p.quantidade), 0);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Itens Selecionados</h1>
        <p className="text-gray-600 mt-2">Visualize e gerencie os produtos selecionados</p>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-[#003E7E] to-[#005CA9] rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Package size={32} />
          </div>
          <p className="text-sm opacity-90 mb-1">Total de Itens</p>
          <p className="text-3xl font-bold">{totalItens}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <LayoutGrid size={32} />
          </div>
          <p className="text-sm opacity-90 mb-1">Quantidade Total</p>
          <p className="text-3xl font-bold">{totalQuantidade}</p>
        </div>
        <div className="bg-gradient-to-br from-[#005CA9] to-[#003E7E] rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Building2 size={32} />
          </div>
          <p className="text-sm opacity-90 mb-1">Fornecedores</p>
          <p className="text-3xl font-bold">{fornecedoresUnicos}</p>
        </div>
        <div className="bg-gradient-to-br from-[#FFDD00] to-[#FDB913] rounded-lg p-6 text-[#003E7E] shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <DollarSign size={32} />
          </div>
          <p className="text-sm opacity-90 mb-1">Valor Total</p>
          <p className="text-3xl font-bold">
            {valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
        </div>
      </div>

      {/* Controles */}
      <div className="bg-white rounded-lg p-4 shadow-sm border mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setVisualizacao('cards')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                visualizacao === 'cards'
                  ? 'bg-[#003E7E] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <LayoutGrid size={18} />
              Cards
            </button>
            <button
              onClick={() => setVisualizacao('tabela')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                visualizacao === 'tabela'
                  ? 'bg-[#003E7E] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <List size={18} />
              Tabela
            </button>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              <Download size={18} />
              Exportar
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              <Printer size={18} />
              Imprimir
            </button>
          </div>
        </div>
      </div>

      {/* Visualização Cards */}
      {visualizacao === 'cards' && (
        <div className="grid grid-cols-2 gap-6">
          {produtos.map((produto) => (
            <div
              key={produto.id}
              className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="bg-gradient-to-r from-[#003E7E] to-[#005CA9] p-4">
                <h3 className="text-xl font-bold text-white">{produto.nome}</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">Fornecedor</p>
                    <p className="font-semibold text-gray-800">{produto.fornecedor}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">Marca</p>
                    <p className="font-semibold text-gray-800">{produto.marca}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-xs text-gray-500 uppercase mb-1">Descrição</p>
                  <p className="text-sm text-gray-600 line-clamp-2">{produto.descricao}</p>
                </div>
                <div className="border-t pt-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Preço Unitário</p>
                    <p className="text-2xl font-bold text-green-600">
                      {produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-1">Quantidade</p>
                    <p className="text-2xl font-bold text-[#003E7E]">{produto.quantidade}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-xs text-gray-500 mb-1">Subtotal</p>
                  <p className="text-xl font-bold text-gray-800">
                    {(produto.preco * produto.quantidade).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Visualização Tabela */}
      {visualizacao === 'tabela' && (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fornecedor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço Unit.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qtd.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {produtos.map((produto) => (
                <tr key={produto.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900">{produto.nome}</p>
                      <p className="text-sm text-gray-500">{produto.marca}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{produto.fornecedor}</td>
                  <td className="px-6 py-4 max-w-md">
                    <p className="text-sm text-gray-600 line-clamp-2">{produto.descricao}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-green-600">
                    {produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-blue-600">{produto.quantidade}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">
                    {(produto.preco * produto.quantidade).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td colSpan={5} className="px-6 py-4 text-right font-bold text-gray-700">TOTAL:</td>
                <td className="px-6 py-4 whitespace-nowrap font-bold text-2xl text-green-600">
                  {valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
}
