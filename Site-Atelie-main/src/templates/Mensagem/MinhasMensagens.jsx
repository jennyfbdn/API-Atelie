import { useState, useEffect } from 'react';
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import logo from '../../assets/images/primobolan.png';

const MinhasMensagens = () => {
    const [mensagens, setMensagens] = useState([]);

    useEffect(() => {
        const conversas = JSON.parse(localStorage.getItem('conversasAnteriores') || '[]');
        setMensagens(conversas);
    }, []);

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100" style={{backgroundColor: '#fff6ed'}}>
                <Header
                    goTo={'/home'}
                    title={'Minhas Mensagens'}
                    logo={logo}
                />
                <div className="container-fluid">
                    {mensagens.length === 0 ? (
                        <p>Nenhuma conversa encontrada.</p>
                    ) : (
                        mensagens.map(conversa => (
                            <div key={conversa.id} className="card mb-3">
                                <div className="card-header">
                                    Conversa de {conversa.data}
                                </div>
                                <div className="card-body">
                                    {conversa.mensagens.slice(0, 3).map(msg => (
                                        <p key={msg.id} className={msg.isBot ? 'text-muted' : 'text-primary'}>
                                            {msg.isBot ? 'Bot: ' : 'Você: '}{msg.texto}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default MinhasMensagens;