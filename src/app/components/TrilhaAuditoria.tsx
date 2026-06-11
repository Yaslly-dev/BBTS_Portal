import { FileCheck } from 'lucide-react';

export default function TrilhaAuditoria() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Trilha de Auditoria</h1>
        <p className="text-gray-600 mt-2">Visualize o histórico de auditoria do sistema</p>
      </div>
      <div className="bg-white rounded-lg p-12 shadow-sm border text-center">
        <FileCheck className="mx-auto text-gray-400 mb-4" size={64} />
        <p className="text-gray-500">Em desenvolvimento</p>
      </div>
    </div>
  );
}
