import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import logo from '../../assets/images/primobolan.png';
import ProdutoService from "../../services/ProdutoService";
import ImageUploaderModal from "../../components/ImageUploader/ImageUploaderModal";
import UsuarioService from "../../services/UsuarioService";
import CategoriaService from "../../services/CategoriaService";

const EditarProduto = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const usuario = UsuarioService.getCurrentUser();
    const _dbRecords = useRef(true);
    const [categorias, setCategorias] = useState([]);

    const [file, setFile] = useState("");

    // const [produto, setProduto] = useState({});

    const [produto, setProduto] = useState({
        id: null,
        nome: '',
        descricao: '',
        codigoBarras: '',
        preco: '',
        categoria: null,
        usuario: usuario
    });

    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState();

    const [chosenImage, setChosenImage] = useState();

    const setChosenFile = (dataFile) => {
        setFile(dataFile);
    }

    const setImage = (dataImage) => {
        setChosenImage(dataImage);
    }

    /*
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setProduto(produto => ({ ...produto, [name]: value }));
    }

    */

    useEffect(() => {
        if (_dbRecords.current) {
            ProdutoService.findById(id)
                .then(response => {
                    const produto = response.data;
                    setProduto(produto);
                    console.log(produto);
                })
                .catch(e => {
                    console.log(e);
                });
        } return () => {
            _dbRecords.current = false;
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "categoria") {
            setProduto(produto => ({
                ...produto,
                categoria: value // será convertido para objeto no service
            }));
        } else {
            setProduto(produto => ({
                ...produto,
                [name]: value
            }));
        }
    };

    const getCategorias = () => {
        CategoriaService.findAll().then(
            (response) => {
                const categorias = response.data;
                setCategorias(categorias);
            }
        ).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        if (_dbRecords.current) {
            getCategorias();
            console.log(getCategorias());
        }
        return () => {
            _dbRecords.current = false;
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("");
        setSuccessful(false);

        ProdutoService.alterar(id, produto).then(
            (response) => {
                setMessage(response.data.message);
                setSuccessful(true);
                console.log(produto);
                setTimeout(() => {
                navigate('/produto');
            }, 2000);
            }, (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setMessage(resMessage);
                setSuccessful(false);
                setTimeout(() => {
                navigate('/produto');
            }, 2000);
            }
        )
    }

    const handleExcluir = async () => {
        try {
            const result = await ProdutoService.deletar(id);
            setMessage('Produto excluído com sucesso');
            setSuccessful(true);
            setTimeout(() => {
                navigate('/produto');
            }, 2000);
        } catch (error) {
            setMessage('Erro ao excluir produto');
            setSuccessful(false);
        }
   };

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100" style={{ backgroundColor: '#fff6ed' }}>
                <Header
                    goTo={'/produto'}
                    title={'Editar Produto'}
                    logo={logo}
                />

                <div className="border shadow-lg p-4 m-2">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-bold">Nome do Produto:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="nome"
                                    value={produto.nome}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-bold">Código de Barras:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="codigoBarras"
                                    value={produto.codigoBarras}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-bold">Preço:</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="form-control"
                                    name="preco"
                                    value={produto.preco}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputCategoria" className="form-label mb-1 fw-bold">Categoria:</label>
                                <select id="inputCategoria" className="form-select" value={produto.categoria || ""}
                                    name="categoria"
                                    onChange={(e) => handleChange(e)}>

                                    <option value={0}>
                                        Selecione
                                    </option>

                                    {categorias?.map((categoria) => (
                                        <option key={categoria.id} value={categoria.id}>
                                            {categoria.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-bold">Status:</label>
                                <select
                                    className="form-control"
                                    name="status"
                                    value={produto.status || 'ativo'}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="ativo">Ativo</option>
                                    <option value="inativo">Inativo</option>
                                </select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-bold">Foto do Produto:</label>
                                <ImageUploaderModal
                                    setFile={setChosenFile}
                                    setImage={setImage}
                                    chosenImage={chosenImage}
                                    onChange={handleChange} />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Descrição:</label>
                            <textarea
                                className="form-control"
                                name="descricao"
                                rows="3"
                                value={produto.descricao}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        {message && (
                            <div className={`alert ${successful ? 'alert-success' : 'alert-danger'} text-center mb-3`}>
                                {message}
                            </div>
                        )}

                        <div className="d-flex justify-content-between">
                            <button type="button" className="btn btn-danger" onClick={handleExcluir}>
                                Excluir
                            </button>
                            <div className="d-flex gap-2">
                                <button type="button" className="btn btn-secondary" onClick={() => navigate('/produto')}>
                                    Cancelar
                                </button>
                                <button type="submit" className="btn btn-success">
                                    Salvar Produto
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditarProduto;