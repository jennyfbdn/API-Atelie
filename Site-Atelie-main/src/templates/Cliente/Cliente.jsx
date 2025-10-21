import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/images/logo.png';
import ProdutoService from "../../services/ProdutoService";
import CategoriaService from "../../services/CategoriaService";
import ImageGallery from "../../components/ImageGallery/ImageGallery";

const Cliente = () => {
    const _dbRecords = useRef(true);
    const [produtos, setProdutos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [filtroCategoria, setFiltroCategoria] = useState('todos');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (_dbRecords.current) {
            Promise.all([
                ProdutoService.findAll(),
                CategoriaService.findAll()
            ]).then(([produtosRes, categoriasRes]) => {
                setProdutos(produtosRes.data || []);
                setCategorias(categoriasRes.data || []);
                setLoading(false);
            }).catch((error) => {
                setProdutos([]);
                setCategorias([]);
                setLoading(false);
                console.log(error);
            })
        }
        return () => {
            _dbRecords.current = false;
        };
    }, []);

    const produtosFiltrados = filtroCategoria === 'todos' 
        ? produtos 
        : produtos.filter(produto => produto.categoria?.id == filtroCategoria);

    return (
        <div style={{backgroundColor: 'var(--background-color)', minHeight: '100vh'}}>
            {/* Header */}
            <nav className="navbar navbar-expand-lg sticky-top shadow-sm">
                <div className="container">
                    <Link className="navbar-brand d-flex align-items-center" to="/">
                        <img 
                            src={logo} 
                            alt="Logo" 
                            width="40" 
                            height="40"
                            className="me-3 rounded-circle" 
                            style={{border: '2px solid var(--border-light)', objectFit: 'cover'}}
                        />
                        <div>
                            <span className="fw-bold d-block">Ateliê Pano Fino</span>
                            <small className="text-muted d-none d-md-block">Coleção Exclusiva</small>
                        </div>
                    </Link>
                    
                    <div className="d-flex align-items-center gap-2">
                        <Link to="/ver-servicos" className="btn btn-outline-primary btn-sm">
                            <i className="bi bi-tools me-2"></i>
                            <span className="d-none d-md-inline">Nossos </span>Serviços
                        </Link>
                        <Link to="/" className="btn btn-primary btn-sm">
                            <i className="bi bi-house me-2"></i>
                            <span className="d-none d-md-inline">Início</span>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="hero-section">
                <div className="container">
                    <h1 className="hero-title">Nossa Coleção</h1>
                    <p className="hero-subtitle">Peças exclusivas criadas com amor e dedicação</p>
                </div>
            </div>

            <div className="container py-5">
                {/* Filtros */}
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="card card-elevated p-4">
                            <div className="row align-items-center">
                                <div className="col-md-6 mb-3 mb-md-0">
                                    <h6 className="mb-2">Filtrar por Categoria</h6>
                                    <div className="d-flex flex-wrap gap-2">
                                        <button 
                                            className={`btn ${filtroCategoria === 'todos' ? 'btn-primary' : 'btn-outline-primary'} btn-sm transition-fast`}
                                            onClick={() => setFiltroCategoria('todos')}
                                        >
                                            <i className="bi bi-grid me-2"></i>
                                            Todos
                                        </button>
                                        {categorias.map(categoria => (
                                            <button 
                                                key={categoria.id}
                                                className={`btn ${filtroCategoria == categoria.id ? 'btn-primary' : 'btn-outline-primary'} btn-sm transition-fast`}
                                                onClick={() => setFiltroCategoria(categoria.id)}
                                            >
                                                <i className="bi bi-tag me-2"></i>
                                                {categoria.nome}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="text-md-end">
                                        <small className="text-muted">
                                            {produtosFiltrados.length} produto{produtosFiltrados.length !== 1 ? 's' : ''} encontrado{produtosFiltrados.length !== 1 ? 's' : ''}
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grid de Produtos */}
                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Carregando...</span>
                        </div>
                        <p className="mt-3 text-muted">Carregando produtos...</p>
                    </div>
                ) : (
                    <div className="product-grid">
                    {produtosFiltrados?.map((produto, index) => (
                        <div className="product-card slide-up" key={produto.id} style={{animationDelay: `${index * 0.1}s`}}>
                            <div className="position-relative">
                                <img 
                                    src={produto.foto ? `data:image/jpeg;base64,${produto.foto}` : logo}
                                    alt={produto.nome}
                                    className="product-image"
                                />
                                <div className="position-absolute top-0 end-0 m-3">
                                    <span className={`badge ${
                                        produto.statusProduto === 'ATIVO' ? 'bg-success' : 
                                        produto.statusProduto === 'INATIVO' ? 'bg-secondary' : 'bg-success'
                                    }`}>
                                        <i className="bi bi-check-circle me-1"></i>
                                        {produto.statusProduto === 'ATIVO' ? 'Disponível' : produto.statusProduto || 'Disponível'}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="p-4">
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <h5 className="mb-0 fw-bold">{produto.nome}</h5>
                                    <span className="h5 mb-0 text-gradient">R$ {produto.preco?.toFixed(2).replace('.', ',') || '0,00'}</span>
                                </div>
                                
                                <p className="text-muted mb-3 small">
                                    {produto.descricao || 'Peça exclusiva criada com atenção aos detalhes'}
                                </p>
                                
                                <div className="mb-3">
                                    <span className="badge bg-light text-dark me-2">
                                        <i className="bi bi-tag me-1"></i>
                                        {produto.categoria?.nome || produto.tipo || 'Categoria'}
                                    </span>
                                </div>
                                
                                <div className="d-grid gap-2">
                                    <button 
                                        className="btn btn-primary" 
                                        onClick={() => alert('📱 Faça seu pedido pelo nosso app mobile!\n\n👉 Baixe o app para:\n• Fazer pedidos\n• Acompanhar produção\n• Receber atualizações')}
                                    >
                                        <i className="bi bi-phone me-2"></i>
                                        Pedir no App
                                    </button>
                                    <button 
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={() => alert(`👗 ${produto.nome}\n\n💰 Preço: R$ ${produto.preco?.toFixed(2).replace('.', ',') || '0,00'}\n📝 Descrição: ${produto.descricao || 'Peça exclusiva'}\n🏷️ Categoria: ${produto.categoria?.nome || produto.tipo || 'N/A'}\n\n📱 Use o app para fazer seu pedido!`)}
                                    >
                                        <i className="bi bi-info-circle me-2"></i>
                                        Ver Detalhes
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                )}

                {!loading && produtosFiltrados.length === 0 && (
                    <div className="row">
                        <div className="col-12">
                            <ImageGallery />
                            <div className="card card-elevated text-center p-5 mt-4">
                                <div className="empty-state">
                                    <div className="icon-wrapper">
                                        <i className="bi bi-search"></i>
                                    </div>
                                    <h4>Produtos em breve!</h4>
                                    <p className="text-muted mb-4">
                                        Estamos preparando nossa coleção exclusiva para você. 
                                        Confira nossa galeria enquanto cadastramos os produtos.
                                    </p>
                                    <div className="d-flex justify-content-center gap-2">
                                        <button 
                                            className="btn btn-outline-primary"
                                            onClick={() => setFiltroCategoria('todos')}
                                        >
                                            <i className="bi bi-arrow-clockwise me-2"></i>
                                            Ver Todos
                                        </button>
                                        <Link to="/" className="btn btn-primary">
                                            <i className="bi bi-house me-2"></i>
                                            Voltar ao Início
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className="bg-light py-5 mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 text-center text-md-start">
                            <div className="d-flex align-items-center justify-content-center justify-content-md-start mb-3">
                                <img 
                                    src={logo} 
                                    alt="Logo" 
                                    width="40" 
                                    height="40"
                                    className="me-3 rounded-circle" 
                                    style={{border: '2px solid var(--border-light)', objectFit: 'cover'}}
                                />
                                <div>
                                    <h6 className="mb-0 fw-bold">Ateliê Pano Fino</h6>
                                    <small className="text-muted">Criações únicas e personalizadas</small>
                                </div>
                            </div>
                            <p className="text-muted small mb-0">
                                Transformando ideias em peças exclusivas desde sempre. 
                                Cada criação conta uma história única.
                            </p>
                        </div>
                        <div className="col-md-6 text-center text-md-end">
                            <div className="card glass-effect p-3 d-inline-block">
                                <div className="d-flex align-items-center">
                                    <div className="icon-wrapper me-3" style={{width: '40px', height: '40px', fontSize: '1rem'}}>
                                        <i className="bi bi-phone"></i>
                                    </div>
                                    <div className="text-start">
                                        <h6 className="mb-1">App Mobile</h6>
                                        <small className="text-muted">Faça pedidos e acompanhe</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    <div className="text-center">
                        <small className="text-muted">
                            © 2024 Ateliê Pano Fino - Todos os direitos reservados
                        </small>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Cliente;