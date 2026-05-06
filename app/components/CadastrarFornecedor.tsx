import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Fornecedor {
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
  site?: string;
  inscricaoEstadual?: string;
  inscricaoMunicipal?: string;
  cnae?: string;
  naturezaJuridica?: string;
  portEmpresa?: string;
  dataAbertura?: string;
}

export default function CadastrarFornecedor() {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([
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
      cep: '01234-567'
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
      cep: '22234-000'
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Formulário - Etapa 1
  const [razaoSocial, setRazaoSocial] = useState('');
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [uf, setUf] = useState('');
  const [cep, setCep] = useState('');
  const [site, setSite] = useState('');

  // Formulário - Etapa 2 (Registro Empresarial)
  const [inscricaoEstadual, setInscricaoEstadual] = useState('');
  const [inscricaoMunicipal, setInscricaoMunicipal] = useState('');
  const [cnae, setCnae] = useState('');
  const [naturezaJuridica, setNaturezaJuridica] = useState('');
  const [portEmpresa, setPortEmpresa] = useState('');
  const [dataAbertura, setDataAbertura] = useState('');

  const filteredFornecedores = fornecedores.filter(f =>
    f.razaoSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.cnpj.includes(searchTerm)
  );

  const openModal = () => {
    setShowModal(true);
    setCurrentStep(1);
    resetForm();
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setRazaoSocial('');
    setNomeFantasia('');
    setCnpj('');
    setEmail('');
    setTelefone('');
    setRua('');
    setBairro('');
    setCidade('');
    setMunicipio('');
    setUf('');
    setCep('');
    setSite('');
    setInscricaoEstadual('');
    setInscricaoMunicipal('');
    setCnae('');
    setNaturezaJuridica('');
    setPortEmpresa('');
    setDataAbertura('');
  };

  const handleNext = () => {
    if (!razaoSocial || !cnpj || !email) {
      alert('Preencha os campos obrigatórios');
      return;
    }
    setCurrentStep(2);
  };

  const handleSave = () => {
    const novoFornecedor: Fornecedor = {
      id: Date.now(),
      razaoSocial,
      nomeFantasia,
      cnpj,
      email,
      telefone,
      rua,
      bairro,
      cidade,
      municipio,
      uf,
      cep,
      site,
      inscricaoEstadual,
      inscricaoMunicipal,
      cnae,
      naturezaJuridica,
      portEmpresa,
      dataAbertura,
    };
    setFornecedores([...fornecedores, novoFornecedor]);
    closeModal();
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Cadastro de Fornecedores</h1>
        <p className="text-gray-600 mt-2">Gerencie os fornecedores do sistema</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar fornecedores..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#003E7E] focus:border-[#003E7E]"
                />
              </div>
            </div>
            <button
              onClick={openModal}
              className="flex items-center gap-2 px-4 py-2 bg-[#003E7E] text-white rounded-lg hover:bg-[#005CA9]"
            >
              <Plus size={20} />
              Novo Fornecedor
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Razão Social</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CNPJ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">E-mail</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cidade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredFornecedores.map((f) => (
                <tr key={f.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{f.razaoSocial}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{f.cnpj}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{f.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{f.telefone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{f.cidade}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded">
                        <Eye size={16} />
                      </button>
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

      {/* Modal Cadastro */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#003E7E] to-[#005CA9] p-6 text-white flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Novo Fornecedor</h2>
                <p className="text-blue-100 text-sm mt-1">
                  Etapa {currentStep} de 2: {currentStep === 1 ? 'Informações Iniciais' : 'Registro Empresarial'}
                </p>
              </div>
              <button onClick={closeModal} className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="h-2 bg-gray-200">
              <div
                className="h-full bg-[#FFDD00] transition-all duration-300"
                style={{ width: `${(currentStep / 2) * 100}%` }}
              />
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6">
              {currentStep === 1 ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Informações Iniciais</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Razão Social <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={razaoSocial}
                        onChange={(e) => setRazaoSocial(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#003E7E] focus:border-[#003E7E]"
                        placeholder="Ex: Tech Solutions Ltda"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nome Fantasia</label>
                      <input
                        type="text"
                        value={nomeFantasia}
                        onChange={(e) => setNomeFantasia(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#003E7E] focus:border-[#003E7E]"
                        placeholder="Ex: Tech Solutions"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CNPJ <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={cnpj}
                        onChange={(e) => setCnpj(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#003E7E] focus:border-[#003E7E]"
                        placeholder="00.000.000/0001-00"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        E-mail <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#003E7E] focus:border-[#003E7E]"
                        placeholder="contato@empresa.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                      <input
                        type="text"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#003E7E] focus:border-[#003E7E]"
                        placeholder="(00) 0000-0000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Site</label>
                      <input
                        type="text"
                        value={site}
                        onChange={(e) => setSite(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#003E7E] focus:border-[#003E7E]"
                        placeholder="www.empresa.com"
                      />
                    </div>
                  </div>

                  <h4 className="text-md font-semibold text-gray-800 mt-6 mb-4">Endereço</h4>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CEP</label>
                      <input
                        type="text"
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#003E7E] focus:border-[#003E7E]"
                        placeholder="00000-000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Rua</label>
                      <input
                        type="text"
                        value={rua}
                        onChange={(e) => setRua(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#003E7E] focus:border-[#003E7E]"
                        placeholder="Rua, Avenida, etc"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bairro</label>
                      <input
                        type="text"
                        value={bairro}
                        onChange={(e) => setBairro(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#003E7E] focus:border-[#003E7E]"
                        placeholder="Nome do bairro"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cidade</label>
                      <input
                        type="text"
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#003E7E] focus:border-[#003E7E]"
                        placeholder="Nome da cidade"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Município</label>
                      <input
                        type="text"
                        value={municipio}
                        onChange={(e) => setMunicipio(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#003E7E] focus:border-[#003E7E]"
                        placeholder="Nome do município"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">UF</label>
                      <select
                        value={uf}
                        onChange={(e) => setUf(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#003E7E] focus:border-[#003E7E]"
                      >
                        <option value="">Selecione</option>
                        <option value="SP">SP</option>
                        <option value="RJ">RJ</option>
                        <option value="MG">MG</option>
                        <option value="RS">RS</option>
                        <option value="PR">PR</option>
                        <option value="SC">SC</option>
                        <option value="BA">BA</option>
                        <option value="PE">PE</option>
                        <option value="CE">CE</option>
                        <option value="DF">DF</option>
                      </select>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Registro Empresarial</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Inscrição Estadual</label>
                      <input
                        type="text"
                        value={inscricaoEstadual}
                        onChange={(e) => setInscricaoEstadual(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#003E7E] focus:border-[#003E7E]"
                        placeholder="000.000.000.000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Inscrição Municipal</label>
                      <input
                        type="text"
                        value={inscricaoMunicipal}
                        onChange={(e) => setInscricaoMunicipal(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#003E7E] focus:border-[#003E7E]"
                        placeholder="000000000"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">CNAE</label>
                      <input
                        type="text"
                        value={cnae}
                        onChange={(e) => setCnae(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#003E7E] focus:border-[#003E7E]"
                        placeholder="0000-0/00"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Natureza Jurídica</label>
                      <select
                        value={naturezaJuridica}
                        onChange={(e) => setNaturezaJuridica(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#003E7E] focus:border-[#003E7E]"
                      >
                        <option value="">Selecione</option>
                        <option value="LTDA">Sociedade Limitada (LTDA)</option>
                        <option value="SA">Sociedade Anônima (S/A)</option>
                        <option value="MEI">Microempreendedor Individual (MEI)</option>
                        <option value="EIRELI">Empresa Individual (EIRELI)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Porte da Empresa</label>
                      <select
                        value={portEmpresa}
                        onChange={(e) => setPortEmpresa(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#003E7E] focus:border-[#003E7E]"
                      >
                        <option value="">Selecione</option>
                        <option value="MEI">Microempreendedor Individual</option>
                        <option value="ME">Microempresa</option>
                        <option value="EPP">Empresa de Pequeno Porte</option>
                        <option value="MEDIA">Média Empresa</option>
                        <option value="GRANDE">Grande Empresa</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Data de Abertura</label>
                      <input
                        type="date"
                        value={dataAbertura}
                        onChange={(e) => setDataAbertura(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#003E7E] focus:border-[#003E7E]"
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                    <p className="text-sm text-blue-800">
                      <strong>Observação:</strong> Os campos de registro empresarial são opcionais, mas recomendados para um cadastro completo.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t p-6 bg-gray-50 flex justify-between">
              <button
                onClick={closeModal}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                Cancelar
              </button>

              <div className="flex gap-3">
                {currentStep === 2 && (
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                  >
                    <ChevronLeft size={18} />
                    Voltar
                  </button>
                )}

                {currentStep === 1 ? (
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-6 py-2 bg-[#FFDD00] text-[#003E7E] font-semibold rounded-lg hover:bg-[#FDB913]"
                  >
                    Próximo
                    <ChevronRight size={18} />
                  </button>
                ) : (
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-[#FFDD00] text-[#003E7E] font-semibold rounded-lg hover:bg-[#FDB913]"
                  >
                    Salvar Fornecedor
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
