import { Link } from "react-router-dom"
import { useState, useEffect, useRef } from "react";
import Header from "../../components/Header/Header";
import logo from '../../assets/images/primobolan.png';
import imgProfile from '../../assets/images/primobolan.png';
import Sidebar from "../../components/Sidebar/Sidebar";
import '../../assets/styles/theme.css';

import ProdutoService from "../../services/ProdutoService";

const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const _dbRecords = useRef(true);
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        if (_dbRecords.current) {
            ProdutoService.findAll().then(
                (response) => {
                    const produtos = response.data;
                    setProdutos(produtos);
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

    const handleVerDetalhes = () => {
        alert('O pedido deste produto só é feito pelo app');
    };
    /*
    const [servicos, setServicos] = useState([]);

    useEffect(() => {
        ServicoService.getAll()
            .then(response => {
                setServicos(response.data);
            })
            .catch(error => {
                console.error("Erro ao carregar serviços:", error);
                // Dados mock para demonstração
                setServicos([
                    { id: 1, nome: "Corte de Cabelo", preco: 50.00, duracao: "30 min" },
                    { id: 2, nome: "Manicure", preco: 25.00, duracao: "45 min" },
                    { id: 3, nome: "Pedicure", preco: 30.00, duracao: "60 min" }
                ]);
            });
    }, []);
*/
    return (
        <div className="d-flex" style={{ backgroundColor: '#F8F9FA' }}>
            <Sidebar
                imgProfile={imgProfile}
                username={"Atelie Pano Fino"}
            />
            <div className="p-3 w-100" style={{ backgroundColor: '#fff6ed' }}>
                <Header
                    goTo={'/home'}
                    title={'Home'}
                    logo={logo}
                />

                <div className="container-fluid">
                    <div className="row mb-4">
                        <div className="col-12">
                            <h2 className="text-center mb-4 text-accent-black">Nossa Coleção - Atelie Pano Fino</h2>
                        </div>
                    </div>

                    <div className="row g-4">
                        {produtos?.map((produto) => (
                            <div className="col-md-4" key={produto.id}>
                                <div className="card h-100 card-elegant bg-white">
                                    <div className="card-img-top" 
                                         style={{ height: '250px', backgroundImage: `url(${produto.foto ? 'data:image/jpeg;base64,' + produto.foto : logo})`, 
                                         backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title text-accent-black">{produto.nome}</h5>
                                        <p className="card-text">{produto.descricao}</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="h5 mb-0" style={{ color: '#495057' }}>R$ {produto.preco}</span>
                                            <button className="btn btn-beige btn-sm" onClick={handleVerDetalhes}>Ver Detalhes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )

}

export default Home;