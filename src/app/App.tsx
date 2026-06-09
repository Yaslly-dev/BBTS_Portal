import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Tag, Layers, Award, Building2, FileText, Search, User, Shield } from 'lucide-react';
import Painel from './components/Painel';
import CadastroCategorias from './components/CadastroCategorias';
import CadastroClassificacoes from './components/CadastroClassificacoes';
import CadastroMarcas from './components/CadastroMarcas';
import CadastrarFornecedor from './components/CadastrarFornecedor';
import InformacoesFornecedor from './components/InformacoesFornecedor';
import CadastroPesquisa from './components/CadastroPesquisa';
import ResultadoBusca from './components/ResultadoBusca';
import ItensSelecionados from './components/ItensSelecionados';
import Login from './components/Login';
import Registro from './components/Registro';
import Perfil from './components/Perfil';
import Auditoria from './components/Auditoria';
import { useState, useEffect } from 'react';

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Administrador');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsed = JSON.parse(userData);
      setUserName(parsed.nome || 'Administrador');
    }
  }, [location]);

  const menuItems = [
    { path: '/', icon: Home, label: 'Painel' },
    { path: '/cadastro-categorias', icon: Tag, label: 'Categorias' },
    { path: '/cadastro-classificacoes', icon: Layers, label: 'Classificações' },
    { path: '/cadastro-marcas', icon: Award, label: 'Marcas' },
    { path: '/informacoes-fornecedor', icon: Building2, label: 'Informações do Fornecedor' },
    { path: '/cadastro-pesquisa', icon: Search, label: 'Cadastro de Pesquisa' },
    { path: '/auditoria', icon: Shield, label: 'Auditoria' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[#003E7E] text-white flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-[#005CA9]">
          <h1 className="text-xl font-bold">Sistema SINIL</h1>
          <p className="text-xs text-blue-200 mt-1">Sistema Inteligente de Licitações</p>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto py-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-6 py-3 transition-colors ${
                  isActive
                    ? 'bg-[#FFDD00] text-[#003E7E] font-medium'
                    : 'text-blue-100 hover:bg-[#005CA9]'
                }`}
              >
                <Icon size={18} />
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[#005CA9]">
          <button
            onClick={() => navigate('/perfil')}
            className="w-full flex items-center gap-3 hover:bg-[#005CA9] p-2 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#005CA9] flex items-center justify-center">
              <User size={16} />
            </div>
            <div className="flex-1 text-xs text-left">
              <p className="font-medium">{userName}</p>
              <p className="text-blue-200">admin@sinil.gov.br</p>
            </div>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="flex items-center justify-end gap-4 px-8 py-4 bg-white border-b">
          <span className="text-sm text-green-600">● Sistema Online</span>
        </div>
        {children}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas Públicas (sem Layout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* Rotas Privadas (com Layout) */}
        <Route path="/" element={<Layout><Painel /></Layout>} />
        <Route path="/perfil" element={<Layout><Perfil /></Layout>} />
        <Route path="/cadastro-categorias" element={<Layout><CadastroCategorias /></Layout>} />
        <Route path="/cadastro-classificacoes" element={<Layout><CadastroClassificacoes /></Layout>} />
        <Route path="/cadastro-marcas" element={<Layout><CadastroMarcas /></Layout>} />
        <Route path="/informacoes-fornecedor" element={<Layout><InformacoesFornecedor /></Layout>} />
        <Route path="/cadastro-pesquisa" element={<Layout><CadastroPesquisa /></Layout>} />
        <Route path="/resultado-busca" element={<Layout><ResultadoBusca /></Layout>} />
        <Route path="/itens-selecionados" element={<Layout><ItensSelecionados /></Layout>} />
        <Route path="/auditoria" element={<Layout><Auditoria /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}