import React, { useState, useEffect } from 'react';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        nome: '',
        descricao: '',
        preco: '',
        tipo: 'ROUPA'
    });

    const API_URL = 'http://localhost:8080';

    // Buscar produtos existentes
    const fetchProducts = async () => {
        try {
            const response = await fetch(`${API_URL}/produto/findAll`);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    };

    // Adicionar novo produto
    const addProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/produto/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct)
            });

            if (response.ok) {
                alert('Produto adicionado com sucesso!');
                setNewProduct({ nome: '', descricao: '', preco: '', tipo: 'ROUPA' });
                fetchProducts(); // Atualizar lista
            }
        } catch (error) {
            console.error('Erro ao adicionar produto:', error);
            alert('Erro ao adicionar produto');
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-12">
                    <h2 className="mb-4">Administração de Produtos</h2>
                    
                    {/* Formulário para adicionar produto */}
                    <div className="card mb-4">
                        <div className="card-header">
                            <h5>Adicionar Novo Produto</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={addProduct}>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Nome do Produto</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={newProduct.nome}
                                            onChange={(e) => setNewProduct({...newProduct, nome: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Tipo</label>
                                        <select
                                            className="form-control"
                                            value={newProduct.tipo}
                                            onChange={(e) => setNewProduct({...newProduct, tipo: e.target.value})}
                                        >
                                            <option value="ROUPA">Roupa</option>
                                            <option value="ACESSORIO">Acessório</option>
                                            <option value="MATERIAL">Material</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Descrição</label>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        value={newProduct.descricao}
                                        onChange={(e) => setNewProduct({...newProduct, descricao: e.target.value})}
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Preço (R$)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="form-control"
                                        value={newProduct.preco}
                                        onChange={(e) => setNewProduct({...newProduct, preco: e.target.value})}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Adicionar Produto
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Lista de produtos */}
                    <div className="card">
                        <div className="card-header">
                            <h5>Produtos Cadastrados ({products.length})</h5>
                        </div>
                        <div className="card-body">
                            {products.length === 0 ? (
                                <p>Nenhum produto cadastrado ainda.</p>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Nome</th>
                                                <th>Tipo</th>
                                                <th>Preço</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map(product => (
                                                <tr key={product.id}>
                                                    <td>{product.id}</td>
                                                    <td>{product.nome}</td>
                                                    <td>{product.tipo}</td>
                                                    <td>R$ {product.preco}</td>
                                                    <td>
                                                        <span className="badge bg-success">
                                                            {product.statusProduto}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProducts;