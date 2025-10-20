import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/images/primobolan.png';
import UsuarioService from "../../services/UsuarioService";
import './Login.css';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        telefone: "",
        novaSenha: "",
        confirmarSenha: ""
    });
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("");
        setIsLoading(true);

        if (formData.novaSenha !== formData.confirmarSenha) {
            setMessage("As senhas não coincidem");
            setIsLoading(false);
            return;
        }

        UsuarioService.forgotPassword(formData).then(
            (response) => {
                setMessage("Senha alterada com sucesso!");
                setIsLoading(false);
                setTimeout(() => navigate("/login"), 2000);
            },
            (error) => {
                const respMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setMessage(respMessage);
                setIsLoading(false);
            }
        );
    };

    const backToLogin = () => {
        navigate("/login");
    };

    return (
        <div className="container">
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="login-logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="text-center mb-3">
                    <h5 className="fw-bold">Recuperar Senha</h5>
                    <p className="text-muted">Preencha os dados para alterar sua senha</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label mb-0 fw-bold">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email"
                        className="form-control text-center fw-medium shadow" 
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="telefone" className="form-label mb-0 fw-bold">Telefone:</label>
                    <input 
                        type="tel" 
                        id="telefone" 
                        name="telefone"
                        className="form-control text-center fw-medium shadow" 
                        value={formData.telefone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="novaSenha" className="form-label mb-0 fw-bold">Nova Senha:</label>
                    <input 
                        type="password" 
                        id="novaSenha" 
                        name="novaSenha"
                        className="form-control text-center fw-medium shadow" 
                        value={formData.novaSenha}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmarSenha" className="form-label mb-0 fw-bold">Confirmar Senha:</label>
                    <input 
                        type="password" 
                        id="confirmarSenha" 
                        name="confirmarSenha"
                        className="form-control text-center fw-medium shadow" 
                        value={formData.confirmarSenha}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="text-center p-2 rounded-2">
                    {message && (
                        <div className={`fw-bold fs-6 ${message.includes('sucesso') ? 'text-success' : 'text-danger'}`}>
                            <span>{message}</span>
                        </div>
                    )}
                </div>
                <div className="d-flex justify-content-around mb-3 mt-2">
                    <button 
                        className="btn btn-warning fw-medium shadow" 
                        type="button"
                        onClick={backToLogin}
                    >
                        Voltar
                    </button>
                    <button 
                        className="btn btn-success fw-medium shadow" 
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? "Enviando..." : "Enviar"}
                    </button>
                </div>
                <div className="text-center mt-3">
                    <p className="fw-bold fst-italic opacity-75">
                        Lembrou da senha? 
                        <Link to={'/login'}> Faça login aqui.</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default ForgotPassword;