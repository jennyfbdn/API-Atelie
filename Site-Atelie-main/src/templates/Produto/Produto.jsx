import { Link } from "react-router-dom"
import Header from "../../components/Header/Header";
import logo from '../../assets/images/logo.png';
import imgProfile from '../../assets/images/logo.png';
import Sidebar from "../../components/Sidebar/Sidebar";

const Produto = () => {

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100" style={{backgroundColor: '#fff6ed'}}>
                <Header
                    goTo={'/home'}
                    title={'Produto'}
                    logo={logo}
                />

                <div className="container">
                    <div className="row g-4 justify-content-center">
                        <div className="col-md-6">
                            <div className="card text-center p-4">
                                <div className="icon-wrapper">
                                    <i className="bi bi-list"></i>
                                </div>
                                <h4 className="mb-3">Gerenciar Produtos</h4>
                                <p className="text-muted mb-4">Visualize e edite produtos existentes</p>
                                <Link to={'/produtos'} className="btn btn-primary">
                                    <i className="bi bi-list me-2"></i>
                                    Ver Produtos
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card text-center p-4">
                                <div className="icon-wrapper">
                                    <i className="bi bi-plus-circle"></i>
                                </div>
                                <h4 className="mb-3">Novo Produto</h4>
                                <p className="text-muted mb-4">Adicione um novo produto ao catálogo</p>
                                <Link to={'/produto-novo'} className="btn btn-primary">
                                    <i className="bi bi-plus-circle me-2"></i>
                                    Criar Produto
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Produto;