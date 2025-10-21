import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import ServicoService from "../../services/ServicoService";
import logo from '../../assets/images/logo.png';
import imgProfile from '../../assets/images/logo.png';

const NovoServico = () => {
    const navigate = useNavigate();
    const [servico, setServico] = useState({
        nome: '',
        descricao: '',
        preco: '',
        duracao: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setServico(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const servicoData = {
                ...servico,
                preco: parseFloat(servico.preco) || 0
            };

            await ServicoService.create(servicoData);
            alert('Serviço cadastrado com sucesso!');
            navigate('/servicos');
        } catch (error) {
            console.error('Erro ao cadastrar serviço:', error);
            alert('Erro ao cadastrar serviço. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex" style={{ backgroundColor: '#F8F9FA' }}>
            <Sidebar
                imgProfile={imgProfile}
                username={"Atelie Pano Fino"}
            />
            <div className="p-3 w-100" style={{ backgroundColor: '#fff6ed' }}>
                <Header
                    goTo={'/servicos'}
                    title={'Novo Serviço'}
                    logo={logo}
                />

                <div className="container mt-4">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0">Cadastrar Novo Serviço</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Nome *</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="nome"
                                            value={servico.nome}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Preço (R$) *</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="form-control"
                                            name="preco"
                                            value={servico.preco}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div className="mb-3">
                                    <label className="form-label">Duração</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="duracao"
                                        value={servico.duracao}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Descrição</label>
                                    <textarea
                                        className="form-control"
                                        name="descricao"
                                        value={servico.descricao}
                                        onChange={handleChange}
                                        rows="4"
                                    ></textarea>
                                </div>

                                <div className="d-flex gap-2">
                                    <button type="submit" className="btn btn-primary" disabled={loading}>
                                        {loading ? 'Cadastrando...' : 'Cadastrar'}
                                    </button>
                                    <button type="button" className="btn btn-secondary" onClick={() => navigate('/servicos')}>
                                        Voltar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NovoServico;