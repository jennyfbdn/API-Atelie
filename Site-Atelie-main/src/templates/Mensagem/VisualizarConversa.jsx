import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import logo from '../../assets/images/primobolan.png';

const VisualizarConversa = () => {
    const { tipo } = useParams();
    const [conversa, setConversa] = useState(null);

    useEffect(() => {
        const conversas = JSON.parse(localStorage.getItem('conversasAnteriores') || '[]');
        if (conversas.length > 0) {
            setConversa(conversas[conversas.length - 1]);
        }
    }, [tipo]);

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100" style={{backgroundColor: '#fff6ed'}}>
                <Header
                    goTo={'/home'}
                    title={'Visualizar Conversa'}
                    logo={logo}
                />
                <div className="container-fluid">
                    {conversa ? (
                        <div className="card">
                            <div className="card-header">
                                Conversa de {conversa.data}
                            </div>
                            <div className="card-body" style={{height: '400px', overflowY: 'auto'}}>
                                {conversa.mensagens.map(msg => (
                                    <div key={msg.id} className={`mb-2 ${msg.isBot ? 'text-start' : 'text-end'}`}>
                                        <div className={`d-inline-block p-2 rounded ${msg.isBot ? 'bg-light' : 'bg-primary text-white'}`}>
                                            {msg.texto}
                                            <small className="d-block mt-1 opacity-75">{msg.timestamp}</small>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p>Nenhuma conversa encontrada.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VisualizarConversa;