import { useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom';
import logo from '../../assets/images/primobolan.png';
import '../../assets/styles/theme.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-elegant">
        <div className="container-fluid">
          <img src={logo} alt="" className='rounded-circle' width={40} />
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#produtos">Produtos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#quemsomos">Quem Somos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#faleconosco">Fale Conosco</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <section id='home' className='py-5 bg-light-beige'>
        <div className='container'>
          <div className='row'>
            <div className='col-12 text-center'>
              <h1 className='display-4 mb-4 text-accent-black'>Atelie Pano Fino</h1>
              <p className='lead'>Roupas sob medida com qualidade e elegância</p>
            </div>
          </div>
        </div>
      </section>
      
      <section id='produtos' className='py-5 bg-white'>
        <div className='container'>
          <div className='row'>
            <div className='col-12 text-center mb-5'>
              <h2 className='text-accent-black'>Nossos Produtos</h2>
            </div>
          </div>
          <div className='row g-4'>
            <div className='col-md-4'>
              <div className='card h-100 card-elegant bg-white'>
                <div className='card-img-top bg-secondary-beige d-flex align-items-center justify-content-center' style={{height: '250px'}}>
                  <i className='bi bi-image' style={{fontSize: '3rem', color: 'var(--dark-beige)'}}></i>
                </div>
                <div className='card-body text-center'>
                  <h5 className='card-title text-accent-black'>Vestidos</h5>
                  <p className='card-text'>Vestidos elegantes para todas as ocasiões</p>
                  <span className='h5 text-dark-beige'>A partir de R$ 200,00</span>
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='card h-100 card-elegant bg-white'>
                <div className='card-img-top bg-secondary-beige d-flex align-items-center justify-content-center' style={{height: '250px'}}>
                  <i className='bi bi-image' style={{fontSize: '3rem', color: 'var(--dark-beige)'}}></i>
                </div>
                <div className='card-body text-center'>
                  <h5 className='card-title text-accent-black'>Ternos</h5>
                  <p className='card-text'>Ternos sob medida com acabamento premium</p>
                  <span className='h5 text-dark-beige'>A partir de R$ 400,00</span>
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='card h-100 card-elegant bg-white'>
                <div className='card-img-top bg-secondary-beige d-flex align-items-center justify-content-center' style={{height: '250px'}}>
                  <i className='bi bi-image' style={{fontSize: '3rem', color: 'var(--dark-beige)'}}></i>
                </div>
                <div className='card-body text-center'>
                  <h5 className='card-title text-accent-black'>Camisas</h5>
                  <p className='card-text'>Camisas sociais e casuais personalizadas</p>
                  <span className='h5 text-dark-beige'>A partir de R$ 150,00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section id='quemsomos' className='py-5 bg-light-beige'>
        <div className='container'>
          <div className='row'>
            <div className='col-12 text-center mb-4'>
              <h2 className='text-accent-black'>Quem Somos</h2>
            </div>
            <div className='col-md-6 offset-md-3'>
              <p className='text-center'>O Atelie Pano Fino é especializado em roupas sob medida, oferecendo peças únicas com qualidade superior e acabamento impecável. Nossa equipe de profissionais experientes garante que cada peça seja feita com cuidado e atenção aos detalhes.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section id='faleconosco' className='py-5'>
        <div className='container'>
          <div className='row'>
            <div className='col-12 text-center mb-4'>
              <h2 className='text-accent-black'>Fale Conosco</h2>
            </div>
            <div className='col-md-6 offset-md-3'>
              <div className='card'>
                <div className='card-body'>
                  <form>
                    <div className='mb-3'>
                      <input type='text' className='form-control' placeholder='Seu nome' />
                    </div>
                    <div className='mb-3'>
                      <input type='email' className='form-control' placeholder='Seu email' />
                    </div>
                    <div className='mb-3'>
                      <textarea className='form-control' rows='4' placeholder='Sua mensagem'></textarea>
                    </div>
                    <div className='text-center'>
                      <button type='submit' className='btn btn-beige'>Enviar Mensagem</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer>
          <Link to={"/login"} className='btn btn-accent-black text-white'>Entrar</Link>
      </footer>
    </div>
  )
}

export default App;
