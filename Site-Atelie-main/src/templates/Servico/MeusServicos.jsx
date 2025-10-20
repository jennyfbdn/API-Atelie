import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import logo from '../../assets/images/primobolan.png';

const MeusServicos = () => {
    const [servicos, setServicos] = useState([]);
    const [busca, setBusca] = useState('');

    useEffect(() => {
        // Simular serviços do usuário logado
        const servicosUsuario = [
            {
                id: 1,
                nome: 'Ajuste de Vestido',
                dataEntrada: '2024-01-10',
                dataEntrega: '2024-01-20',
                status: 'Em andamento',
                preco: '50.00'
            },
            {
                id: 2,
                nome: 'Conserto de Calça',
                dataEntrada: '2024-01-08',
                dataEntrega: '2024-01-15',
                status: 'Concluído',
                preco: '30.00'
            }
        ];
        setServicos(servicosUsuario);
    }, []);

    const servicosFiltrados = servicos.filter(servico => 
        servico.nome?.toLowerCase().includes(busca.toLowerCase()) ||
        servico.status?.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100" style={{backgroundColor: '#fff6ed'}}>
                <Header
                    goTo={'/servico-usuario'}
                    title={'Meus Pedidos'}
                    logo={logo}
                />
                <div className="border shadow-lg p-2 m-2">
                    <div className='border-bottom rounded-bottom my-3'>
                        <form action="">
                            <div className="row m-3">
                                <div className="col-md-2 text-end">
                                    <label htmlFor="inputBuscar" className="col-form-label fw-bold">Buscar:</label>
                                </div>
                                <div className="col-md-8">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="inputBuscar"
                                        value={busca}
                                        onChange={(e) => setBusca(e.target.value)}
                                        placeholder="Buscar meus pedidos..."
                                    />
                                </div>
                                <div className="col-md-2">
                                    <button type="button" className="btn btn-primary shadow-lg">
                                        Buscar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <table className="table table-striped table-hover text-center">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Serviço</th>
                                <th scope="col">Data Entrada</th>
                                <th scope="col">Data Entrega</th>
                                <th scope="col">Status</th>
                                <th scope="col">Preço</th>
                                <th scope="col">Detalhes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {servicosFiltrados?.map((servico) => (
                                <tr key={servico.id}>
                                    <th scope="row">{servico.id}</th>
                                    <td>{servico.nome}</td>
                                    <td>{servico.dataEntrada}</td>
                                    <td>{servico.dataEntrega}</td>
                                    <td>
                                        <span className={`badge ${servico.status === 'Concluído' ? 'bg-success' : 'bg-warning'}`}>
                                            {servico.status}
                                        </span>
                                    </td>
                                    <td>R$ {servico.preco}</td>
                                    <td>
                                        <Link to={`/meu-servico/${servico.id}`} className="btn btn-info">
                                            <i className="bi bi-eye me-2"></i>
                                            Ver
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MeusServicos;