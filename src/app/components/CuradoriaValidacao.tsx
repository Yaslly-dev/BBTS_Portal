import { CheckCircle } from 'lucide-react';

export default function CuradoriaValidacao() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Curadoria e Validação</h1>
        <p className="text-gray-600 mt-2">Valide e aprove os resultados das pesquisas</p>
      </div>
      <div className="bg-white rounded-lg p-12 shadow-sm border text-center">
        <CheckCircle className="mx-auto text-gray-400 mb-4" size={64} />
        <p className="text-gray-500">Em desenvolvimento</p>
      </div>
    </div>
  );
}
