import React, { useState, useEffect } from 'react';
import EncomendaService from '../services/EncomendaService';

const AdminEncomendas = () => {
    const [encomendas, setEncomendas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        carregarEncomendas();
    }, []);

    const carregarEncomendas = async () => {
        try {
            const response = await EncomendaService.getAll();
            setEncomendas(response.data);
        } catch (error) {
            console.error('Erro ao carregar encomendas:', error);
        } finally {
            setLoading(false);
        }
    };

    const marcarComoPronta = async (id) => {
        try {
            await EncomendaService.marcarComoPronta(id);
            carregarEncomendas();
        } catch (error) {
            console.error('Erro ao marcar encomenda como pronta:', error);
        }
    };

    const formatarData = (dataString) => {
        return new Date(dataString).toLocaleDateString('pt-BR');
    };

    if (loading) return <div>Carregando...</div>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Encomendas</h1>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produto</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantidade</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Preço</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {encomendas.map((encomenda) => (
                            <tr key={encomenda.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {encomenda.usuarioNome}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {encomenda.produto}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {encomenda.quantidade}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    R$ {encomenda.preco?.toFixed(2) || '0,00'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {formatarData(encomenda.dataEncomenda)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                        encomenda.status === 'PRONTA' ? 'bg-green-100 text-green-800' :
                                        encomenda.status === 'EM_PRODUCAO' ? 'bg-blue-100 text-blue-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {encomenda.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    {encomenda.status !== 'PRONTA' && (
                                        <button
                                            onClick={() => marcarComoPronta(encomenda.id)}
                                            className="text-green-600 hover:text-green-900"
                                        >
                                            Marcar como Pronta
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminEncomendas;