import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import logo from '../../assets/images/primobolan.png';
import '../../assets/styles/tables.css';

const ServicosLista = () => {
    const [servicos, setServicos] = useState([]);
    const [busca, setBusca] = useState('');

    useEffect(() => {
        const servicosSalvos = JSON.parse(localStorage.getItem('servicosCadastrados') || '[]');
        setServicos(servicosSalvos);
    }, []);

    const servicosFiltrados = servicos.filter(servico => 
        servico.nome?.toLowerCase().includes(busca.toLowerCase()) ||
        servico.id?.toLowerCase().includes(busca.toLowerCase()) ||
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
                            {servicosFiltrados?.map((servico, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{servico.id}</td>
                                    <td>{servico.nome}</td>
                                    <td>{servico.dataEntrada}</td>
                                    <td>{servico.dataEntrega}</td>
                                    <td>R$ {servico.preco}</td>
                                    <td>
                                        <Link to={`/servico/${index + 1}`} className="btn table-action-btn">
                                            <i className="bi bi-folder2-open"></i>
                                            Abrir
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

export default ServicosLista;