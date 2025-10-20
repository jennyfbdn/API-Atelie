import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import logo from '../../assets/images/primobolan.png';
import UsuarioService from "../../services/UsuarioService";

const NovoUsuario = () => {
    // const [nivel, setNivel] = useState();
    const [formData, setFormData] = useState({});
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData(formData => ({ ...formData, [name]: value }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccessful(false);

        console.log(formData);
        
        UsuarioService.create(formData).then(
            (response) => {
                setMessage(response.data.message);
                setSuccessful(true);
                /*window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                })*/
            }, (error) => {
                const message = error.response.data.message;
                setMessage(message);
            }
        )
    }

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100" style={{ backgroundColor: '#fff6ed' }}>
                <Header
                    goTo={'/usuario'}
                    title={'Novo Usuário'}
                    logo={logo}
                />

                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="form-label">Nome</label>
                                            <input
                                                type="nome"
                                                className="form-control"
                                                name="nome"
                                                value={formData.Nome}
                                                onChange={handleChange}
                                                required
                                            />
                                            <label className="form-label">Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Telefone</label>
                                            <input
                                                type="tel"
                                                className="form-control"
                                                name="telefone"
                                                value={formData.telefone}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Senha</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                name="senha"
                                                value={formData.senha}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Confirmar Senha</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                name="confirmarSenha"
                                                value={formData.confirmarSenha}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="d-flex justify-content-between">
                                            <button type="button" className="btn btn-secondary" onClick={() => navigate('/usuario')}>
                                                Cancelar
                                            </button>
                                            <button type="submit" className="btn btn-success">
                                                Cadastrar Usuário
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NovoUsuario;