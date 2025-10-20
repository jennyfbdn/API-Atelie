import { Link } from "react-router-dom"
import Header from "../../components/Header/Header";
import logo from '../../assets/images/primobolan.png';
import imgProfile from '../../assets/images/primobolan.png';
import Sidebar from "../../components/Sidebar/Sidebar";
import '../../assets/styles/theme.css';

const Usuario = () => {

    return (
        <div className="d-flex ">
            <Sidebar />
            <div className="p-3 w-100 " style={{backgroundColor: '#fff6ed'}}>
                <Header
                    goTo={'/home'}
                    title={'Usuário'}
                    logo={logo}
                />

                <div className="d-flex justify-content-around align-items-center py-5">
                    <Link to={'/usuarios'} className="btn btn-lg btn-beige">
                        <i className="bi bi-list me-2"></i>
                        Usuários
                    </Link>
                    <Link to={'/novo-usuario'} className="btn btn-lg" style={{backgroundColor: '#B8956A', color: '#FFFFFF'}}>
                        <i className="bi bi-plus-circle me-2"></i>
                        Novo Usuários
                    </Link>
                </div>
            </div>
        </div>
    )

}

export default Usuario;