import { Link } from "react-router-dom"
import Header from "../../components/Header/Header";
import logo from '../../assets/images/primobolan.png';
import Sidebar from "../../components/Sidebar/Sidebar";

const Mensagem = () => {

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100" style={{backgroundColor: '#fff6ed'}}>
                <Header
                    goTo={'/home'}
                    title={'Mensagem'}
                    logo={logo}
                />
                <div className="d-flex justify-content-around align-items-center py-5">
                    <Link to={'/mensagens'} className="btn btn-lg" style={{backgroundColor: '#2C2C2C', color: '#FFFFFF'}}>
                        <i className="bi bi-list me-2"></i>
                        Mensagens
                    </Link>
                    <Link to={'/mensagens-bot'} className="btn btn-lg" style={{backgroundColor: '#B8956A', color: '#FFFFFF'}}>
                        <i className="bi bi-plus-circle me-2"></i>
                        Nova Mensagem
                    </Link>
                </div>
            </div>
        </div>
    )

}

export default Mensagem;