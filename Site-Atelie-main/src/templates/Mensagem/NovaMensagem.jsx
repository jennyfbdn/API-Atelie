import { useState } from 'react';
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import logo from '../../assets/images/primobolan.png';
import MensagemService from '../../services/MensagemService';

const NovaMensagem = () => {
    const [formData, setFormData] = useState({
        emissorMensagem: '',
        email: '',
        telefone: '',
        texto: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        MensagemService.create(formData)
            .then(response => {
                alert('Mensagem enviada com sucesso!');
                setFormData({
                    emissorMensagem: '',
                    email: '',
                    telefone: '',
                    texto: ''
                });
            })
            .catch(error => {
                console.error("Erro ao enviar mensagem:", error);
                alert('Erro ao enviar mensagem');
            });
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100" style={{backgroundColor: '#fff6ed'}}>
                <Header
                    goTo={'/home'}
                    title={'Nova Mensagem'}
                    logo={logo}
                />
                <div className="container-fluid">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Nome</label>
                            <input
                                type="text"
                                className="form-control"
                                name="emissorMensagem"
                                value={formData.emissorMensagem}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Telefone</label>
                            <input
                                type="text"
                                className="form-control"
                                name="telefone"
                                value={formData.telefone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Mensagem</label>
                            <textarea
                                className="form-control"
                                name="texto"
                                rows="4"
                                value={formData.texto}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Enviar Mensagem</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NovaMensagem;