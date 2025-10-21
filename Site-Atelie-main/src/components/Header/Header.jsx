import { Link } from "react-router-dom";
import { useState } from "react";

const Header = ({goTo, title, logo, actions}) => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    
    return (
        <header className="bg-white border-bottom shadow-sm mb-4">
            <div className="container-fluid">
                <div className="d-flex justify-content-between align-items-center py-3">
                    {/* Botão Voltar */}
                    <div className="d-flex align-items-center">
                        <Link to={goTo} className="btn btn-outline-primary btn-sm me-3">
                            <i className="bi bi-arrow-left me-2"></i>
                            Voltar
                        </Link>
                        
                        {/* Menu Mobile Toggle */}
                        <button 
                            className="btn btn-outline-secondary btn-sm d-md-none"
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                        >
                            <i className="bi bi-list"></i>
                        </button>
                    </div>
                    
                    {/* Título */}
                    <div className="text-center flex-grow-1">
                        <h1 className="h3 mb-0 fw-bold" style={{color: 'var(--text-primary)'}}>
                            {title}
                        </h1>
                    </div>
                    
                    {/* Logo e Ações */}
                    <div className="d-flex align-items-center gap-3">
                        {actions && (
                            <div className="d-none d-md-flex gap-2">
                                {actions}
                            </div>
                        )}
                        
                        <div className="d-flex align-items-center">
                            <img 
                                src={logo} 
                                alt="Logo" 
                                className="img-fluid rounded-circle" 
                                width={48} 
                                height={48}
                                style={{
                                    border: '2px solid var(--border-light)',
                                    objectFit: 'cover'
                                }}
                            />
                        </div>
                    </div>
                </div>
                
                {/* Menu Mobile */}
                {showMobileMenu && (
                    <div className="d-md-none border-top py-3">
                        {actions && (
                            <div className="d-flex flex-column gap-2">
                                {actions}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header;