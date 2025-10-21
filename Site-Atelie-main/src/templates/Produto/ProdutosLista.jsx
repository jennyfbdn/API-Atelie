import { Link, useNavigate } from "react-router-dom"
import Header from "../../components/Header/Header";
import logo from '../../assets/images/logo.png';
import imgProfile from '../../assets/images/logo.png';
import Sidebar from "../../components/Sidebar/Sidebar";
import { useEffect, useRef, useState } from "react";
import ProdutoService from "../../services/ProdutoService";
import '../../assets/styles/theme.css';
import '../../assets/styles/tables.css';

const ProdutosLista = () => {
    const navigate = useNavigate();
    const _dbRecords = useRef(true);
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const abrirProduto = (id) => {
        navigate(`/editar-produto/${id}`);
    }

    const carregarProdutos = async () => {
        try {
            setLoading(true);
            setError(null);
            console.log('Buscando produtos da API...');
            
            const response = await fetch('http://localhost:8080/produto/findAll');
            console.log('Status da resposta:', response.status);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const produtos = await response.json();
            console.log('Produtos recebidos:', produtos);
            setProdutos(produtos || []);
            setLoading(false);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            setError(`Erro ao carregar produtos: ${error.message}`);
            setProdutos([]);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (_dbRecords.current) {
            carregarProdutos();
        }
        return () => {
            _dbRecords.current = false;
        };
    }, []);

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1" style={{backgroundColor: 'var(--background-color)', minHeight: '100vh'}}>
                <Header
                    goTo={'/home'}
                    title={'Gerenciar Produtos'}
                    logo={logo}
                    actions={[
                        <button key="refresh" onClick={carregarProdutos} className="btn btn-outline-primary btn-sm" disabled={loading}>
                            <i className={`bi bi-arrow-clockwise me-2 ${loading ? 'loading-spinner' : ''}`}></i>
                            {loading ? 'Carregando...' : 'Atualizar'}
                        </button>,
                        <Link key="new" to="/produto-novo" className="btn btn-primary btn-sm">
                            <i className="bi bi-plus-circle me-2"></i>
                            Novo Produto
                        </Link>
                    ]}
                />
                
                <div className="container-fluid px-4">
                    <div className="card card-elevated">
                        <div className="card-body p-0">
                            {/* Header do Card */}
                            <div className="p-4 border-bottom">
                                <div className="row align-items-center">
                                    <div className="col-md-6">
                                        <h5 className="mb-0">Lista de Produtos</h5>
                                        <small className="text-muted">
                                            {produtos?.length || 0} produto{produtos?.length !== 1 ? 's' : ''} encontrado{produtos?.length !== 1 ? 's' : ''}
                                        </small>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-group">
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="Buscar por nome, categoria..." 
                                            />
                                            <button className="btn btn-outline-primary" type="button">
                                                <i className="bi bi-search"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                            {/* Tabela */}
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="ps-4">
                                                <div className="d-flex align-items-center">
                                                    <i className="bi bi-hash me-2 text-muted"></i>
                                                    ID
                                                </div>
                                            </th>
                                            <th scope="col">
                                                <div className="d-flex align-items-center">
                                                    <i className="bi bi-tag me-2 text-muted"></i>
                                                    Produto
                                                </div>
                                            </th>
                                            <th scope="col">
                                                <div className="d-flex align-items-center">
                                                    <i className="bi bi-currency-dollar me-2 text-muted"></i>
                                                    Preço
                                                </div>
                                            </th>
                                            <th scope="col">
                                                <div className="d-flex align-items-center">
                                                    <i className="bi bi-folder me-2 text-muted"></i>
                                                    Categoria
                                                </div>
                                            </th>
                                            <th scope="col">
                                                <div className="d-flex align-items-center">
                                                    <i className="bi bi-circle me-2 text-muted"></i>
                                                    Status
                                                </div>
                                            </th>
                                            <th scope="col" className="text-center">
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <i className="bi bi-gear me-2 text-muted"></i>
                                                    Ações
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <tr>
                                                <td colSpan="6" className="text-center py-5">
                                                    <div className="d-flex flex-column align-items-center">
                                                        <div className="spinner-border text-primary mb-3" role="status">
                                                            <span className="visually-hidden">Carregando...</span>
                                                        </div>
                                                        <h6 className="text-muted">Carregando produtos...</h6>
                                                        <small className="text-muted">Aguarde enquanto buscamos os dados</small>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : error ? (
                                            <tr>
                                                <td colSpan="6" className="text-center py-5">
                                                    <div className="empty-state">
                                                        <div className="icon-wrapper">
                                                            <i className="bi bi-exclamation-triangle"></i>
                                                        </div>
                                                        <h5 className="text-warning mb-3">Erro ao Carregar</h5>
                                                        <p className="text-muted mb-3">{error}</p>
                                                        <button onClick={carregarProdutos} className="btn btn-outline-primary">
                                                            <i className="bi bi-arrow-clockwise me-2"></i>
                                                            Tentar Novamente
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : produtos?.length > 0 ? produtos.map((produto, index) => (
                                            <tr key={produto.id} className="slide-up" style={{animationDelay: `${index * 0.05}s`}}>
                                                <td className="ps-4">
                                                    <span className="fw-bold text-primary">#{produto.id}</span>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <div 
                                                            className="rounded me-3" 
                                                            style={{
                                                                width: '40px',
                                                                height: '40px',
                                                                backgroundImage: `url(${produto.foto ? `data:image/jpeg;base64,${produto.foto}` : logo})`,
                                                                backgroundSize: 'cover',
                                                                backgroundPosition: 'center',
                                                                border: '2px solid var(--border-light)'
                                                            }}
                                                        />
                                                        <div>
                                                            <div className="fw-bold">{produto.nome}</div>
                                                            <small className="text-muted">{produto.descricao?.substring(0, 30)}...</small>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="fw-bold text-success">R$ {produto.preco?.toFixed(2).replace('.', ',') || '0,00'}</span>
                                                </td>
                                                <td>
                                                    <span className="badge bg-light text-dark">
                                                        {produto.categoria?.nome || produto.tipo || 'Sem categoria'}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className={`badge ${
                                                        produto.statusProduto === 'ATIVO' ? 'bg-success' : 
                                                        produto.statusProduto === 'INATIVO' ? 'bg-secondary' : 'bg-warning'
                                                    }`}>
                                                        <i className={`bi ${
                                                            produto.statusProduto === 'ATIVO' ? 'bi-check-circle' : 
                                                            produto.statusProduto === 'INATIVO' ? 'bi-x-circle' : 'bi-clock'
                                                        } me-1`}></i>
                                                        {produto.statusProduto || 'Ativo'}
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="btn-group" role="group">
                                                        <button 
                                                            className="btn btn-outline-primary btn-sm" 
                                                            onClick={() => abrirProduto(produto.id)}
                                                            title="Editar produto"
                                                        >
                                                            <i className="bi bi-pencil"></i>
                                                        </button>
                                                        <button 
                                                            className="btn btn-outline-info btn-sm" 
                                                            title="Ver detalhes"
                                                        >
                                                            <i className="bi bi-eye"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="6" className="text-center py-5">
                                                    <div className="empty-state">
                                                        <div className="icon-wrapper">
                                                            <i className="bi bi-box-seam"></i>
                                                        </div>
                                                        <h5>Nenhum produto encontrado</h5>
                                                        <p>Comece adicionando seu primeiro produto ao catálogo</p>
                                                        <Link to="/produto-novo" className="btn btn-primary">
                                                            <i className="bi bi-plus-circle me-2"></i>
                                                            Adicionar Produto
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    
                    {/* Rodapé com informações */}
                    {produtos?.length > 0 && (
                        <div className="card card-elevated mt-4">
                            <div className="card-body p-3">
                                <div className="row text-center">
                                    <div className="col-md-3">
                                        <div className="d-flex align-items-center justify-content-center">
                                            <i className="bi bi-box-seam text-primary me-2"></i>
                                            <div>
                                                <div className="fw-bold">{produtos.length}</div>
                                                <small className="text-muted">Total</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="d-flex align-items-center justify-content-center">
                                            <i className="bi bi-check-circle text-success me-2"></i>
                                            <div>
                                                <div className="fw-bold">{produtos.filter(p => p.statusProduto === 'ATIVO').length}</div>
                                                <small className="text-muted">Ativos</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="d-flex align-items-center justify-content-center">
                                            <i className="bi bi-x-circle text-secondary me-2"></i>
                                            <div>
                                                <div className="fw-bold">{produtos.filter(p => p.statusProduto === 'INATIVO').length}</div>
                                                <small className="text-muted">Inativos</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="d-flex align-items-center justify-content-center">
                                            <i className="bi bi-currency-dollar text-warning me-2"></i>
                                            <div>
                                                <div className="fw-bold">
                                                    R$ {produtos.reduce((sum, p) => sum + (p.preco || 0), 0).toFixed(2).replace('.', ',')}
                                                </div>
                                                <small className="text-muted">Valor Total</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )

}

export default ProdutosLista;