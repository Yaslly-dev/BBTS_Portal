import { Link } from 'react-router-dom';
import { Package, Tag, Layers, Award } from 'lucide-react';

export default function CompletarCadastro() {
  const cadastros = [
    { title: 'Cadastro de Itens', description: 'Cadastre novos itens no sistema', icon: Package, link: '/cadastro-itens', color: 'bg-blue-500' },
    { title: 'Cadastro de Categorias', description: 'Gerencie categorias de produtos', icon: Tag, link: '/cadastro-categorias', color: 'bg-green-500' },
    { title: 'Cadastro de Classificações', description: 'Defina classificações para itens', icon: Layers, link: '/cadastro-classificacoes', color: 'bg-yellow-500' },
    { title: 'Cadastro de Marcas', description: 'Adicione marcas de produtos', icon: Award, link: '/cadastro-marcas', color: 'bg-purple-500' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Completar Cadastro</h1>
        <p className="text-gray-600 mt-2">Acesse as opções de cadastro do sistema</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {cadastros.map((cadastro, index) => {
          const Icon = cadastro.icon;
          return (
            <Link
              key={index}
              to={cadastro.link}
              className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className={`${cadastro.color} rounded-lg p-4`}>
                  <Icon className="text-white" size={32} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{cadastro.title}</h3>
                  <p className="text-gray-600">{cadastro.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
