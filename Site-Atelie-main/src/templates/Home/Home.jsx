import { Link } from "react-router-dom"
import { useState, useEffect, useRef } from "react";
import Header from "../../components/Header/Header";
import logo from '../../assets/images/logo.png';
import imgProfile from '../../assets/images/logo.png';
import Sidebar from "../../components/Sidebar/Sidebar";

import '../../assets/styles/theme.css';

import ProdutoService from "../../services/ProdutoService";

const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const _dbRecords = useRef(true);
    const [produtos, setProdutos] = useState([]);

    // Verificar se é admin
    const userJson = localStorage.getItem("user");
    const user = JSON.parse(userJson || '{}');
    const isAdmin = user.nivelAcesso === 'ADMIN';

    useEffect(() => {
        if (_dbRecords.current && isAdmin) {
            ProdutoService.findAll().then(
                (response) => {
                    const produtos = response.data;
                    setProdutos(produtos);
                }
            ).catch((error) => {
                setProdutos([]);
                console.log(error);
            })
        }
        return () => {
            _dbRecords.current = false;
        };
    }, [isAdmin]);

    const handleVerDetalhes = () => {
        alert('O pedido deste produto só é feito pelo app');
    };
    /*
    const [servicos, setServicos] = useState([]);

    useEffect(() => {
        ServicoService.getAll()
            .then(response => {
                setServicos(response.data);
            })
            .catch(error => {
                console.error("Erro ao carregar serviços:", error);
                // Dados mock para demonstração
                setServicos([
                    { id: 1, nome: "Corte de Cabelo", preco: 50.00, duracao: "30 min" },
                    { id: 2, nome: "Manicure", preco: 25.00, duracao: "45 min" },
                    { id: 3, nome: "Pedicure", preco: 30.00, duracao: "60 min" }
                ]);
            });
    }, []);
*/
    return (
        <div className="d-flex" style={{ backgroundColor: '#F8F9FA' }}>
            {isAdmin && (
                <Sidebar
                    imgProfile={imgProfile}
                    username={"Atelie Pano Fino"}
                />
            )}
            <div className={`${isAdmin ? 'p-3' : ''} w-100`} style={{ backgroundColor: isAdmin ? '#fff6ed' : 'transparent' }}>
                {isAdmin && (
                    <Header
                        goTo={'/home'}
                        title={'Home'}
                        logo={logo}
                    />
                )}

                {/* Conteúdo baseado no tipo de usuário */}
                {isAdmin ? (
                    // PAINEL ADMINISTRATIVO
                    <>
                        <div className="hero-section fade-in">
                            <div className="container">
                                <div className="icon-wrapper floating-element">
                                    <i className="bi bi-gem"></i>
                                </div>
                                <h1 className="hero-title">Painel Administrativo</h1>
                                <p className="hero-subtitle">Gerencie sua coleção com elegância e sofisticação</p>
                            </div>
                        </div>

                        <div className="container mt-5">
                            {/* Cards de Gestão */}
                            <div className="row g-4 mb-5">
                                <div className="col-lg-3 col-md-6">
                                    <div className="luxury-card text-center p-4 h-100 slide-up">
                                        <div className="icon-wrapper floating-element">
                                            <i className="bi bi-scissors"></i>
                                        </div>
                                        <h5 className="mb-3">Produtos</h5>
                                        <p className="text-muted mb-4">Gerencie sua moda personalizada</p>
                                        <div className="d-grid gap-2">
                                            <Link to="/produtos" className="btn btn-outline-primary btn-sm">
                                                <i className="bi bi-grid me-2"></i>Ver Coleção
                                            </Link>
                                            <Link to="/produto-novo" className="btn btn-elegant btn-sm">
                                                <i className="bi bi-plus-circle me-2"></i>Nova Peça
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                
                                
                                
                                <div className="col-lg-3 col-md-6">
                                    <div className="luxury-card text-center p-4 h-100 slide-up" style={{animationDelay: '0.2s'}}>
                                        <div className="icon-wrapper floating-element">
                                            <i className="bi bi-calendar-check"></i>
                                        </div>
                                        <h5 className="mb-3">Agendamentos</h5>
                                        <p className="text-muted mb-4">Agendamentos do mobile</p>
                                        <div className="d-grid gap-2">
                                            <Link to="/admin/agendamentos" className="btn btn-outline-primary btn-sm">
                                                <i className="bi bi-calendar me-2"></i>Ver Agendamentos
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="col-lg-3 col-md-6">
                                    <div className="luxury-card text-center p-4 h-100 slide-up" style={{animationDelay: '0.3s'}}>
                                        <div className="icon-wrapper floating-element">
                                            <i className="bi bi-bag-check"></i>
                                        </div>
                                        <h5 className="mb-3">Encomendas</h5>
                                        <p className="text-muted mb-4">Pedidos do mobile</p>
                                        <div className="d-grid gap-2">
                                            <Link to="/admin/encomendas" className="btn btn-outline-primary btn-sm">
                                                <i className="bi bi-bag me-2"></i>Ver Encomendas
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Segunda linha de cards */}
                            <div className="row g-4 mb-5">
                
                                

                                
                                <div className="col-lg-3 col-md-6">
                                    <div className="luxury-card text-center p-4 h-100 slide-up" style={{animationDelay: '0.6s'}}>
                                        <div className="icon-wrapper floating-element">
                                            <i className="bi bi-person-hearts"></i>
                                        </div>
                                        <h5 className="mb-3">Clientes</h5>
                                        <p className="text-muted mb-4">Gerencie todos os clientes</p>
                                        <div className="d-grid gap-2">
                                            <Link to="/usuarios" className="btn btn-outline-primary btn-sm">
                                                <i className="bi bi-person-lines-fill me-2"></i>Ver Clientes
                                            </Link>
                                            <Link to="/novo-usuario" className="btn btn-elegant btn-sm">
                                                <i className="bi bi-person-plus me-2"></i>Novo Cliente
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Estatísticas Rápidas */}
                            <div className="row g-4 mb-5">
                                <div className="col-lg-3 col-md-6">
                                    <div className="card glass-effect text-center p-4 transition-normal">
                                        <div className="d-flex align-items-center justify-content-center mb-3">
                                            <div className="icon-wrapper" style={{width: '48px', height: '48px', fontSize: '1.2rem'}}>
                                                <i className="bi bi-box-seam"></i>
                                            </div>
                                        </div>
                                        <h2 className="text-gradient mb-2">{produtos?.length || 0}</h2>
                                        <p className="text-muted mb-0 small">Produtos Cadastrados</p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <div className="card glass-effect text-center p-4 transition-normal">
                                        <div className="d-flex align-items-center justify-content-center mb-3">
                                            <div className="icon-wrapper" style={{width: '48px', height: '48px', fontSize: '1.2rem'}}>
                                                <i className="bi bi-check-circle"></i>
                                            </div>
                                        </div>
                                        <h2 className="text-gradient mb-2">{produtos?.filter(p => p.statusProduto === 'ATIVO').length || 0}</h2>
                                        <p className="text-muted mb-0 small">Produtos Ativos</p>
                                    </div>
                                </div>

                                <div className="col-lg-3 col-md-6">
                                    <div className="card glass-effect text-center p-4 transition-normal">
                                        <div className="d-flex align-items-center justify-content-center mb-3">
                                            <div className="icon-wrapper" style={{width: '48px', height: '48px', fontSize: '1.2rem'}}>
                                                <i className="bi bi-shield-check"></i>
                                            </div>
                                        </div>
                                        <h2 className="text-gradient mb-2">1</h2>
                                        <p className="text-muted mb-0 small">Administradores</p>
                                    </div>
                                </div>
                            </div>

                            {/* Produtos Recentes */}
                            <div className="luxury-card p-4">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <div>
                                        <h4 className="mb-1">Coleção Recente</h4>
                                        <small className="text-muted">Suas últimas criações</small>
                                    </div>
                                    <Link to="/produtos" className="btn btn-elegant btn-sm">
                                        <i className="bi bi-arrow-right me-2"></i>
                                        Ver Coleção
                                    </Link>
                                </div>
                                <div className="elegant-divider"></div>
                                
                                {produtos?.length > 0 ? (
                                    <div className="row g-3">
                                        {produtos?.slice(0, 4).map((produto, index) => (
                                            <div className="col-lg-3 col-md-6" key={produto.id}>
                                                <div className="card h-100 transition-normal">
                                                    <div 
                                                        className="position-relative"
                                                        style={{
                                                            height: '160px',
                                                            backgroundImage: `url(${produto.foto ? `data:image/jpeg;base64,${produto.foto}` : logo})`,
                                                            backgroundSize: 'cover',
                                                            backgroundPosition: 'center',
                                                            borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0'
                                                        }}
                                                    >
                                                        <span className="badge bg-success position-absolute top-0 end-0 m-2">
                                                            {produto.statusProduto || 'Ativo'}
                                                        </span>
                                                    </div>
                                                    <div className="card-body p-3">
                                                        <h6 className="mb-2 fw-bold">{produto.nome}</h6>
                                                        <p className="text-muted small mb-2">{produto.descricao?.substring(0, 50)}...</p>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <span className="fw-bold text-primary">R$ {produto.preco?.toFixed(2) || '0,00'}</span>
                                                            <Link to={`/editar-produto/${produto.id}`} className="btn btn-outline-primary btn-sm">
                                                                <i className="bi bi-pencil"></i>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        
                                        {/* Adicionar fotos do mobile quando há poucos produtos */}
                                        {produtos?.length < 4 && [
                                            { img: '/assets/images/vestidorosa.png', nome: 'Vestido Rosa', preco: '150,00' },
                                            { img: '/assets/images/masccamisabranca.png', nome: 'Camisa Branca', preco: '80,00' },
                                            { img: '/assets/images/femcalcalaco.png', nome: 'Calça Laço', preco: '120,00' },
                                            { img: '/assets/images/femsaiabranca.png', nome: 'Saia Branca', preco: '90,00' }
                                        ].slice(0, 4 - produtos?.length).map((item, index) => (
                                            <div className="col-lg-3 col-md-6" key={`mobile-${index}`}>
                                                <div className="card h-100 transition-normal">
                                                    <img 
                                                        src={item.img} 
                                                        alt={item.nome}
                                                        style={{
                                                            height: '160px',
                                                            objectFit: 'cover',
                                                            borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0'
                                                        }}
                                                    />
                                                    <div className="card-body p-3">
                                                        <h6 className="mb-2 fw-bold">{item.nome}</h6>
                                                        <p className="text-muted small mb-2">Peça exclusiva do ateliê</p>
                                                        <span className="fw-bold text-primary">R$ {item.preco}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="empty-state">
                                        <div className="icon-wrapper">
                                            <i className="bi bi-box"></i>
                                        </div>
                                        <h5>Nenhum produto cadastrado</h5>
                                        <p>Comece adicionando seus primeiros produtos</p>
                                        <Link to="/produto-novo" className="btn btn-primary">
                                            <i className="bi bi-plus-circle me-2"></i>
                                            Adicionar Produto
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    // ÁREA DO CLIENTE (caso acesse /home sem ser admin)
                    <div className="d-flex align-items-center justify-content-center" style={{minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
                        <div className="text-center text-white p-5">
                            <div className="mb-4">
                                <img src={logo} alt="Logo" style={{width: '120px', height: '120px', objectFit: 'contain', filter: 'brightness(0) invert(1)'}} />
                            </div>
                            <h1 className="display-4 fw-bold mb-4">Ateliê Pano Fino</h1>
                            <h2 className="h3 mb-4">Criações Exclusivas & Personalizadas</h2>
                            <p className="lead mb-5" style={{maxWidth: '600px', margin: '0 auto'}}>
                                Onde cada peça conta uma história única. Transformamos suas ideias em criações exclusivas com técnicas artesanais e design contemporâneo.
                            </p>
                            <div className="d-flex gap-3 justify-content-center flex-wrap">
                                <Link to="/cliente" className="btn btn-light btn-lg px-4 py-3">
                                    <i className="bi bi-eye me-2"></i>Ver Catálogo
                                </Link>
                                <Link to="/" className="btn btn-outline-light btn-lg px-4 py-3">
                                    <i className="bi bi-arrow-left me-2"></i>Voltar
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )

}

export default Home;