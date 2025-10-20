import { useState } from 'react';
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import logo from '../../assets/images/primobolan.png';

const NovoProduto = () => {
    const [produto, setProduto] = useState({
        id: '',
        nome: '',
        descricao: '',
        codigoBarras: '',
        foto: null,
        preco: '',
        status: 'ativo',
        tipo: '',
        categoria: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduto(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setProduto(prev => ({
            ...prev,
            foto: e.target.files[0]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const novoProduto = {
            ...produto,
            id: Date.now(),
            dataCadastro: new Date().toLocaleString()
        };
        
        const produtosSalvos = JSON.parse(localStorage.getItem('produtosCadastrados') || '[]');
        produtosSalvos.push(novoProduto);
        localStorage.setItem('produtosCadastrados', JSON.stringify(produtosSalvos));
        
        setProduto({
            id: '',
            nome: '',
            descricao: '',
            codigoBarras: '',
            foto: null,
            preco: '',
            status: 'ativo',
            tipo: '',
            categoria: ''
        });
        
        alert('Produto cadastrado com sucesso!');
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100" style={{backgroundColor: '#fff6ed'}}>
                <Header
                    goTo={'/promocao'}
                    title={'Novo Produto'}
                    logo={logo}
                />
                <div className="border shadow-lg p-4 m-2">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-bold">Nome do Produto:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="nome"
                                    value={produto.nome}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-bold">Código de Barras:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="codigoBarras"
                                    value={produto.codigoBarras}
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
                                    value={produto.preco}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-bold">Tipo do Produto:</label>
                                <select
                                    className="form-control"
                                    name="tipo"
                                    value={produto.tipo}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Selecione o tipo</option>
                                    <option value="tecido">Tecido</option>
                                    <option value="linha">Linha</option>
                                    <option value="botao">Botão</option>
                                    <option value="ziper">Zíper</option>
                                    <option value="acessorio">Acessório</option>
                                    <option value="ferramenta">Ferramenta</option>
                                </select>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <label className="form-label fw-bold">Status:</label>
                                <select
                                    className="form-control"
                                    name="status"
                                    value={produto.status}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="ativo">Ativo</option>
                                    <option value="inativo">Inativo</option>
                                </select>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label className="form-label fw-bold">Categoria:</label>
                                <select
                                    className="form-control"
                                    name="categoria"
                                    value={produto.categoria}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Selecione a categoria</option>
                                    <option value="costura">Costura</option>
                                    <option value="bordado">Bordado</option>
                                    <option value="patchwork">Patchwork</option>
                                    <option value="quilting">Quilting</option>
                                    <option value="artesanato">Artesanato</option>
                                </select>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label className="form-label fw-bold">Foto do Produto:</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Descrição:</label>
                            <textarea
                                className="form-control"
                                name="descricao"
                                rows="3"
                                value={produto.descricao}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <div className="d-flex justify-content-end gap-2">
                            <button type="button" className="btn btn-secondary">
                                Cancelar
                            </button>
                            <button type="submit" className="btn btn-success">
                                Cadastrar Produto
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NovoProduto;