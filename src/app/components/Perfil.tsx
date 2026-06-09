import { useState, useEffect } from 'react';
import { User, Mail, Shield, LogOut, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Perfil() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: '', nome: '' });
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cargo, setCargo] = useState('Administrador');
  const [departamento, setDepartamento] = useState('TI');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsed = JSON.parse(userData);
      setUser(parsed);
      setNome(parsed.nome || 'Administrador');
      setEmail(parsed.email || 'admin@sinil.gov.br');
    }
  }, []);

  const handleSave = () => {
    const updatedUser = { ...user, nome, email };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    alert('Perfil atualizado com sucesso!');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Perfil do Usuário</h1>
        <p className="text-gray-600 mt-2">Gerencie suas informações pessoais e configurações</p>
      </div>

      <div className="max-w-4xl">
        <div className="grid grid-cols-3 gap-6">
          {/* Sidebar com Avatar */}
          <div className="col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[#003E7E] to-[#005CA9] rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4">
                  {nome.charAt(0).toUpperCase()}
                </div>
                <h3 className="text-xl font-bold text-gray-800">{nome}</h3>
                <p className="text-sm text-gray-600 mt-1">{email}</p>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-2">
                    <Shield size={16} className="text-[#003E7E]" />
                    <span className="font-medium">{cargo}</span>
                  </div>
                  <p className="text-xs text-gray-500">{departamento}</p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <LogOut size={18} />
                Sair
              </button>
            </div>
          </div>

          {/* Formulário */}
          <div className="col-span-2">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="bg-gradient-to-r from-[#003E7E] to-[#005CA9] p-6 text-white rounded-t-lg">
                <h2 className="text-xl font-bold">Informações Pessoais</h2>
                <p className="text-blue-100 text-sm mt-1">Atualize seus dados cadastrais</p>
              </div>

              <div className="p-6 space-y-6">
                {/* Nome Completo */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <User size={16} className="text-[#003E7E]" />
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#003E7E] focus:border-[#003E7E] outline-none"
                    placeholder="Digite seu nome completo"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Mail size={16} className="text-[#003E7E]" />
                    E-mail Institucional
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#003E7E] focus:border-[#003E7E] outline-none"
                    placeholder="email@sinil.gov.br"
                  />
                </div>

                {/* Cargo */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Shield size={16} className="text-[#003E7E]" />
                    Cargo
                  </label>
                  <select
                    value={cargo}
                    onChange={(e) => setCargo(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#003E7E] focus:border-[#003E7E] outline-none"
                  >
                    <option value="Administrador">Administrador</option>
                    <option value="Gestor">Gestor</option>
                    <option value="Operador">Operador</option>
                    <option value="Visualizador">Visualizador</option>
                  </select>
                </div>

                {/* Departamento */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    Departamento
                  </label>
                  <select
                    value={departamento}
                    onChange={(e) => setDepartamento(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#003E7E] focus:border-[#003E7E] outline-none"
                  >
                    <option value="TI">Tecnologia da Informação</option>
                    <option value="Compras">Compras e Licitações</option>
                    <option value="Financeiro">Financeiro</option>
                    <option value="RH">Recursos Humanos</option>
                    <option value="Juridico">Jurídico</option>
                  </select>
                </div>

                {/* Botão Salvar */}
                <div className="pt-4 border-t">
                  <button
                    onClick={handleSave}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#FFDD00] text-[#003E7E] font-semibold rounded-lg hover:bg-[#FDB913] transition-colors"
                  >
                    <Save size={18} />
                    Salvar Alterações
                  </button>
                </div>
              </div>
            </div>

            {/* Card de Segurança */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mt-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Segurança</h3>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <p className="font-medium text-gray-800">Alterar Senha</p>
                  <p className="text-xs text-gray-500 mt-1">Última alteração há 30 dias</p>
                </button>
                <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <p className="font-medium text-gray-800">Autenticação em Duas Etapas</p>
                  <p className="text-xs text-gray-500 mt-1">Adicione uma camada extra de segurança</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
