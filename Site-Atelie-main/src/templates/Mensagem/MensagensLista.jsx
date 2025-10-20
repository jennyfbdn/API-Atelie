import { useState, useEffect } from 'react';
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import logo from '../../assets/images/primobolan.png';
import MensagemService from '../../services/MensagemService';

const MensagensLista = () => {
    const [mensagens, setMensagens] = useState([]);

    useEffect(() => {
        MensagemService.findAll()
            .then(response => {
                setMensagens(response.data);
            })
            .catch(error => {
                console.error("Erro ao carregar mensagens:", error);
            });
    }, []);

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100" style={{backgroundColor: '#fff6ed'}}>
                <Header
                    goTo={'/home'}
                    title={'Lista de Mensagens'}
                    logo={logo}
                />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Emissor</th>
                                            <th>Email</th>
                                            <th>Texto</th>
                                            <th>Data</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mensagens.map(mensagem => (
                                            <tr key={mensagem.id}>
                                                <td>{mensagem.id}</td>
                                                <td>{mensagem.emissor}</td>
                                                <td>{mensagem.email}</td>
                                                <td>{mensagem.texto}</td>
                                                <td>{new Date(mensagem.dataMensagem).toLocaleDateString()}</td>
                                                <td>{mensagem.statusMensagem}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MensagensLista;