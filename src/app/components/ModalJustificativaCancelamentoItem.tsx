import { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface Props {
  itemNome: string;
  onClose: () => void;
  onConfirm: (justificativa: string) => void;
}

export default function ModalJustificativaCancelamentoItem({ itemNome, onClose, onConfirm }: Props) {
  const [justificativa, setJustificativa] = useState('');
  const [motivoPadrao, setMotivoPadrao] = useState('');

  const motivosPadroes = [
    'Item não atende aos requisitos',
    'Preço acima do orçamento',
    'Fornecedor não habilitado',
    'Prazo de entrega inadequado',
    'Qualidade não satisfatória',
    'Outro motivo',
  ];

  const handleConfirm = () => {
    const justificativaFinal = motivoPadrao === 'Outro motivo' || !motivoPadrao
      ? justificativa
      : motivoPadrao + (justificativa ? `: ${justificativa}` : '');

    if (!justificativaFinal.trim()) {
      alert('Por favor, informe uma justificativa para o cancelamento');
      return;
    }

    onConfirm(justificativaFinal);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl overflow-hidden shadow-xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white flex items-start justify-between">
          <div className="flex items-start gap-3">
            <AlertTriangle size={24} className="flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold">Cancelar Item</h2>
              <p className="text-red-100 text-sm mt-1">
                Você está cancelando o item: <strong>{itemNome}</strong>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-amber-800">
              <strong>Atenção:</strong> O cancelamento do item será registrado no sistema de auditoria.
              É obrigatório informar uma justificativa válida.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Motivo do Cancelamento
              </label>
              <select
                value={motivoPadrao}
                onChange={(e) => setMotivoPadrao(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="">Selecione um motivo</option>
                {motivosPadroes.map((motivo) => (
                  <option key={motivo} value={motivo}>
                    {motivo}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Justificativa Detalhada {!motivoPadrao || motivoPadrao === 'Outro motivo' ? <span className="text-red-500">*</span> : '(Opcional)'}
              </label>
              <textarea
                value={justificativa}
                onChange={(e) => setJustificativa(e.target.value)}
                placeholder="Descreva os motivos que levaram ao cancelamento deste item..."
                rows={5}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                Mínimo recomendado: 20 caracteres
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-6 bg-gray-50 flex justify-between">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Voltar
          </button>

          <button
            onClick={handleConfirm}
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            Confirmar Cancelamento
          </button>
        </div>
      </div>
    </div>
  );
}
