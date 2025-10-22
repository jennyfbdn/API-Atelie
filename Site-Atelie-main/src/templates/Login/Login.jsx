import { useNavigate } from "react-router-dom";
import logo from '../../assets/images/logo.png';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();

    return (
        <div className="login-container">
            <div className="login-form fade-in">
                <div className="login-logo">
                    <img src={logo} alt="logo" />
                    <h3 className="login-title">Ateliê Pano Fino</h3>
                    <p className="login-subtitle">Escolha seu tipo de acesso</p>
                </div>
                
                <div className="d-grid gap-3">
                    <button 
                        className="btn btn-primary btn-lg" 
                        onClick={() => navigate('/login-admin')}
                    >
                        <i className="bi bi-shield-check me-2"></i>
                        Administrador
                        <small className="d-block mt-1">Painel administrativo</small>
                    </button>
                    
                    <button 
                        className="btn btn-outline-primary btn-lg" 
                        onClick={() => navigate('/login-usuario')}
                    >
                        <i className="bi bi-person me-2"></i>
                        Cliente
                        <small className="d-block mt-1">Área do cliente</small>
                    </button>
                    
                    <button 
                        className="btn btn-outline-secondary" 
                        onClick={() => navigate('/')}
                    >
                        <i className="bi bi-arrow-left me-2"></i>
                        Voltar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login