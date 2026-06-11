import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  onClose: () => void;
  onSave: () => void;
}

export default function ModalCadastroFornecedor({ onClose, onSave }: Props) {
  const [currentStep, setCurrentStep] = useState(1);

  // Etapa 1
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

  // Etapa 2
  const [cnae, setCnae] = useState('');
  const [cnae2, setCnae2] = useState('');
  const [naturezaJuridica, setNaturezaJuridica] = useState('');
  const [portEmpresa, setPortEmpresa] = useState('');
  const [dataAbertura, setDataAbertura] = useState('');

  const validarCNPJ = (cnpj: string) => {
    const cleaned = cnpj.replace(/\D/g, '');
    return cleaned.length === 14;
  };

  const formatarCNPJ = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 14) {
      return cleaned
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2');
    }
    return cnpj;
  };

  const formatarCEP = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 8) {
      return cleaned.replace(/^(\d{5})(\d)/, '$1-$2');
    }
    return cep;
  };

  const formatarTelefone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 11) {
      return cleaned
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4,5})(\d{4})$/, '$1-$2');
    }
    return telefone;
  };

  const handleNext = () => {
    if (!razaoSocial || !cnpj || !email) {
      alert('Preencha os campos obrigatórios (Razão Social, CNPJ, E-mail)');
      return;
    }
    if (!validarCNPJ(cnpj)) {
      alert('CNPJ inválido. Deve conter 14 dígitos.');
      return;
    }
    setCurrentStep(2);
  };

  const handleSave = () => {
    const fornecedores = JSON.parse(localStorage.getItem('fornecedores') || '[]');
    const novoFornecedor = {
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
      cnae,
      cnae2,
      naturezaJuridica,
      portEmpresa,
      dataAbertura,
      responsavel: 'Não informado',
      cargo: 'Não informado'
    };

    fornecedores.push(novoFornecedor);
    localStorage.setItem('fornecedores', JSON.stringify(fornecedores));

    // Atualizar contador
    const stats = JSON.parse(localStorage.getItem('stats') || '{"fornecedores": 0}');
    stats.fornecedores = fornecedores.length;
    localStorage.setItem('stats', JSON.stringify(stats));

    // Log de auditoria
    const logs = JSON.parse(localStorage.getItem('auditoria_logs') || '[]');
    logs.unshift({
      id: Date.now(),
      usuario: 'Administrador',
      acao: 'Cadastrou novo fornecedor',
      tipo: 'cadastro',
      data: new Date().toISOString(),
      detalhes: `Fornecedor: ${razaoSocial}`
    });
    localStorage.setItem('auditoria_logs', JSON.stringify(logs));

    onSave();
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-r from-[#003E7E] to-[#005CA9] p-6 text-white flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Novo Fornecedor</h2>
          <p className="text-blue-100 text-sm mt-1">
            Etapa {currentStep} de 2: {currentStep === 1 ? 'Informações Iniciais' : 'Registro Empresarial'}
          </p>
        </div>
        <button onClick={onClose} className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors">
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
      <div className="p-6 max-h-[60vh] overflow-y-auto">
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
                  onChange={(e) => setCnpj(formatarCNPJ(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#003E7E] focus:border-[#003E7E]"
                  placeholder="00.000.000/0001-00"
                  maxLength={18}
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
                  onChange={(e) => setTelefone(formatarTelefone(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#003E7E] focus:border-[#003E7E]"
                  placeholder="(00) 00000-0000"
                  maxLength={15}
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
                  onChange={(e) => setCep(formatarCEP(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#003E7E] focus:border-[#003E7E]"
                  placeholder="00000-000"
                  maxLength={9}
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

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CNAE 2 <span className="text-gray-500 text-xs">(Opcional)</span>
                </label>
                <input
                  type="text"
                  value={cnae2}
                  onChange={(e) => setCnae2(e.target.value)}
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
          onClick={onClose}
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
  );
}
