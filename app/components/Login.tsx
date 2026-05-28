import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && senha) {
      localStorage.setItem('user', JSON.stringify({ email, nome: 'Administrador' }));
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#003E7E] rounded-2xl mb-4">
            <LogIn className="text-white" size={40} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Entrar ao SINIL</h1>
          <p className="text-gray-600">Informe seu dados e-mail e senha para entrar ao sistema</p>
        </div>

        {/* Card de Login */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <button className="flex-1 py-3 px-4 bg-[#003E7E] text-white rounded-lg font-medium">
              Login
            </button>
            <Link to="/registro" className="flex-1 py-3 px-4 bg-gray-100 text-gray-600 rounded-lg font-medium hover:bg-gray-200 text-center">
              Cadastrar
            </Link>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-MAIL INSTITUCIONAL *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sinil@mail.gov.br"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003E7E] focus:border-[#003E7E] outline-none"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Endereço de e-mail</p>
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SENHA *
              </label>
              <div className="relative">
                <input
                  type={mostrarSenha ? 'text' : 'password'}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Digite sua senha"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003E7E] focus:border-[#003E7E] outline-none pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="flex items-start gap-2 mt-3 text-xs text-gray-600">
                <input type="checkbox" className="mt-0.5" />
                <p>
                  Aceito os termos e condições apresentados no{' '}
                  <a href="#" className="text-[#003E7E] underline">Guia de Privacidade</a> e em {' '}
                  <a href="#" className="text-[#003E7E] underline">Termos e Condições</a>.
                </p>
              </div>
            </div>

            {/* Botão de Login */}
            <button
              type="submit"
              className="w-full py-3 bg-[#003E7E] text-white font-semibold rounded-lg hover:bg-[#005CA9] transition-colors"
            >
              Entrar
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Já possui conta?{' '}
              <Link to="/registro" className="text-[#003E7E] font-medium hover:underline">
                Criar Conta
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
