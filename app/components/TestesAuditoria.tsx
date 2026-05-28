import { TestTube } from 'lucide-react';

export default function TestesAuditoria() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Testes de Auditoria</h1>
        <p className="text-gray-600 mt-2">Execute testes de auditoria no sistema</p>
      </div>
      <div className="bg-white rounded-lg p-12 shadow-sm border text-center">
        <TestTube className="mx-auto text-gray-400 mb-4" size={64} />
        <p className="text-gray-500">Em desenvolvimento</p>
      </div>
    </div>
  );
}
