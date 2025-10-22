import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import logo from '../../assets/images/primobolan.png';
import AgendamentoService from "../../services/AgendamentoService";
import '../../assets/styles/tables.css';

const ServicosLista = () => {
    const [servicos, setServicos] = useState([]);
    const [agendamentos, setAgendamentos] = useState([]);
    const [busca, setBusca] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            // Carregar serviços locais
            const servicosSalvos = JSON.parse(localStorage.getItem('servicosCadastrados') || '[]');
            
            // Carregar agendamentos do mobile
            const response = await AgendamentoService.getAll();
            const agendamentosData = response.data || [];
            
            setServicos(servicosSalvos);
            setAgendamentos(agendamentosData);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
            setAgendamentos([]);
        } finally {
            setLoading(false);
        }
    };

    // Combinar serviços locais e agendamentos do mobile
    const todosServicos = [
        ...servicos,
        ...agendamentos.map(agendamento => ({
            id: `AGD-${agendamento.id}`,
            nome: agendamento.servico,
            cliente: agendamento.usuarioNome,
            descricao: agendamento.descricao,
            dataEntrada: agendamento.dataAgendamento,
            dataEntrega: agendamento.dataAgendamento,
            preco: agendamento.orcamento?.toFixed(2) || '0.00',
            status: agendamento.status,
            tipo: 'agendamento'
        }))
    ];

    const servicosFiltrados = todosServicos.filter(servico => 
        servico.nome?.toLowerCase().includes(busca.toLowerCase()) ||
        servico.id?.toString().toLowerCase().includes(busca.toLowerCase()) ||
        servico.cliente?.toLowerCase().includes(busca.toLowerCase()) ||
        servico.descricao?.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100" style={{backgroundColor: '#fff6ed'}}>
                <Header
                    goTo={'/servico'}
                    title={'Lista de Serviços'}
                    logo={logo}
                />
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h3 className="mb-0">Serviços e Agendamentos</h3>
                        <small className="text-muted">Inclui agendamentos do mobile</small>
                    </div>
                    <div>
                        <button 
                            className="btn btn-outline-secondary me-2" 
                            onClick={carregarDados}
                            disabled={loading}
                        >
                            <i className="bi bi-arrow-clockwise me-2"></i>
                            {loading ? 'Carregando...' : 'Atualizar'}
                        </button>
                        <Link to="/novo-servico" className="btn btn-primary">
                            <i className="bi bi-plus-circle me-2"></i>
                            Adicionar Serviço
                        </Link>
                    </div>
                </div>
                <div className="table-container">
                    <div className="table-search-section">
                        <form action="">
                            <div className="row m-3">
                                <div className="col-md-2 text-end">
                                    <label htmlFor="inputBuscar" className="col-form-label table-search-label">Buscar:</label>
                                </div>
                                <div className="col-md-8">
                                    <input 
                                        type="text" 
                                        className="form-control table-search-input" 
                                        id="inputBuscar"
                                        value={busca}
                                        onChange={(e) => setBusca(e.target.value)}
                                        placeholder="Buscar serviços..."
                                    />
                                </div>
                                <div className="col-md-2">
                                    <button type="button" className="btn table-search-btn">
                                        Buscar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <table className="table table-striped table-hover table-elegant table-servicos">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Cliente</th>
                                <th scope="col">Serviço</th>
                                <th scope="col">Data Entrada</th>
                                <th scope="col">Data Entrega</th>
                                <th scope="col">Preço</th>
                                <th scope="col">Abrir</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-4">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Carregando...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : servicosFiltrados.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-4 text-muted">
                                        Nenhum serviço ou agendamento encontrado
                                    </td>
                                </tr>
                            ) : (
                                servicosFiltrados.map((servico, index) => (
                                    <tr key={`${servico.tipo || 'servico'}-${servico.id || index}`}>
                                        <th scope="row">
                                            {servico.tipo === 'agendamento' && (
                                                <span className="badge bg-info me-1">Mobile</span>
                                            )}
                                            {servico.id || (index + 1)}
                                        </th>
                                        <td>{servico.cliente || servico.id || 'N/A'}</td>
                                        <td>
                                            {servico.nome}
                                            {servico.status && (
                                                <span className={`badge ms-2 ${
                                                    servico.status === 'PENDENTE' ? 'bg-warning' :
                                                    servico.status === 'CONFIRMADO' ? 'bg-success' : 'bg-secondary'
                                                }`}>
                                                    {servico.status}
                                                </span>
                                            )}
                                        </td>
                                        <td>{servico.dataEntrada || servico.dataAgendamento || 'N/A'}</td>
                                        <td>{servico.dataEntrega || servico.dataAgendamento || 'N/A'}</td>
                                        <td>R$ {servico.preco || '0.00'}</td>
                                        <td>
                                            {servico.tipo === 'agendamento' ? (
                                                <span className="text-muted">
                                                    <i className="bi bi-calendar-check me-1"></i>
                                                    Agendamento
                                                </span>
                                            ) : (
                                                <Link to={`/servico/${servico.id || (index + 1)}`} className="btn table-action-btn">
                                                    <i className="bi bi-folder2-open"></i>
                                                    Abrir
                                                </Link>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ServicosLista;