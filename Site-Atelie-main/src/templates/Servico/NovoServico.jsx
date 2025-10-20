import { useState } from 'react';
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import logo from '../../assets/images/primobolan.png';

const NovoServico = () => {
    const [servico, setServico] = useState({
        id: '',
        nome: '',
        dataEntrega: '',
        dataEntrada: '',
        descricao: '',
        preco: '',
        informacaoRoupa: '',
        foto: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setServico(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setServico(prev => ({
            ...prev,
            foto: e.target.files[0]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const novoServico = {
            ...servico,
            id: Date.now(),
            dataCadastro: new Date().toLocaleString()
        };
        
        // Salva no localStorage
        const servicosSalvos = JSON.parse(localStorage.getItem('servicosCadastrados') || '[]');
        servicosSalvos.push(novoServico);
        localStorage.setItem('servicosCadastrados', JSON.stringify(servicosSalvos));
        
        // Limpa o formulário
        setServico({
            id: '',
            nome: '',
            dataEntrega: '',
            dataEntrada: '',
            descricao: '',
            preco: '',
            informacaoRoupa: '',
            foto: null
        });
        
        alert('Serviço cadastrado com sucesso!');
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100" style={{backgroundColor: '#fff6ed'}}>
                <Header
                    goTo={'/servico'}
                    title={'Novo Serviço'}
                    logo={logo}
                />
                <div className="border shadow-lg p-4 m-2">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-bold">Nome do Cliente:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="id"
                                    value={servico.id}
                                    onChange={handleChange}
                                    placeholder="Nome do cliente"
                                    required
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-bold">Tipo da Peça:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="nome"
                                    value={servico.nome}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-bold">Data de encomenda:</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="dataEntrada"
                                    value={servico.dataEntrada}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-bold">Data de Entrega:</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="dataEntrega"
                                    value={servico.dataEntrega}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-bold">Preço:</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="form-control"
                                    name="preco"
                                    value={servico.preco}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-bold">Foto da Roupa:</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Descrição do cliente :</label>
                            <textarea
                                className="form-control"
                                name="descricao"
                                rows="3"
                                value={servico.descricao}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Informação da Roupa:</label>
                            <textarea
                                className="form-control"
                                name="informacaoRoupa"
                                rows="3"
                                value={servico.informacaoRoupa}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <div className="d-flex justify-content-end gap-2">
                            <button type="button" className="btn btn-secondary">
                                Cancelar
                            </button>
                            <button type="submit" className="btn btn-success">
                                Cadastrar Serviço
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NovoServico;