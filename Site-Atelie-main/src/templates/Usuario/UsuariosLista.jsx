import { Link } from "react-router-dom"
import Header from "../../components/Header/Header";
import logo from '../../assets/images/primobolan.png';
import imgProfile from '../../assets/images/primobolan.png';
import Sidebar from "../../components/Sidebar/Sidebar";
import { useEffect, useRef, useState } from "react";
import UsuarioService from "../../services/UsuarioService";
import '../../assets/styles/tables.css';

const UsuariosLista = () => {

    const _dbRecords = useRef(true);
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        if (_dbRecords.current) {
            UsuarioService.findAll().then(
                (response) => {
                    const usuarios = response.data;
                    setUsuarios(usuarios);
                    console.log(usuarios);
                }
            ).catch((error) => {
                setUsuarios([]);
                console.log(error);
            })
        }
        return () => {
            _dbRecords.current = false;
        };
    }, []);

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100" style={{backgroundColor: '#fff6ed'}}>
                <Header
                    goTo={'/usuario'}
                    title={'Lista de Usuários'}
                    logo={logo}
                />
                <div className="table-container">
                    <div className="table-search-section">
                        <form action="">
                            <div className="row m-3">
                                <div className="col-md-2 text-end">
                                    <label htmlFor="inputBuscar" className="col-form-label table-search-label">Buscar:</label>
                                </div>
                                <div className="col-md-8">
                                    <input type="text" className="form-control table-search-input" id="inputBuscar" />
                                </div>
                                <div className="col-md-2">
                                    <button type="button" className="btn table-search-btn">
                                        Buscar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <table className="table table-striped table-hover table-elegant table-usuarios">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Email</th>
                                <th scope="col">Telefone</th>
                                <th scope="col">Acesso</th>
                                <th scope="col">Status</th>
                                <th scope="col">Abrir</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios?.map((usuario) => (
                            <tr key={usuario.id}>
                                <th scope="row">{usuario.id}</th>
                                <td>{usuario.nome}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.telefone}</td>
                                <td>{usuario.nivelAcesso}</td>
                                <td>{usuario.statusUsuario}</td>
                                <td>
                                    <Link to={`/usuario-editar/${usuario.id}`} className="btn table-action-btn">
                                        <i className="bi bi-folder2-open"></i>
                                        Abrir
                                    </Link>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}

export default UsuariosLista;