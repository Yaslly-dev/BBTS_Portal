import { useState } from 'react';
import { X, AlertTriangle, ShieldAlert } from 'lucide-react';

interface Props {
  pesquisaNome: string;
  onClose: () => void;
  onConfirm: (justificativa: string) => void;
}

export default function ModalJustificativaCancelamentoPesquisa({ pesquisaNome, onClose, onConfirm }: Props) {
  const [justificativa, setJustificativa] = useState('');
  const [motivoPadrao, setMotivoPadrao] = useState('');

  const motivosPadroes = [
    'Mudança de prioridades institucionais',
    'Orçamento insuficiente',
    'Não houve propostas adequadas',
    'Alteração de escopo do projeto',
    'Determinação superior',
    'Erro no cadastro da pesquisa',
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

    if (justificativaFinal.length < 30) {
      alert('A justificativa deve ter pelo menos 30 caracteres');
      return;
    }

    onConfirm(justificativaFinal);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl overflow-hidden shadow-xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-700 to-red-800 p-6 text-white flex items-start justify-between">
          <div className="flex items-start gap-3">
            <ShieldAlert size={28} className="flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold">Cancelar Pesquisa</h2>
              <p className="text-red-100 text-sm mt-1">
                Você está prestes a cancelar a pesquisa:
              </p>
              <p className="text-white font-semibold mt-1">{pesquisaNome}</p>
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
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
              <div className="text-sm text-red-800">
                <p className="font-semibold mb-1">Atenção: Ação irreversível!</p>
                <p>
                  O cancelamento da pesquisa será registrado no sistema de auditoria e todos os
                  responsáveis serão notificados. Esta ação não poderá ser desfeita.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Motivo do Cancelamento <span className="text-red-500">*</span>
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
                Justificativa Detalhada <span className="text-red-500">*</span>
              </label>
              <textarea
                value={justificativa}
                onChange={(e) => setJustificativa(e.target.value)}
                placeholder="Descreva detalhadamente os motivos que levaram ao cancelamento desta pesquisa de mercado. Esta informação será anexada ao registro de auditoria..."
                rows={6}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
              />
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-gray-500">
                  Mínimo obrigatório: 30 caracteres
                </p>
                <p className={`text-xs ${justificativa.length >= 30 ? 'text-green-600' : 'text-gray-400'}`}>
                  {justificativa.length} caracteres
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Lembrete:</strong> Após o cancelamento, a pesquisa ficará marcada como
                "Cancelada" no sistema e poderá ser consultada no histórico de auditoria.
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
            disabled={!motivoPadrao || justificativa.length < 30}
            className={`px-6 py-2 font-semibold rounded-lg transition-colors ${
              motivoPadrao && justificativa.length >= 30
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Confirmar Cancelamento
          </button>
        </div>
      </div>
    </div>
  );
}
