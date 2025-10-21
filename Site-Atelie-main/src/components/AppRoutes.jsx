import { Routes, Route } from 'react-router-dom';
import App from '../templates/App/App'
import Home from '../templates/Home/Home';
import Login from '../templates/Login/Login';
import Landing from '../templates/Landing/Landing';
import Cliente from '../templates/Cliente/Cliente';
import Produto from '../templates/Produto/Produto';
import Promocao from '../templates/Promocao/Promocao';
import Usuario from '../templates/Usuario/Usuario';
import MensagensLista from '../templates/Mensagem/MensagensLista';

import PromocoesLista from '../templates/Promocao/PromocoesLista';
import UsuariosLista from '../templates/Usuario/UsuariosLista';
import ServicosLista from '../templates/Servico/ServicosLista';
import LoginAlterarSenha from '../templates/Login/LoginAlterarSenha';
import ForgotPassword from '../templates/Login/ForgotPassword';
import Cadastro from '../templates/Login/Cadastro';
import Mensagens from '../templates/Mensagens/Mensagens';
import VisualizarConversa from '../templates/Mensagem/VisualizarConversa';
import MinhasMensagens from '../templates/Mensagem/MinhasMensagens';
import NovaMensagem from '../templates/Mensagem/NovaMensagem';
import MeusServicos from '../templates/Servico/MeusServicos';
import SolicitarServico from '../templates/Servico/SolicitarServico';
import NovoServico from '../templates/Servico/NovoServico';
import NovoServicoPage from '../templates/NovoServico/NovoServico';
import VisualizarServico from '../templates/Servico/VisualizarServico';
import NovoProduto from '../templates/Produto/NovoProduto';
import ProdutoNovo from '../templates/Produto/ProdutoNovo';
import ProdutosLista from '../templates/Produto/ProdutosLista';
import NovaPromocao from '../templates/Promocao/NovaPromocao';
import EditarPromocao from '../templates/Promocao/EditarPromocao';
import EditarProduto from '../templates/Produto/EditarProduto';
import NovoUsuario from '../templates/Usuario/NovoUsuario';
import UsuarioEditar from '../templates/Usuario/UsuarioEditar';
import VerProdutos from '../templates/Produto/VerProdutos';
import VerServicos from '../templates/Servico/VerServicos';
import CategoriaDetalhes from '../templates/Produto/CategoriaDetalhes';
import AdminAgendamentos from '../pages/AdminAgendamentos';
import AdminEncomendas from '../pages/AdminEncomendas';
import AdminServicos from '../pages/AdminServicos';

import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path={"/"} element={<Landing />} />
            <Route path={"/cliente"} element={<Cliente />} />
            <Route path={"/home"} element={<Home /> } />
            <Route path={"/login"} element={<Login /> } />
            <Route path={"/cadastro"} element={<Cadastro /> } />
            <Route path={"/forgotpass"} element={<ForgotPassword /> } />

            <Route path={"/alterarsenha/:id"} element={<LoginAlterarSenha /> } />

            <Route path={"/produto"} element={<ProtectedRoute adminOnly={true}><Produto /></ProtectedRoute>} />
            <Route path={"/promocao"} element={<ProtectedRoute adminOnly={true}><Promocao /></ProtectedRoute>} />
            <Route path={"/usuario"} element={<ProtectedRoute adminOnly={true}><Usuario /></ProtectedRoute>} />

            <Route path={"/mensagens"} element={<MensagensLista /> } />
            <Route path={"/produtos"} element={<ProdutosLista /> } />
            <Route path={"/promocoes"} element={<PromocoesLista /> } />
            <Route path={"/usuarios"} element={<ProtectedRoute adminOnly={true}><UsuariosLista /></ProtectedRoute>} />
            <Route path={"/servicos"} element={<ServicosLista /> } />
            <Route path={"/mensagens-bot"} element={<Mensagens /> } />
            <Route path={"/conversa/:tipo"} element={<VisualizarConversa /> } />
            <Route path={"/novo-servico"} element={<ProtectedRoute adminOnly={true}><NovoServicoPage /></ProtectedRoute>} />
            <Route path={"/servico/:id"} element={<VisualizarServico /> } />
            <Route path={"/novo-produto"} element={<ProtectedRoute adminOnly={true}><NovoProduto /></ProtectedRoute>} />
            <Route path={"/produto-novo"} element={<ProtectedRoute adminOnly={true}><ProdutoNovo /></ProtectedRoute>} />
            <Route path={"/nova-promocao"} element={<ProtectedRoute adminOnly={true}><NovaPromocao /></ProtectedRoute>} />
            <Route path={"/editar-promocao"} element={<ProtectedRoute adminOnly={true}><EditarPromocao /></ProtectedRoute>} />
            <Route path={"/editar-produto/:id"} element={<ProtectedRoute adminOnly={true}><EditarProduto /></ProtectedRoute>} />
            <Route path={"/novo-usuario"} element={<ProtectedRoute adminOnly={true}><NovoUsuario /></ProtectedRoute>} />
            <Route path={"/usuario-editar/:id"} element={<ProtectedRoute adminOnly={true}><UsuarioEditar /></ProtectedRoute>} />

            <Route path={"/minhas-mensagens"} element={<MinhasMensagens /> } />
            <Route path={"/nova-mensagem"} element={<NovaMensagem /> } />
            <Route path={"/meus-servicos"} element={<MeusServicos /> } />
            <Route path={"/solicitar-servico"} element={<SolicitarServico /> } />
            <Route path={"/ver-produtos"} element={<VerProdutos /> } />
            <Route path={"/ver-servicos"} element={<VerServicos /> } />
            <Route path={"/categoria/:id"} element={<CategoriaDetalhes /> } />
            <Route path={"/admin/agendamentos"} element={<ProtectedRoute adminOnly={true}><AdminAgendamentos /></ProtectedRoute>} />
            <Route path={"/admin/encomendas"} element={<ProtectedRoute adminOnly={true}><AdminEncomendas /></ProtectedRoute>} />
            <Route path={"/admin/servicos"} element={<ProtectedRoute adminOnly={true}><AdminServicos /></ProtectedRoute>} />

        </Routes>
    )
}

export default AppRoutes;
