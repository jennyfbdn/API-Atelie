import Header from "../../components/Header/Header";
import logo from '../../assets/images/primobolan.png';
import Sidebar from "../../components/Sidebar/Sidebar";

const VerServicos = () => {
    const servicos = [
        { id: 1, nome: "Ajuste de Roupa", dataCadastro: "2024-01-15", preco: "50.00", statusServico: "Ativo" },
        { id: 2, nome: "Costura Personalizada", dataCadastro: "2024-01-16", preco: "80.00", statusServico: "Ativo" },
        { id: 3, nome: "Reforma de Vestido", dataCadastro: "2024-01-17", preco: "120.00", statusServico: "Ativo" },
        { id: 4, nome: "Bainha de Calça", dataCadastro: "2024-01-18", preco: "30.00", statusServico: "Ativo" },
        { id: 5, nome: "Ajuste de Manga", dataCadastro: "2024-01-19", preco: "40.00", statusServico: "Ativo" }
    ];

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100" style={{ backgroundColor: '#fff6ed' }}>
                <Header
                    goTo={'/home'}
                    title={'Ver Serviços'}
                    logo={logo}
                />
                <div className="container-fluid">
                    <h2 className="text-center mb-4">Serviços Disponíveis</h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Data</th>
                                <th>Preço</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {servicos.map((servico) => (
                                <tr key={servico.id}>
                                    <td>{servico.id}</td>
                                    <td>{servico.nome}</td>
                                    <td>{servico.dataCadastro}</td>
                                    <td>R$ {servico.preco}</td>
                                    <td>{servico.statusServico}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default VerServicos;