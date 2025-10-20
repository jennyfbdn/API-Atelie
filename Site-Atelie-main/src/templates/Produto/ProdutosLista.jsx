import { Link, useNavigate } from "react-router-dom"
import Header from "../../components/Header/Header";
import logo from '../../assets/images/primobolan.png';
import imgProfile from '../../assets/images/primobolan.png';
import Sidebar from "../../components/Sidebar/Sidebar";
import { useEffect, useRef, useState } from "react";
import ProdutoService from "../../services/ProdutoService";
import '../../assets/styles/theme.css';
import '../../assets/styles/tables.css';

const ProdutosLista = () => {
    const navigate = useNavigate();
    const _dbRecords = useRef(true);
    const [produtos, setProdutos] = useState([]);

    const abrirProduto = (id) => {
        navigate(`/editar-produto/${id}`);
    }

    useEffect(() => {
        if (_dbRecords.current) {
            ProdutoService.findAll().then(
                (response) => {
                    const produtos = response.data;
                    setProdutos(produtos);
                    console.log(produtos);
                }
            ).catch((error) => {
                setProdutos([]);
                console.log(error);
            })
        }
        return () => {
            _dbRecords.current = false;
        };
    }, []);

    return (
        <div className="d-flex" style={{backgroundColor: '#F5F0EB'}}>
            <Sidebar />
            <div className="p-3 w-100" style={{backgroundColor: '#F5F0EB'}}>
                <Header
                    goTo={'/produto'}
                    title={'Lista de Produtos'}
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
                    <table className="table table-hover table-elegant table-produtos">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Preço</th>
                                <th scope="col">Categoria</th>
                                <th scope="col">Status</th>
                                <th scope="col">Abrir</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produtos?.map((produto) => (
                                <tr key={produto.id}>
                                    <th scope="row">{produto.id}</th>
                                    <td>{produto.nome}</td>
                                    <td>{produto.preco}</td>
                                    <td>{produto.categoria.nome}</td>
                                    <td>{produto.statusProduto}</td>
                                    <td>
                                        <button className="btn table-action-btn" onClick={() => abrirProduto(produto.id)}>
                                            <i className="bi bi-folder2-open"></i>
                                            Abrir
                                        </button>
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

export default ProdutosLista;