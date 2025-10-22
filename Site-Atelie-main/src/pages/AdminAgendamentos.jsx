import React, { useState, useEffect } from 'react';
import AgendamentoService from '../services/AgendamentoService';
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import logo from '../assets/images/primobolan.png';

const AdminAgendamentos = () => {
    const [agendamentos, setAgendamentos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        carregarAgendamentos();
    }, []);

    const carregarAgendamentos = async () => {
        try {
            const response = await AgendamentoService.getAll();
            setAgendamentos(response.data);
        } catch (error) {
            console.error('Erro ao carregar agendamentos:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatarData = (dataString) => {
        if (!dataString) return 'N/A';
        try {
            // Se a data está no formato yyyy-MM-dd
            if (dataString.includes('-')) {
                const [ano, mes, dia] = dataString.split('-');
                return `${dia}/${mes}/${ano}`;
            }
            return dataString;
        } catch (error) {
            return dataString;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'CONFIRMADO': return 'bg-success text-white';
            case 'PENDENTE': return 'bg-warning text-dark';
            case 'CANCELADO': return 'bg-danger text-white';
            default: return 'bg-secondary text-white';
        }
    };

    if (loading) {
        return (
            <div className="d-flex">
                <Sidebar />
                <div className="p-3 w-100" style={{ backgroundColor: '#fff6ed' }}>
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                        <div className="text-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Carregando...</span>
                            </div>
                            <p className="mt-2">Carregando agendamentos...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100" style={{ backgroundColor: '#fff6ed' }}>
                <Header
                    goTo={'/home'}
                    title={'Agendamentos'}
                    logo={logo}
                />
                <div className="container-fluid">
                    <div className="row mb-4">
                        <div className="col-12">
                            <h2 className="text-center mb-4 text-accent-black">Agendamentos de Serviços</h2>
                            <p className="text-center text-muted mb-4">
                                Total de agendamentos: <strong>{agendamentos.length}</strong>
                            </p>
                        </div>
                    </div>
                    
                    <div className="card shadow-sm">
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Cliente</th>
                                            <th>Data</th>
                                            <th>Horário</th>
                                            <th>Serviço</th>
                                            <th>Descrição</th>
                                            <th>Status</th>
                                            <th>Valor</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {agendamentos.map((agendamento) => (
                                            <tr key={agendamento.id}>
                                                <td>
                                                    <div>
                                                        <strong>{agendamento.usuarioNome}</strong>
                                                        <br />
                                                        <small className="text-muted">ID: {agendamento.usuarioId}</small>
                                                    </div>
                                                </td>
                                                <td>{formatarData(agendamento.dataAgendamento)}</td>
                                                <td>{agendamento.horaAgendamento}</td>
                                                <td>{agendamento.servico}</td>
                                                <td>
                                                    <span title={agendamento.descricao}>
                                                        {agendamento.descricao && agendamento.descricao.length > 30 
                                                            ? agendamento.descricao.substring(0, 30) + '...' 
                                                            : agendamento.descricao || 'Sem descrição'}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className={`badge ${getStatusColor(agendamento.status)}`}>
                                                        {agendamento.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <strong>R$ {agendamento.orcamento?.toFixed(2) || '0,00'}</strong>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {agendamentos.length === 0 && (
                                <div className="text-center py-5">
                                    <i className="bi bi-calendar-x" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
                                    <h5 className="mt-3 text-muted">Nenhum agendamento encontrado</h5>
                                    <p className="text-muted">Os agendamentos feitos no mobile aparecerão aqui.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAgendamentos;