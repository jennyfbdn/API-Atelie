import { Link, useNavigate } from "react-router-dom"
import Header from "../../components/Header/Header";
import logo from '../../assets/images/primobolan.png';

import Sidebar from "../../components/Sidebar/Sidebar";
import '../../assets/styles/theme.css';
import { useEffect, useRef, useState } from "react";
import PromocaoService from "../../services/PromocaoService";

const PromocoesLista = () => {

     const navigate = useNavigate();
    const _dbRecords = useRef(true);

    const [promocoes, setPromocoes] = useState([]);

    const verDetalhes = (promocao) => {
        localStorage.setItem('promocaoEditando', JSON.stringify(promocao));
        navigate('/editar-promocao');
    }

    useEffect(() => {
        if (_dbRecords.current) {
            PromocaoService.findAll().then(
                (response) => {
                    const promocoes = response.data;
                    setPromocoes(promocoes);
                    console.log(promocoes);
                }
            ).catch((error) => {
                setPromocoes([]);
                console.log(error);
            })
        }
        return () => {
            _dbRecords.current = false;
        }
    }, []);

    return (
        <div className="d-flex bg-light-beige">
            <Sidebar />
            <div className="p-3 w-100 bg-light-beige" style={{ backgroundColor: '#fff6ed' }}>
                <Header
                    goTo={'/promocao'}
                    title={'Lista de Promoções'}
                    logo={logo}
                />
                <div className="container-fluid">
                    <div className="row mb-4">
                        <div className="col-12">
                            <h2 className="text-center mb-4 text-accent-black">Promoções Ativas - Atelie Pano Fino</h2>
                        </div>
                        <div className="row g-4">
                            {promocoes?.map((promocao) => (
                                <div className="col-md-4" key={promocao.id}>
                                    <div className="card h-100 card-elegant bg-white">
                                        <div className="card-img-top" 
                                             style={{ height: '250px', backgroundImage: `url(${promocao.foto ? 'data:image/jpeg;base64,' + promocao.foto : logo})`, 
                                             backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title text-accent-black">{promocao.nome}</h5>
                                            <p className="card-text">Desconto de {promocao.desconto}% - Válida até {promocao.dataCadastro}</p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className="h5 mb-0" style={{ color: '#495057' }}>{promocao.desconto}% OFF</span>
                                                <button 
                                                    className="btn btn-beige btn-sm" 
                                                    onClick={() => verDetalhes(promocao)}>
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
        </div>
    )

}

export default PromocoesLista;