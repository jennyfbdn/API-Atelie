import { Link } from "react-router-dom";
import '../../assets/styles/theme.css';

const Header = ({goTo, title, logo}) => {
    return (
        <div>
            <div className="d-flex justify-content-between align-content-center
                            p-3 mb-2 border-bottom shadow rounded bg-white">
                <Link to={goTo} className="btn btn-beige">Voltar</Link>
                <div>
                    <span className="fw-bold h2 text-accent-black">{title}</span>
                </div>
                <div>
                    <img src={logo} alt={'...'} className="img-fluid" width={80} />
                </div>
            </div>
        </div>
    )
}

export default Header;