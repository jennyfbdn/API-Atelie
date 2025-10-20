import { useParams, useNavigate } from "react-router-dom"
import Header from "../../components/Header/Header"
import Sidebar from '../../components/Sidebar/Sidebar'
import logo from '../../assets/images/primobolan.png'
import { useEffect, useState } from "react"
import UsuarioService from "../../services/UsuarioService"

const UsuarioEditar = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    
    const [usuario, setUsuario] = useState({
        id: '',
        nome: '',
        email: '',
        telefone: '',
        nivelAcesso: 'USER',
        senha: '',
        statusUsuario: ''
    });
    
    const [message, setMessage] = useState('');
    const [successful, setSuccessful] = useState(false);

    useEffect(() => {
        if (id) {
            UsuarioService.findById(id).then(
                (response) => {
                    setUsuario(response.data);
                }
            ).catch((error) => {
                console.log(error);
            })
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("");

        UsuarioService.update(id, usuario).then(
            (response) => {
                setMessage("Usuário atualizado com sucesso!");
                setSuccessful(true);
                setTimeout(() => {
                    navigate('/usuarios');
                }, 2000);
            },
            (error) => {
                setMessage("Erro ao atualizar usuário!");
                setSuccessful(false);
            }
        );
    };

    const inativar = () => {
        UsuarioService.inativar(id).then(
            (response) => {
                setMessage("Usuário inativado com sucesso!");
                setSuccessful(true);
                setTimeout(() => window.location.reload(), 1500);
            }, (error) => {
                setMessage("Erro ao inativar usuário!");
                setSuccessful(false);
            }
        )
    }

    const reativar = () => {
        UsuarioService.reativar(id).then(
            (response) => {
                setMessage("Usuário reativado com sucesso!");
                setSuccessful(true);
                setTimeout(() => window.location.reload(), 1500);
            }, (error) => {
                setMessage("Erro ao reativar usuário!");
                setSuccessful(false);
            }
        )
    }

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100">
                <Header
                    goTo={'/usuarios'}
                    title={'Editar Usuário'}
                    logo={logo}
                />
                
                <div className="container mt-4">
                    <div className="card">
                        <div className="card-header bg-dark text-white">
                            <h5 className="mb-0">Editar Usuário - ID: {id}</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">Nome:</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            name="nome"
                                            value={usuario.nome || ''} 
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">Email:</label>
                                        <input 
                                            type="email" 
                                            className="form-control" 
                                            name="email"
                                            value={usuario.email || ''} 
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-4">
                                        <label className="form-label fw-bold">Telefone:</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            name="telefone"
                                            value={usuario.telefone || ''} 
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label fw-bold">Nível de Acesso:</label>
                                        <select 
                                            className="form-select" 
                                            name="nivelAcesso"
                                            value={usuario.nivelAcesso || 'USER'} 
                                            onChange={handleChange}
                                        >
                                            <option value="USER">USER</option>
                                            <option value="ADMIN">ADMIN</option>
                                        </select>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label fw-bold">Status:</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            value={usuario.statusUsuario || ''} 
                                            readOnly 
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Senha:</label>
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        name="senha"
                                        value={usuario.senha || ''} 
                                        onChange={handleChange}
                                        placeholder="Digite a nova senha"
                                    />
                                </div>

                                {message && (
                                    <div className={`alert ${successful ? 'alert-success' : 'alert-danger'} text-center`}>
                                        {message}
                                    </div>
                                )}

                                <div className="d-flex justify-content-between">
                                    <button type="submit" className="btn btn-dark">
                                        Salvar Alterações
                                    </button>
                                    <button type="button" className="btn btn-warning" onClick={reativar}>
                                        Reativar
                                    </button>
                                    <button type="button" className="btn btn-danger" onClick={inativar}>
                                        Inativar
                                    </button>
                                    <button 
                                        type="button" 
                                        className="btn btn-secondary" 
                                        onClick={() => navigate('/usuarios')}
                                    >
                                        Voltar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UsuarioEditar