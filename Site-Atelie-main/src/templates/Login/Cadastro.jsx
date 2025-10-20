import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/images/primobolan.png';
import UsuarioService from "../../services/UsuarioService";
import './Login.css';

const Cadastro = () => {
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

        if (formData.password !== formData.confirmPassword) {
            setMessage("As senhas não coincidem");
            return;
        }

        const userData = {
            nome: formData.nome,
            email: formData.email,
            telefone: formData.telefone,
            password: formData.password
        };

        UsuarioService.create(userData).then(
            () => {
                setMessage("Usuário cadastrado com sucesso!");
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
            }
        );
    };

    return (
        <div className="container">
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="login-logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="text-center mb-3">
                    <h2 className="fw-bold" style={{color: '#333'}}>Cadastro</h2>
                </div>
                <div className="mb-3">
                    <label htmlFor="nome" className="form-label mb-0 fw-bold">Nome:</label>
                    <input type="text" id="nome" className="form-control text-center fw-medium shadow" 
                        name="nome"
                        value={formData.nome || ""}
                        onChange={handleChange}
                        required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label mb-0 fw-bold">Email:</label>
                    <input type="email" id="email" className="form-control text-center fw-medium shadow" 
                        name="email"
                        value={formData.email || ""}
                        onChange={handleChange}
                        required />
                </div>
                <div className="mb-3">
                    <label htmlFor="telefone" className="form-label mb-0 fw-bold">Telefone:</label>
                    <input type="tel" id="telefone" className="form-control text-center fw-medium shadow" 
                        name="telefone"
                        value={formData.telefone || ""}
                        onChange={handleChange}
                        required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label mb-0 fw-bold">Senha:</label>
                    <input type="password" id="password" className="form-control text-center fw-medium shadow" 
                        name="password"
                        value={formData.password || ""}
                        onChange={handleChange}
                        required />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label mb-0 fw-bold">Confirmar Senha:</label>
                    <input type="password" id="confirmPassword" className="form-control text-center fw-medium shadow" 
                        name="confirmPassword"
                        value={formData.confirmPassword || ""}
                        onChange={handleChange}
                        required />
                </div>
                <div className="text-center p-2 rounded-2">
                    {message && (
                        <div className={`fw-bold fs-6 ${message.includes('sucesso') ? 'text-success' : 'text-danger'}`}>
                            <span>{message}</span>
                        </div>
                    )}
                </div>
                <div className="d-flex justify-content-around mb-3 mt-2">
                    <Link to="/login" className="btn btn-warning fw-medium shadow">Voltar</Link>
                    <button className="btn btn-success fw-medium shadow" type="submit">
                        Cadastrar
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Cadastro;