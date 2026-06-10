import { useState, useEffect } from 'react';
import { Search, Eye, FileText, Building2, Plus } from 'lucide-react';
import ModalCadastroFornecedor from './ModalCadastroFornecedor';

interface FornecedorInfo {
  id: number;
  razaoSocial: string;
  nomeFantasia?: string;
  cnpj: string;
  email: string;
  telefone: string;
  rua?: string;
  bairro?: string;
  cidade: string;
  municipio?: string;
  uf: string;
  cep?: string;
  site: string;
  inscricaoEstadual?: string;
  inscricaoMunicipal?: string;
  cnae?: string;
  naturezaJuridica?: string;
  portEmpresa?: string;
  dataAbertura?: string;
  responsavel: string;
  cargo: string;
}

export default function InformacoesFornecedor() {
  const [showCadastro, setShowCadastro] = useState(false);
  const [fornecedores, setFornecedores] = useState<FornecedorInfo[]>([
    {
      id: 1,
      razaoSocial: 'Tech Solutions Ltda',
      nomeFantasia: 'Tech Solutions',
      cnpj: '12.345.678/0001-90',
      email: 'contato@techsolutions.com',
      telefone: '(11) 3456-7890',
      rua: 'Rua das Flores, 123',
      bairro: 'Centro',
      cidade: 'São Paulo',
      municipio: 'São Paulo',
      uf: 'SP',
      cep: '01234-567',
      site: 'www.techsolutions.com',
      inscricaoEstadual: '123.456.789.012',
      inscricaoMunicipal: '987654321',
      cnae: '6201-5/00',
      naturezaJuridica: 'LTDA',
      portEmpresa: 'EPP',
      dataAbertura: '2015-03-15',
      responsavel: 'João Silva',
      cargo: 'Gerente Comercial',
    },
    {
      id: 2,
      razaoSocial: 'Office Pro Comércio',
      nomeFantasia: 'Office Pro',
      cnpj: '98.765.432/0001-10',
      email: 'vendas@officepro.com',
      telefone: '(21) 2345-6789',
      rua: 'Av. Principal, 456',
      bairro: 'Botafogo',
      cidade: 'Rio de Janeiro',
      municipio: 'Rio de Janeiro',
      uf: 'RJ',
      cep: '22234-000',
      site: 'www.officepro.com',
      inscricaoEstadual: '987.654.321.098',
      inscricaoMunicipal: '123456789',
      cnae: '4761-0/00',
      naturezaJuridica: 'LTDA',
      portEmpresa: 'ME',
      dataAbertura: '2018-07-20',
      responsavel: 'Maria Santos',
      cargo: 'Diretora de Vendas',
    },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFornecedor, setSelectedFornecedor] = useState<FornecedorInfo | null>(null);

  useEffect(() => {
    // Carregar fornecedores do localStorage
    const saved = localStorage.getItem('fornecedores');
    if (saved) {
      const parsed = JSON.parse(saved);
      setFornecedores(parsed);
    }
  }, []);

  const handleNovoFornecedor = () => {
    setShowCadastro(true);
  };

  const handleFornecedorCadastrado = () => {
    // Recarregar fornecedores após cadastro
    const saved = localStorage.getItem('fornecedores');
    if (saved) {
      setFornecedores(JSON.parse(saved));
    }
    setShowCadastro(false);
  };

  const filteredFornecedores = fornecedores.filter(f =>
    f.razaoSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.cnpj.includes(searchTerm)
  );

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Informações do Fornecedor</h1>
          <p className="text-gray-600 mt-2">Visualize informações detalhadas dos fornecedores</p>
        </div>
        <button
          onClick={handleNovoFornecedor}
          className="flex items-center gap-2 px-6 py-3 bg-[#003E7E] text-white rounded-lg hover:bg-[#005CA9]"
        >
          <Plus size={20} />
          Novo Fornecedor
        </button>
      </div>

      {showCadastro && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl overflow-hidden">
            <ModalCadastroFornecedor onClose={() => setShowCadastro(false)} onSave={handleFornecedorCadastrado} />
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-6">
        {/* Lista de Fornecedores */}
        <div className="col-span-1 bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar fornecedor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#003E7E] focus:border-[#003E7E]"
              />
            </div>
          </div>

          <div className="divide-y max-h-[600px] overflow-y-auto">
            {filteredFornecedores.map((fornecedor) => (
              <button
                key={fornecedor.id}
                onClick={() => setSelectedFornecedor(fornecedor)}
                className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                  selectedFornecedor?.id === fornecedor.id ? 'bg-blue-50 border-l-4 border-[#003E7E]' : ''
                }`}
              >
                <p className="font-semibold text-gray-800">{fornecedor.razaoSocial}</p>
                <p className="text-sm text-gray-600">{fornecedor.cnpj}</p>
                <p className="text-xs text-gray-500 mt-1">{fornecedor.cidade}/{fornecedor.uf}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Detalhes do Fornecedor */}
        <div className="col-span-2">
          {selectedFornecedor ? (
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="bg-gradient-to-r from-[#003E7E] to-[#005CA9] p-6 text-white">
                <h2 className="text-2xl font-bold">{selectedFornecedor.razaoSocial}</h2>
                <p className="text-blue-100 mt-1">CNPJ: {selectedFornecedor.cnpj}</p>
              </div>

              <div className="p-6">
                {/* Informações Básicas */}
                <div className="mb-6">
                  {selectedFornecedor.nomeFantasia && (
                    <div className="mb-3">
                      <p className="text-xs text-gray-500">Nome Fantasia</p>
                      <p className="text-lg font-semibold text-gray-800">{selectedFornecedor.nomeFantasia}</p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Contato</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-500">E-mail</p>
                        <p className="text-gray-800">{selectedFornecedor.email}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Telefone</p>
                        <p className="text-gray-800">{selectedFornecedor.telefone}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Site</p>
                        <p className="text-gray-800">{selectedFornecedor.site}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Endereço</h3>
                    <div className="space-y-3">
                      {selectedFornecedor.cep && (
                        <div>
                          <p className="text-xs text-gray-500">CEP</p>
                          <p className="text-gray-800">{selectedFornecedor.cep}</p>
                        </div>
                      )}
                      {selectedFornecedor.rua && (
                        <div>
                          <p className="text-xs text-gray-500">Rua</p>
                          <p className="text-gray-800">{selectedFornecedor.rua}</p>
                        </div>
                      )}
                      {selectedFornecedor.bairro && (
                        <div>
                          <p className="text-xs text-gray-500">Bairro</p>
                          <p className="text-gray-800">{selectedFornecedor.bairro}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-xs text-gray-500">Cidade/Município</p>
                        <p className="text-gray-800">{selectedFornecedor.cidade}{selectedFornecedor.municipio && selectedFornecedor.municipio !== selectedFornecedor.cidade ? ` / ${selectedFornecedor.municipio}` : ''}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">UF</p>
                        <p className="text-gray-800">{selectedFornecedor.uf}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Registro Empresarial</h3>
                    <div className="space-y-3">
                      {selectedFornecedor.inscricaoEstadual && (
                        <div>
                          <p className="text-xs text-gray-500">Inscrição Estadual</p>
                          <p className="text-gray-800">{selectedFornecedor.inscricaoEstadual}</p>
                        </div>
                      )}
                      {selectedFornecedor.inscricaoMunicipal && (
                        <div>
                          <p className="text-xs text-gray-500">Inscrição Municipal</p>
                          <p className="text-gray-800">{selectedFornecedor.inscricaoMunicipal}</p>
                        </div>
                      )}
                      {selectedFornecedor.cnae && (
                        <div>
                          <p className="text-xs text-gray-500">CNAE</p>
                          <p className="text-gray-800">{selectedFornecedor.cnae}</p>
                        </div>
                      )}
                      {selectedFornecedor.naturezaJuridica && (
                        <div>
                          <p className="text-xs text-gray-500">Natureza Jurídica</p>
                          <p className="text-gray-800">{selectedFornecedor.naturezaJuridica}</p>
                        </div>
                      )}
                      {selectedFornecedor.portEmpresa && (
                        <div>
                          <p className="text-xs text-gray-500">Porte</p>
                          <p className="text-gray-800">{selectedFornecedor.portEmpresa}</p>
                        </div>
                      )}
                      {selectedFornecedor.dataAbertura && (
                        <div>
                          <p className="text-xs text-gray-500">Data de Abertura</p>
                          <p className="text-gray-800">{new Date(selectedFornecedor.dataAbertura).toLocaleDateString('pt-BR')}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Responsável</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#003E7E] rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {selectedFornecedor.responsavel.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{selectedFornecedor.responsavel}</p>
                      <p className="text-sm text-gray-600">{selectedFornecedor.cargo}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6 mt-6">
                  <div className="flex gap-3">
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#003E7E] text-white rounded-lg hover:bg-[#005CA9]">
                      <Eye size={18} />
                      Ver Histórico
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <FileText size={18} />
                      Gerar Relatório
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
              <Building2 className="mx-auto text-gray-300 mb-4" size={64} />
              <p className="text-gray-500">Selecione um fornecedor para ver os detalhes</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
