import { useState } from 'react';
import { Check, X, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Produto {
  id: number;
  nome: string;
  fornecedor: string;
  marca: string;
  descricao: string;
  preco: number;
  precoOriginal?: number;
  imagem: string;
  avaliacao: number;
  vendidos: number;
  selecionado: boolean;
  frete: string;
}

const PRODUTOS_INICIAIS: Produto[] = [
  {
    id: 1,
    nome: 'Cadeira Presidente Giratória Executiva',
    fornecedor: 'Mercado Livre',
    marca: 'Flexform',
    descricao: 'Cadeira executiva com ajuste de altura, encosto reclinável, braços reguláveis, couro sintético premium',
    preco: 890.00,
    precoOriginal: 1200.00,
    imagem: 'https://images.unsplash.com/photo-1776548759644-5da0988a7874?w=300&h=200&fit=crop&auto=format',
    avaliacao: 4.5,
    vendidos: 1245,
    selecionado: true,
    frete: 'Grátis',
  },
  {
    id: 2,
    nome: 'Cadeira Executiva Premium Ergonômica',
    fornecedor: 'Amazon BR',
    marca: 'Cavaletti',
    descricao: 'Couro sintético, apoio lombar, rodízios silenciosos, suporta até 150kg',
    preco: 950.00,
    precoOriginal: 1350.00,
    imagem: 'https://images.unsplash.com/photo-1688578735352-9a6f2ac3b70a?w=300&h=200&fit=crop&auto=format',
    avaliacao: 4.8,
    vendidos: 856,
    selecionado: true,
    frete: 'Grátis',
  },
  {
    id: 3,
    nome: 'Cadeira Office Pro Ergonômica',
    fornecedor: 'Magazine Luiza',
    marca: 'Rivatti',
    descricao: 'Tecido respirável, design moderno, apoio para lombar ajustável',
    preco: 780.00,
    precoOriginal: 1100.00,
    imagem: 'https://images.unsplash.com/photo-1688578735122-f37256f1b8b0?w=300&h=200&fit=crop&auto=format',
    avaliacao: 4.6,
    vendidos: 2103,
    selecionado: true,
    frete: 'Grátis',
  },
  {
    id: 4,
    nome: 'Cadeira Diretor Luxo Premium',
    fornecedor: 'Americanas',
    marca: 'Presidente',
    descricao: 'Acabamento premium, design moderno, alta durabilidade corporativa',
    preco: 1050.00,
    precoOriginal: 1500.00,
    imagem: 'https://images.unsplash.com/photo-1614426027979-f3ababc85416?w=300&h=200&fit=crop&auto=format',
    avaliacao: 4.7,
    vendidos: 456,
    selecionado: true,
    frete: 'Grátis',
  },
  {
    id: 5,
    nome: 'Cadeira Ergonômica Plus Apoio Cervical',
    fornecedor: 'Casas Bahia',
    marca: 'Plaxmetal',
    descricao: 'Apoio cervical integrado, regulagem pneumática, base de nylon reforçado',
    preco: 1120.00,
    precoOriginal: 1580.00,
    imagem: 'https://images.unsplash.com/photo-1670946840051-828d72de64ad?w=300&h=200&fit=crop&auto=format',
    avaliacao: 4.9,
    vendidos: 320,
    selecionado: true,
    frete: 'Grátis',
  },
  {
    id: 6,
    nome: 'Cadeira Ergonômica Mesh Tela',
    fornecedor: 'Shopee Business',
    marca: 'Huanuo',
    descricao: 'Encosto em tela mesh, ventilação máxima, ajuste multidimensional de braços',
    preco: 860.00,
    precoOriginal: 1190.00,
    imagem: 'https://images.unsplash.com/photo-1688578735427-994ecdea3ea4?w=300&h=200&fit=crop&auto=format',
    avaliacao: 4.4,
    vendidos: 1876,
    selecionado: true,
    frete: 'Grátis',
  },
  {
    id: 7,
    nome: 'Cadeira Alta Gerência Couro Natural',
    fornecedor: 'OLX Business',
    marca: 'Qualiflex',
    descricao: 'Couro natural bovino, costura dupla reforçada, estrutura em aço tubular',
    preco: 1380.00,
    precoOriginal: 1900.00,
    imagem: 'https://images.unsplash.com/photo-1671063125699-2c25dac5d1c5?w=300&h=200&fit=crop&auto=format',
    avaliacao: 4.6,
    vendidos: 234,
    selecionado: true,
    frete: 'Grátis',
  },
  {
    id: 8,
    nome: 'Cadeira Ergonômica Lombar Pro',
    fornecedor: 'Tok&Stok Corporativo',
    marca: 'Frisokar',
    descricao: 'Suporte lombar dinâmico, tecido antialérgico, pistão classe 4',
    preco: 995.00,
    precoOriginal: 1320.00,
    imagem: 'https://images.unsplash.com/photo-1776548759593-6fa64c60129f?w=300&h=200&fit=crop&auto=format',
    avaliacao: 4.5,
    vendidos: 678,
    selecionado: true,
    frete: 'Grátis',
  },
  {
    id: 9,
    nome: 'Cadeira Presidente Plus 3D Arms',
    fornecedor: 'Amazon BR',
    marca: 'ThroneLux',
    descricao: 'Braços 3D ajustáveis, reclinação 135°, suporte peso até 160kg',
    preco: 1250.00,
    precoOriginal: 1750.00,
    imagem: 'https://images.unsplash.com/photo-1688578735997-32626d2babd4?w=300&h=200&fit=crop&auto=format',
    avaliacao: 4.7,
    vendidos: 412,
    selecionado: true,
    frete: 'Grátis',
  },
  {
    id: 10,
    nome: 'Cadeira Slim Design Minimalista',
    fornecedor: 'Mercado Livre',
    marca: 'Secretária',
    descricao: 'Design minimalista escandinavo, espuma D33, base cromada giratória',
    preco: 720.00,
    precoOriginal: 980.00,
    imagem: 'https://images.unsplash.com/photo-1658856039235-7745824f88db?w=300&h=200&fit=crop&auto=format',
    avaliacao: 4.3,
    vendidos: 1540,
    selecionado: true,
    frete: 'Grátis',
  },
  {
    id: 11,
    nome: 'Cadeira Giratória Basic Simples',
    fornecedor: 'Shopee',
    marca: 'Genérico',
    descricao: 'Tecido preto, estrutura metálica básica, sem ajustes ergonômicos',
    preco: 350.00,
    imagem: 'https://images.unsplash.com/photo-1713968686455-1af80cfd7b58?w=300&h=200&fit=crop&auto=format',
    avaliacao: 3.2,
    vendidos: 89,
    selecionado: false,
    frete: 'R$ 25,00',
  },
  {
    id: 12,
    nome: 'Cadeira Gamer Racing Style X9',
    fornecedor: 'Kabum',
    marca: 'ThunderX3',
    descricao: 'Estilo gamer, não recomendada para uso corporativo, design esportivo',
    preco: 1200.00,
    imagem: 'https://images.unsplash.com/photo-1770195483917-b3bb444b7a29?w=300&h=200&fit=crop&auto=format',
    avaliacao: 4.4,
    vendidos: 678,
    selecionado: false,
    frete: 'Grátis',
  },
  {
    id: 13,
    nome: 'Cadeira Fixa Visitante Empilhável',
    fornecedor: 'Mercado Livre',
    marca: 'Flexform',
    descricao: 'Sem rodízios, para visitantes, empilhável, estrutura fixa em metal',
    preco: 280.00,
    imagem: 'https://images.unsplash.com/photo-1776548759598-aa916464ed1f?w=300&h=200&fit=crop&auto=format',
    avaliacao: 4.0,
    vendidos: 1890,
    selecionado: false,
    frete: 'R$ 15,00',
  },
  {
    id: 14,
    nome: 'Cadeira Plástica Empilhável Colorida',
    fornecedor: 'Leroy Merlin',
    marca: 'Tramontina',
    descricao: 'Polipropileno resistente, uso externo ou interno, empilhável até 10',
    preco: 89.00,
    imagem: 'https://images.unsplash.com/photo-1776548759644-5da0988a7874?w=300&h=200&fit=crop&auto=format',
    avaliacao: 3.8,
    vendidos: 4500,
    selecionado: false,
    frete: 'R$ 18,00',
  },
  {
    id: 15,
    nome: 'Cadeira Gamer RGB Iluminação LED',
    fornecedor: 'Pichau',
    marca: 'DXRacer',
    descricao: 'Iluminação RGB, couro PU, não adequada para ambiente corporativo formal',
    preco: 1850.00,
    imagem: 'https://images.unsplash.com/photo-1770194993269-2521ad916c23?w=300&h=200&fit=crop&auto=format',
    avaliacao: 4.6,
    vendidos: 342,
    selecionado: false,
    frete: 'Grátis',
  },
  {
    id: 16,
    nome: 'Cadeira de Praia Dobrável',
    fornecedor: 'Shopee',
    marca: 'Mor',
    descricao: 'Uso externo/praia, alumínio, não indicada para escritório',
    preco: 78.00,
    imagem: 'https://images.unsplash.com/photo-1688578735352-9a6f2ac3b70a?w=300&h=200&fit=crop&auto=format',
    avaliacao: 3.5,
    vendidos: 6700,
    selecionado: false,
    frete: 'R$ 12,00',
  },
  {
    id: 17,
    nome: 'Cadeira de Balanço Relaxante',
    fornecedor: 'Amazon BR',
    marca: 'Artefama',
    descricao: 'Balanço com apoio para pés, não indicada para trabalho corporativo',
    preco: 650.00,
    imagem: 'https://images.unsplash.com/photo-1614426027979-f3ababc85416?w=300&h=200&fit=crop&auto=format',
    avaliacao: 4.1,
    vendidos: 230,
    selecionado: false,
    frete: 'Grátis',
  },
  {
    id: 18,
    nome: 'Cadeira Alta Bar Giratória',
    fornecedor: 'Extra',
    marca: 'Rivatti',
    descricao: 'Para balcão ou bar, não adequada para trabalho em mesa escritório',
    preco: 420.00,
    imagem: 'https://images.unsplash.com/photo-1688578735427-994ecdea3ea4?w=300&h=200&fit=crop&auto=format',
    avaliacao: 3.9,
    vendidos: 890,
    selecionado: false,
    frete: 'R$ 20,00',
  },
  {
    id: 19,
    nome: 'Banco Giratório Sem Encosto',
    fornecedor: 'Americanas',
    marca: 'Makkon',
    descricao: 'Sem encosto, uso em laboratório ou balcão, não ergonômica para trabalho longo',
    preco: 230.00,
    imagem: 'https://images.unsplash.com/photo-1670946840051-828d72de64ad?w=300&h=200&fit=crop&auto=format',
    avaliacao: 3.6,
    vendidos: 1240,
    selecionado: false,
    frete: 'R$ 15,00',
  },
  {
    id: 20,
    nome: 'Cadeira Dobrável Camping Leve',
    fornecedor: 'Decathlon',
    marca: 'Quechua',
    descricao: 'Alumínio, dobrável, compacta para transporte, não indicada escritório',
    preco: 145.00,
    imagem: 'https://images.unsplash.com/photo-1688578735122-f37256f1b8b0?w=300&h=200&fit=crop&auto=format',
    avaliacao: 4.2,
    vendidos: 3200,
    selecionado: false,
    frete: 'R$ 10,00',
  },
  {
    id: 21,
    nome: 'Cadeira Antiquário Madeira Rústica',
    fornecedor: 'OLX',
    marca: 'Artesanal',
    descricao: 'Madeira maciça, design antiquário, sem regulagens ergonômicas modernas',
    preco: 480.00,
    imagem: 'https://images.unsplash.com/photo-1671063125699-2c25dac5d1c5?w=300&h=200&fit=crop&auto=format',
    avaliacao: 3.7,
    vendidos: 56,
    selecionado: false,
    frete: 'R$ 40,00',
  },
  {
    id: 22,
    nome: 'Poltrona Reclinável Massageadora',
    fornecedor: 'Magazine Luiza',
    marca: 'Relaxmedic',
    descricao: 'Massagem vibratória, reclinável 180°, uso residencial, não corporativo',
    preco: 2400.00,
    precoOriginal: 3200.00,
    imagem: 'https://images.unsplash.com/photo-1776548759598-aa916464ed1f?w=300&h=200&fit=crop&auto=format',
    avaliacao: 4.5,
    vendidos: 178,
    selecionado: false,
    frete: 'Grátis',
  },
];

export default function ResultadoBusca() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState<Produto[]>(PRODUTOS_INICIAIS);
  const [mostrarDescartados, setMostrarDescartados] = useState(true);

  const selecionados = produtos.filter(p => p.selecionado);
  const descartados = produtos.filter(p => !p.selecionado);

  const toggleSelecao = (id: number) => {
    setProdutos(produtos.map(p => p.id === id ? { ...p, selecionado: !p.selecionado } : p));
  };

  const ProdutoCard = ({ produto }: { produto: Produto }) => (
    <div className={`bg-white rounded-lg overflow-hidden shadow-sm border-2 transition-all hover:shadow-md ${
      produto.selecionado ? 'border-green-400' : 'border-gray-200'
    }`}>
      {/* Imagem */}
      <div className="relative h-32 bg-gray-100">
        <img
          src={produto.imagem}
          alt={produto.nome}
          className="w-full h-full object-cover"
        />
        {produto.precoOriginal && (
          <div className="absolute top-1.5 left-1.5 bg-red-500 text-white px-1.5 py-0.5 rounded text-[10px] font-bold leading-none">
            -{Math.round((1 - produto.preco / produto.precoOriginal) * 100)}%
          </div>
        )}
        <button
          onClick={() => toggleSelecao(produto.id)}
          title={produto.selecionado ? 'Descartar' : 'Selecionar'}
          className={`absolute top-1.5 right-1.5 w-7 h-7 rounded-full flex items-center justify-center shadow-md transition-colors ${
            produto.selecionado
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {produto.selecionado ? <X size={13} /> : <Check size={13} />}
        </button>
      </div>

      {/* Conteúdo */}
      <div className="p-2.5">
        {/* Fornecedor + Marca */}
        <div className="flex items-center gap-1 mb-1">
          <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-[10px] rounded font-medium leading-none truncate max-w-[70px]">
            {produto.fornecedor}
          </span>
          <span className="text-[10px] text-gray-400 truncate">{produto.marca}</span>
        </div>

        {/* Título */}
        <h3 className="font-semibold text-gray-800 text-xs mb-1 line-clamp-2 leading-tight h-8">{produto.nome}</h3>

        {/* Avaliação */}
        <div className="flex items-center gap-1 mb-1.5 text-[10px] text-gray-500">
          <Star className="fill-yellow-400 text-yellow-400 flex-shrink-0" size={10} />
          <span>{produto.avaliacao}</span>
          <span className="text-gray-300">·</span>
          <span>{produto.vendidos >= 1000 ? `${(produto.vendidos / 1000).toFixed(1)}k` : produto.vendidos}+</span>
        </div>

        {/* Preço */}
        <div className="border-t pt-2">
          {produto.precoOriginal && (
            <p className="text-[10px] text-gray-400 line-through leading-none mb-0.5">
              {produto.precoOriginal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          )}
          <div className="flex items-center justify-between gap-1">
            <p className="text-sm font-bold text-green-600 leading-none">
              {produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
            <p className={`text-[10px] leading-none ${produto.frete === 'Grátis' ? 'text-green-600 font-medium' : 'text-gray-400'}`}>
              {produto.frete}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Resultado da Busca</h1>
        <p className="text-gray-600 mt-1 text-sm">Encontramos {produtos.length} opções de cadeiras executivas</p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <p className="text-xs text-gray-600 mb-1">Total Encontrado</p>
          <p className="text-2xl font-bold text-gray-800">{produtos.length}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-green-300">
          <p className="text-xs text-gray-600 mb-1">Selecionados</p>
          <p className="text-2xl font-bold text-green-600">{selecionados.length}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <p className="text-xs text-gray-600 mb-1">Descartados</p>
          <p className="text-2xl font-bold text-red-500">{descartados.length}</p>
        </div>
      </div>

      {/* Selecionados */}
      <div className="mb-6">
        <div className="bg-green-50 border-2 border-green-400 rounded-lg p-4">
          <h2 className="text-base font-semibold text-green-800 mb-3">
            ✓ Selecionados ({selecionados.length})
          </h2>
          <div className="grid grid-cols-5 gap-3">
            {selecionados.map(produto => (
              <ProdutoCard key={produto.id} produto={produto} />
            ))}
          </div>
        </div>
      </div>

      {/* Descartados */}
      <div className="mb-6">
        <button
          onClick={() => setMostrarDescartados(!mostrarDescartados)}
          className="w-full bg-gray-100 border border-gray-300 rounded-lg p-3 mb-3 flex items-center justify-between hover:bg-gray-200 transition-colors"
        >
          <h2 className="text-base font-semibold text-gray-700">
            Descartados ({descartados.length})
          </h2>
          {mostrarDescartados ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {mostrarDescartados && (
          <div className="opacity-60">
            <div className="grid grid-cols-5 gap-3">
              {descartados.map(produto => (
                <ProdutoCard key={produto.id} produto={produto} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Ações */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => navigate('/cadastro-pesquisa')}
          className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
        >
          Voltar
        </button>
        <button
          onClick={() => navigate('/itens-selecionados')}
          disabled={selecionados.length === 0}
          className={`px-5 py-2.5 rounded-lg font-semibold text-sm ${
            selecionados.length > 0
              ? 'bg-[#FFDD00] text-[#003E7E] hover:bg-[#FDB913]'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continuar com Selecionados ({selecionados.length})
        </button>
      </div>
    </div>
  );
}
