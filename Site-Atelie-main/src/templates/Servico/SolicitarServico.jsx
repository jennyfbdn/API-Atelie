import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import logo from '../../assets/images/primobolan.png';

const SolicitarServico = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        tipoServico: '',
        descricao: '',
        dataDesejada: '',
        observacoes: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simular solicitação do serviço
        console.log('Solicitando serviço:', formData);
        alert('Solicitação enviada com sucesso!');
        navigate('/meus-servicos');
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100" style={{backgroundColor: '#fff6ed'}}>
                <Header
                    goTo={'/servico-usuario'}
                    title={'Solicitar Serviço'}
                    logo={logo}
                />
                <div className="border shadow-lg p-4 m-2">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="tipoServico" className="form-label fw-bold">Tipo de Serviço:</label>
                            <select 
                                className="form-select" 
                                id="tipoServico"
                                name="tipoServico"
                                value={formData.tipoServico}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecione o tipo de serviço</option>
                                <option value="ajuste">Ajuste de Roupa</option>
                                <option value="conserto">Conserto</option>
                                <option value="customizacao">Customização</option>
                                <option value="confeccao">Confecção</option>
                            </select>
                        </div>
                        
                        <div className="mb-3">
                            <label htmlFor="descricao" className="form-label fw-bold">Descrição do Serviço:</label>
                            <textarea 
                                className="form-control" 
                                id="descricao"
                                name="descricao"
                                rows="4"
                                value={formData.descricao}
                                onChange={handleChange}
                                placeholder="Descreva detalhadamente o serviço desejado..."
                                required
                            ></textarea>
                        </div>
                        
                        <div className="mb-3">
                            <label htmlFor="dataDesejada" className="form-label fw-bold">Data Desejada para Entrega:</label>
                            <input 
                                type="date" 
                                className="form-control" 
                                id="dataDesejada"
                                name="dataDesejada"
                                value={formData.dataDesejada}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        <div className="mb-3">
                            <label htmlFor="observacoes" className="form-label fw-bold">Observações Adicionais:</label>
                            <textarea 
                                className="form-control" 
                                id="observacoes"
                                name="observacoes"
                                rows="3"
                                value={formData.observacoes}
                                onChange={handleChange}
                                placeholder="Informações adicionais (opcional)..."
                            ></textarea>
                        </div>
                        
                        <div className="d-flex justify-content-end gap-2">
                            <button 
                                type="button" 
                                className="btn btn-secondary"
                                onClick={() => navigate('/servico-usuario')}
                            >
                                Cancelar
                            </button>
                            <button type="submit" className="btn btn-primary">
                                <i className="bi bi-check-circle me-2"></i>
                                Solicitar Serviço
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SolicitarServico;