import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/images/logo.png';
import UsuarioService from "../../services/UsuarioService";
import './Login.css';

const LoginUsuario = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [message, setMessage] = useState();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData(formData => ({ ...formData, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("");

        UsuarioService.signin(formData.email, formData.password).then(
            () => {
                const userJson = localStorage.getItem("user");
                const user = JSON.parse(userJson || '{}');

                if (user.statusUsuario == 'ATIVO') {
                    navigate("/cliente");
                }
            },
            (error) => {
                const respMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setMessage(respMessage);
            }
        );
    };

    return (
        <div className="login-container">
            <div className="login-form fade-in">
                <div className="login-logo">
                    <img src={logo} alt="logo" />
                    <h3 className="login-title">Ateliê Pano Fino</h3>
                    <p className="login-subtitle">Área do Cliente</p>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            className="form-control"
                            name="email"
                            placeholder="Digite seu email"
                            value={formData.email || ""}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Senha</label>
                        <input 
                            type="password" 
                            id="password" 
                            className="form-control"
                            name="password"
                            placeholder="Digite sua senha"
                            value={formData.password || ""}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    {message && (
                        <div className="alert alert-danger">
                            <div className="d-flex align-items-center">
                                <i className="bi bi-exclamation-triangle me-2"></i>
                                <small>{message}</small>
                            </div>
                        </div>
                    )}

                    <div className="d-grid gap-2">
                        <button className="btn btn-primary" type="submit">
                            <i className="bi bi-box-arrow-in-right me-2"></i>
                            Entrar
                        </button>
                        <button className="btn btn-outline-secondary" type="button" onClick={() => navigate("/")}>
                            <i className="bi bi-arrow-left me-2"></i>
                            Voltar
                        </button>
                    </div>
                </form>
                
                <div className="login-help">
                    <small>
                        Não tem conta? <Link to={'/cadastro'}>Cadastre-se aqui</Link><br/>
                        <Link to={'/login-admin'}>Entrar como Administrador</Link><br/>
                        Esqueceu a senha? <Link to={'/forgotpass'}>Clique aqui</Link>
                    </small>
                </div>
            </div>
        </div>
    )
}

export default LoginUsuario