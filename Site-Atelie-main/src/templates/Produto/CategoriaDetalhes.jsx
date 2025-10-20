import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import logo from '../../assets/images/primobolan.png';
import { useParams } from 'react-router-dom';
import CategoriaService from "../../services/CategoriaService";
import { useEffect, useRef, useState } from "react";
import ProdutoService from "../../services/ProdutoService";

const CategoriaDetalhes = () => {
    const { id } = useParams();
    const _dbRecords = useRef(true);
    const [categoria, setCategoria] = useState();
    const [produtos, setProdutos] = useState([]);

    const getCategorias = () => {
        CategoriaService.findById(id).then(
            (response) => {
                const categoria = response.data;
                setCategoria(categoria);
            }
        ).catch((error) => {
            console.log(error);
        })
    }

    const getProdutos = () => {
        ProdutoService.findByCategoria(id).then(
            (response) => {
                const produtos = response.data;
                setProdutos(produtos);
            }
        ).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        if (_dbRecords.current) {
            getCategorias();
            getProdutos();
        }
        return () => {
            _dbRecords.current = false;
        }
    }, []);

    const handleVerDetalhes = () => {
        alert('O pedido deste produto só é feito pelo app');
    };

    return (
        <div className="d-flex" style={{ backgroundColor: '#F8F9FA' }}>
            <Sidebar />
            <div className="p-3 w-100" style={{ backgroundColor: '#fff6ed' }}>
                <Header
                    goTo={'/ver-produtos'}
                    title={'Categoria Detalhes'}
                    logo={logo}
                />

                <div className="container-fluid">
                    <div className="row mb-4">
                        <div className="col-12">
                            <h2 className="text-center mb-4 text-accent-black">
                                Categoria: {categoria?.nome}
                            </h2>
                        </div>
                    </div>

                    <div className="row g-4">
                        {produtos.map((produto) => (
                            <div className="col-md-4" key={produto.id}>
                                <div className="card h-100 card-elegant bg-white">
                                    <div
                                        className="card-img-top"
                                        style={{
                                            height: '250px',
                                            backgroundImage: `url(${produto.foto ? 'data:image/jpeg;base64,' + produto.foto : logo})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}
                                    ></div>
                                    <div className="card-body">
                                        <h5 className="card-title text-accent-black">{produto.nome}</h5>
                                        <p className="card-text">{produto.descricao}</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="h5 mb-0" style={{ color: '#495057' }}>
                                                R$ {Number(produto.preco).toFixed(2)}
                                            </span>
                                            <button className="btn btn-beige btn-sm" onClick={handleVerDetalhes}>
                                                Ver Detalhes
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoriaDetalhes;