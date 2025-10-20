import { Link } from 'react-router-dom';
import './Sidebar.css';
import UsuarioService from '../../services/UsuarioService';
import imgProfile from '../../assets/images/primobolan.png';
import '../../assets/styles/theme.css';

const Sidebar = () => {

    //const usuario = UsuarioService.getCurrentUser();
   // const tipoAcesso = localStorage.getItem("tipoAcesso") || 'USUARIO';
    //const isAdmin = tipoAcesso === 'ADMIN';

    const userJson = localStorage.getItem("user");
    const user = JSON.parse(userJson || '{}');
    const isAdmin = user.nivelAcesso == 'ADMIN';

    return(
        <div className="sidebar sidebar-elegant">
            <div className='m-1'>
                <img src={imgProfile} alt="" className="img-fluid" width={80} />
                <span className="fw-bold ms-1">Atelie Pano Fino</span>
            </div>
            <nav className="nav flex-column">
                <Link to={'/home'} className='nav-link'>Home</Link>
                
                {isAdmin ? (
                    <>
                        <Link to={'/produto'} className='nav-link'>Produto</Link>
                        <Link to={'/promocao'} className='nav-link'>Promoção</Link>
                        <Link to={'/usuario'} className='nav-link'>Usuário</Link>
                    </>
                ) : (
                    <>
                        <Link to={'/ver-produtos'} className='nav-link'>Produtos</Link>
                        <Link to={'/promocoes'} className='nav-link'>Promoções</Link>
                        <Link to={'/ver-servicos'} className='nav-link'>Serviços</Link>
                    </>
                )}
                <Link to={'/login'} className='nav-link'>Sair</Link>
            </nav>
        </div>
    )
}

export default Sidebar;