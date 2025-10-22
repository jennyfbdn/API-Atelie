import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import imgProfile from '../../assets/images/logo.png';

const Sidebar = () => {
    const location = useLocation();
    const userJson = localStorage.getItem("user");
    const user = JSON.parse(userJson || '{}');
    const isAdmin = user.nivelAcesso === 'ADMIN';

    const isActive = (path) => {
        return location.pathname === path || location.pathname.startsWith(path + '/');
    };

    return(
        <div className="sidebar">
            <div className='sidebar-header'>
                <img src={imgProfile} alt="Logo" className="img-fluid" />
                <h5>Ateliê Pano Fino</h5>
                <p>{isAdmin ? 'Painel Administrativo' : 'Área do Cliente'}</p>
            </div>
            
            <nav className="sidebar-nav">
                {isAdmin ? (
                    // MENU ADMINISTRATIVO
                    <>
                        <Link to={'/home'} className={isActive('/home') ? 'active' : ''}>
                            <i className="bi bi-speedometer2"></i>
                            Dashboard
                        </Link>
                        <Link to={'/produtos'} className={isActive('/produto') ? 'active' : ''}>
                            <i className="bi bi-box"></i>
                            Produtos
                        </Link>
                        
                        <Link to={'/usuarios'} className={isActive('/usuario') ? 'active' : ''}>
                            <i className="bi bi-people"></i>
                            Usuários
                        </Link>
                        <Link to={'/admin/agendamentos'} className={isActive('/admin/agendamentos') ? 'active' : ''}>
                            <i className="bi bi-calendar-check"></i>
                            Agendamentos
                        </Link>
                        <hr />
                        <Link to={'/cliente'}>
                            <i className="bi bi-eye"></i>
                            Visualizar como Cliente
                        </Link>
                    </>
                ) : (
                    // MENU CLIENTE
                    <>
                        <Link to={'/cliente'} className={isActive('/cliente') ? 'active' : ''}>
                            <i className="bi bi-grid"></i>
                            Catálogo
                        </Link>
                        <Link to={'/ver-servicos'} className={isActive('/ver-servicos') ? 'active' : ''}>
                            <i className="bi bi-tools"></i>
                            Serviços
                        </Link>
                        <hr />
                        <Link to={'/'}>
                            <i className="bi bi-arrow-left"></i>
                            Voltar ao Início
                        </Link>
                    </>
                )}
            </nav>
            
            <div className="sidebar-footer">
                <Link to={'/login'} onClick={() => {
                    localStorage.clear();
                    window.location.href = '/login';
                }}>
                    <i className="bi bi-box-arrow-right"></i>
                    Sair da Conta
                </Link>
            </div>
        </div>
    )
}

export default Sidebar;