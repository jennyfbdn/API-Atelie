import { useState, useEffect } from 'react';
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import logo from '../../assets/images/primobolan.png';

const Mensagens = () => {
    const [mensagens, setMensagens] = useState([]);
    const [novaMensagem, setNovaMensagem] = useState('');
    const [chatIniciado, setChatIniciado] = useState(false);

    useEffect(() => {
        setMensagens([]);
        setChatIniciado(false);
    }, []);

    const salvarConversaCompleta = () => {
        if (mensagens.length > 0) {
            const conversasAnteriores = JSON.parse(localStorage.getItem('conversasAnteriores') || '[]');
            const novaConversa = {
                id: Date.now(),
                data: new Date().toLocaleString(),
                mensagens: mensagens
            };
            conversasAnteriores.push(novaConversa);
            localStorage.setItem('conversasAnteriores', JSON.stringify(conversasAnteriores));
            localStorage.setItem('conversasBot', JSON.stringify(mensagens));
        }
    };

    const salvarConversa = (novasMensagens) => {
        localStorage.setItem('conversasBot', JSON.stringify(novasMensagens));
        
        const conversasAnteriores = JSON.parse(localStorage.getItem('conversasAnteriores') || '[]');
        const conversaAtual = {
            id: Date.now(),
            data: new Date().toLocaleString(),
            mensagens: novasMensagens
        };
        
        const conversasFiltradas = conversasAnteriores.filter(c => c.id !== conversaAtual.id);
        conversasFiltradas.push(conversaAtual);
        localStorage.setItem('conversasAnteriores', JSON.stringify(conversasFiltradas));
    };

    const iniciarChat = () => {
        salvarConversaCompleta();
        
        const mensagemInicial = {
            id: Date.now(),
            texto: "Olá! Sou seu assistente virtual. Como posso ajudar?",
            isBot: true,
            timestamp: new Date().toLocaleTimeString()
        };
        setMensagens([mensagemInicial]);
        setChatIniciado(true);
    };

    const enviarMensagem = () => {
        if (!novaMensagem.trim()) return;
        
        if (!chatIniciado) {
            salvarConversaCompleta();
            const mensagemInicial = {
                id: Date.now(),
                texto: "Olá! Sou seu assistente virtual. Como posso ajudar?",
                isBot: true,
                timestamp: new Date().toLocaleTimeString()
            };
            setMensagens([mensagemInicial]);
            setChatIniciado(true);
        }
        
        const mensagem = {
            id: Date.now(),
            texto: novaMensagem,
            isBot: false,   
            timestamp: new Date().toLocaleTimeString()  
        };  
        
        const novasMensagens = [...mensagens, mensagem];
        setMensagens(novasMensagens);
        salvarConversa(novasMensagens);
        setNovaMensagem('');
        setChatIniciado(true);
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100" style={{backgroundColor: '#fff6ed'}}>
                <Header
                    goTo={'/'}
                    title={'Mensagens'}
                    logo={logo}
                />
                <div className="border shadow-lg p-3 m-2">
                    <div className="border rounded p-3 mb-3" style={{height: '400px', overflowY: 'auto'}}>
                        {mensagens.map(msg => (
                            <div key={msg.id} className={`mb-2 ${msg.isBot ? 'text-start' : 'text-end'}`}>
                                <div className={`d-inline-block p-2 rounded ${msg.isBot ? 'bg-light' : 'bg-primary text-white'}`}>
                                    {msg.texto}
                                    <small className="d-block mt-1 opacity-75">{msg.timestamp}</small>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Digite sua mensagem..."
                            value={novaMensagem}
                            onChange={(e) => setNovaMensagem(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && enviarMensagem()}
                        />
                        <button 
                            className="btn btn-primary" 
                            onClick={enviarMensagem}
                        >
                            Enviar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mensagens;