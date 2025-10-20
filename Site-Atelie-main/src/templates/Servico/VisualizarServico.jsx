import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import logo from '../../assets/images/atelier-logo.svg';

const VisualizarServico = () => {
    const { id } = useParams();
    const [servico, setServico] = useState(null);

    useEffect(() => {
        const servicosSalvos = JSON.parse(localStorage.getItem('servicosCadastrados') || '[]');
        const servicoEncontrado = servicosSalvos[parseInt(id) - 1];
        setServico(servicoEncontrado);
    }, [id]);

    if (!servico) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100" style={{backgroundColor: '#fff6ed'}}>
                <Header
                    goTo={'/servicos'}
                    title={'Detalhes do Serviço'}
                    logo={logo}
                />
                <div className="border shadow-lg p-4 m-2">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Informações do Cliente</h5>
                                </div>
                                <div className="card-body">
                                    <p><strong>Cliente:</strong> {servico.id}</p>
                                    <p><strong>Serviço:</strong> {servico.nome}</p>
                                    <p><strong>Data de Entrada:</strong> {servico.dataEntrada}</p>
                                    <p><strong>Data de Entrega:</strong> {servico.dataEntrega}</p>
                                    <p><strong>Preço:</strong> R$ {servico.preco}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            {servico.foto && (
                                <div className="card">
                                    <div className="card-header">
                                        <h5>Foto da Roupa</h5>
                                    </div>
                                    <div className="card-body text-center">
                                        <img 
                                            src={URL.createObjectURL(servico.foto)} 
                                            alt="Foto da roupa" 
                                            className="img-fluid rounded"
                                            style={{maxHeight: '300px'}}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="row mt-3">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Descrição</h5>
                                </div>
                                <div className="card-body">
                                    <p>{servico.descricao}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Informações da Roupa</h5>
                                </div>
                                <div className="card-body">
                                    <p>{servico.informacaoRoupa}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-3">
                        <small className="text-muted">Cadastrado em: {servico.dataCadastro}</small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VisualizarServico;