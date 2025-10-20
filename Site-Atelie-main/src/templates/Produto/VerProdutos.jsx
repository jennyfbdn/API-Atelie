import { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import Header from "../../components/Header/Header";
import logo from '../../assets/images/primobolan.png';
import imgProfile from '../../assets/images/primobolan.png';
import Sidebar from "../../components/Sidebar/Sidebar";
import '../../assets/styles/theme.css';
import CategoriaService from "../../services/CategoriaService";
import ProdutoService from "../../services/ProdutoService";

const carrosselStyle = `
    @keyframes scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-1400px); }
    }
    .carrossel-animado {
        animation: scroll 12s linear infinite;
    }
    .carrossel-animado:hover {
        animation-play-state: paused;
    }
    .carrossel-container {
        width: 100%;
        max-width: 1400px;
        overflow: hidden;
        margin: 0 auto;
    }
`;

const VerProdutos = () => {

    const _dbRecords = useRef(true);
    const [categorias, setCategorias] = useState([]);
    const [produtos, setProdutos] = useState([]);

    const getCategorias = () => {
        CategoriaService.findAll().then(
            (response) => {
                const categorias = response.data;
                setCategorias(categorias);
            }
        ).catch((error) => {
            console.log(error);
        })
    }

    const getProdutos = () => {
        ProdutoService.findAll().then(
            (response) => {
                const produtos = response.data;
                setProdutos(produtos);
                console.log(response.data);

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
    // Adicionar estilo CSS
    if (!document.getElementById('carrossel-style')) {
        const style = document.createElement('style');
        style.id = 'carrossel-style';
        style.textContent = carrosselStyle;
        document.head.appendChild(style);
    }

    const handleVerDetalhes = () => {
        alert('O pedido deste produto só é feito pelo app');
    };

    const CarrosselComponent = ({ items, title }) => (
        <div className="mb-4">
            <h4 className="text-accent-black mb-3">{title}</h4>
            <div className="carrossel-container mx-auto">
                <div className="d-flex carrossel-animado" style={{
                    gap: '30px',
                    width: '2800px'
                }}>
                    {items.concat(items).map((item, index) => (
                        <div key={`${item.id}-${index}`} className="flex-shrink-0" style={{ width: '320px' }}>
                            <Link to={`/categoria/${item.id}`} style={{ textDecoration: 'none' }}>
                                <div className="card card-elegant">
                                    <div className="card-img-top"
                                        style={{
                                            height: '200px', backgroundImage: `url('../../assets/images/primobolan.png')`,
                                            backgroundSize: 'cover', backgroundPosition: 'center'
                                        }}>
                                    </div>
                                    <div className="card-body text-center">
                                        <h6 className="card-title">{item.nome}</h6>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="d-flex" style={{ backgroundColor: '#F8F9FA' }}>
            <Sidebar />
            <div className="p-3 w-100" style={{ backgroundColor: '#fff6ed' }}>
                <Header
                    goTo={'/home'}
                    title={'Ver Produtos'}
                    logo={logo}
                />

                <div className="container-fluid">
                    <div className="row mb-4">
                        <div className="col-12">
                            <h2 className="text-center mb-4 text-accent-black">Catálogo de Produtos</h2>
                        </div>
                    </div>


                    <CarrosselComponent items={categorias} title="Categorias" />


                    <div className="row mb-4">
                        <div className="col-12">
                            <h3 className="text-accent-black mb-3">Todos os Produtos</h3>
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

export default VerProdutos;