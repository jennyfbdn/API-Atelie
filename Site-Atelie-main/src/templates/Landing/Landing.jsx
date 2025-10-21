import { Link } from "react-router-dom";
import logo from '../../assets/images/logo.png';

const Landing = () => {
    return (
        <div className="min-vh-100" style={{backgroundColor: 'var(--background-color)'}}>
            {/* Hero Section */}
            <div className="hero-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <div className="icon-wrapper floating-element mb-4">
                                <img 
                                    src={logo} 
                                    alt="Logo" 
                                    className="img-fluid rounded-circle" 
                                    style={{
                                        width: '60px',
                                        height: '60px',
                                        objectFit: 'cover'
                                    }} 
                                />
                            </div>
                            <h1 className="hero-title">Ateliê Pano Fino</h1>
                            <p className="hero-subtitle">
                                Moda unissex com estilo e personalidade únicos
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Main Content */}
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="row g-4 mb-5">
                            <div className="col-md-6">
                                <div className="luxury-card h-100 p-5 text-center slide-up">
                                    <div className="icon-wrapper floating-element">
                                        <i className="bi bi-heart"></i>
                                    </div>
                                    <h4 className="mb-3">Moda Personalizada</h4>
                                    <p className="text-muted mb-4">
                                        Descubra peças versáteis para todos os estilos. 
                                        Roupas que se adaptam à sua personalidade única.
                                    </p>
                                    <div className="d-grid gap-2">
                                        <Link to="/cliente" className="btn btn-elegant">
                                            <i className="bi bi-gem me-2"></i>
                                            Explorar Catálogo
                                        </Link>
                                        <Link to="/login" className="btn btn-outline-primary btn-sm">
                                            <i className="bi bi-person me-2"></i>
                                            Entrar como Cliente
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-md-6">
                                <div className="luxury-card h-100 p-5 text-center slide-up" style={{animationDelay: '0.2s'}}>
                                    <div className="icon-wrapper floating-element">
                                        <i className="bi bi-shield-check"></i>
                                    </div>
                                    <h4 className="mb-3">Gestão Elegante</h4>
                                    <p className="text-muted mb-4">
                                        Painel administrativo exclusivo para gerenciar sua marca 
                                        com sofisticação e eficiência.
                                    </p>
                                    <Link to="/login" className="btn btn-outline-primary">
                                        <i className="bi bi-key me-2"></i>
                                        Acesso Restrito
                                    </Link>
                                </div>
                            </div>
                        </div>
                        
                        {/* Features Section */}
                        <div className="elegant-divider"></div>
                        
                        <div className="row g-4 mb-5">
                            <div className="col-md-4">
                                <div className="glass-effect text-center p-4 h-100">
                                    <div className="icon-wrapper floating-element">
                                        <i className="bi bi-scissors"></i>
                                    </div>
                                    <h5 className="mb-3">Arte Artesanal</h5>
                                    <p className="text-muted small mb-0">
                                        Cada peça é cuidadosamente criada à mão, 
                                        com atenção aos mínimos detalhes
                                    </p>
                                </div>
                            </div>
                            
                            <div className="col-md-4">
                                <div className="glass-effect text-center p-4 h-100">
                                    <div className="icon-wrapper floating-element">
                                        <i className="bi bi-palette2"></i>
                                    </div>
                                    <h5 className="mb-3">Design Exclusivo</h5>
                                    <p className="text-muted small mb-0">
                                        Criações personalizadas que refletem 
                                        sua personalidade única
                                    </p>
                                </div>
                            </div>
                            
                            <div className="col-md-4">
                                <div className="glass-effect text-center p-4 h-100">
                                    <div className="icon-wrapper floating-element">
                                        <i className="bi bi-gem"></i>
                                    </div>
                                    <h5 className="mb-3">Elegância Atemporal</h5>
                                    <p className="text-muted small mb-0">
                                        Materiais nobres e técnicas refinadas 
                                        para peças duradouras
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Call to Action */}
                        <div className="luxury-card p-5 text-center">
                            <div className="icon-wrapper floating-element mb-4">
                                <i className="bi bi-phone"></i>
                            </div>
                            <h5 className="mb-3">Experiência Mobile Exclusiva</h5>
                            <p className="text-muted mb-4">
                                Aplicativo dedicado para acompanhar suas encomendas, 
                                explorar novidades e manter contato direto com o ateliê
                            </p>
                            <button className="btn btn-elegant" disabled>
                                <i className="bi bi-download me-2"></i>
                                Aplicativo em Desenvolvimento
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Footer */}
            <footer className="bg-light py-4 mt-5">
                <div className="container text-center">
                    <p className="text-muted mb-0">
                        © 2024 Ateliê Pano Fino - Criando moda com amor e dedicação
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Landing;