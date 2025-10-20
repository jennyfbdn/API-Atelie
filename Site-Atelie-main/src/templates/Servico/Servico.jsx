import { Link } from "react-router-dom"
import Header from "../../components/Header/Header";
import logo from '../../assets/images/primobolan.png';
import Sidebar from "../../components/Sidebar/Sidebar";
import '../../assets/styles/theme.css';

const Servico = () => {

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100" style={{backgroundColor: '#fff6ed'}}>
                <Header
                    goTo={'/home'}
                    title={'Serviço'}
                    logo={logo}
                />

                <div className="d-flex justify-content-around align-items-center py-5">
                    <Link to={'/servicos'} className="btn btn-lg btn-beige">
                        <i className="bi bi-list me-2"></i>
                        Serviços
                    </Link>
                    <Link to={'/novo-servico'} className="btn btn-lg" style={{backgroundColor: '#B8956A', color: '#FFFFFF'}}>
                        <i className="bi bi-plus-circle me-2"></i>
                        Novo Serviço
                    </Link>
                </div>
            </div>
        </div>
    )

}

export default Servico;