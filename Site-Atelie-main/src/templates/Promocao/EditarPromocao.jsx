import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import logo from '../../assets/images/primobolan.png';
import PromocaoService from "../../services/PromocaoService";
import ImageUploaderModal from "../../components/ImageUploader/ImageUploaderModal";

const EditarPromocao = () => {
    const usuario = JSON.parse(localStorage.getItem('user')) || { id: 1 };
    const navigate = useNavigate();

    const [promocao, setPromocao] = useState(() => {
        const savedData = localStorage.getItem('promocaoEditando');
        return savedData ? JSON.parse(savedData) : {
            id: '',
            nome: '',
            descricao: '',
            preco: '',
            desconto: '',
        };
    });

    const [message, setMessage] = useState('');
    const [successful, setSuccessful] = useState(false);

    useEffect(() => {
        const savedData = localStorage.getItem('promocaoEditando');
        if (savedData) {
            const promocaoData = JSON.parse(savedData);
            setPromocao(promocaoData);
            if (promocaoData.foto) {
                setChosenImage('data:image/jpeg;base64,' + promocaoData.foto);
            }
        }
    }, []);


    const [file, setFile] = useState("");
    const [chosenImage, setChosenImage] = useState();

    const setChosenFile = (dataFile) => {
        setFile(dataFile);
    }
    const setImage = (dataImage) => {
        setChosenImage(dataImage);
    }

    const handleChange = (e) => {
        setPromocao({
            ...promocao,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        setPromocao({
            ...promocao,
            foto: e.target.files[0]
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("");
        setSuccessful(false);

        try {
            PromocaoService.alterar(file || "", promocao.id, promocao, usuario).then(
                (response) => {
                    setMessage('Promoção alterada com sucesso!');
                    setSuccessful(true);
                    setTimeout(() => {
                        localStorage.removeItem('promocaoEditando');
                        navigate('/promocoes');
                    }, 2000);
                }
            ).catch((error) => {
                setMessage('Erro ao alterar promoção!');
                setSuccessful(false);
            });
        } catch (error) {
            setMessage('Erro ao alterar promoção!');
            setSuccessful(false);
        }
    };

    const handleExcluir = () => {
        if (window.confirm('Tem certeza que deseja excluir esta promoção?')) {
            const newFormData = {
                nome: '',
                descricao: '',
                preco: '',
                desconto: '',
            };
            setPromocao(newFormData);
            localStorage.removeItem('novaPromocaoData');
            setFile("");
            setChosenImage();
            alert('Formulário limpo!');
        }
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100" style={{ backgroundColor: '#fff6ed' }}>
                <Header
                    goTo={'/promocao'}
                    title={'Editar Promoção'}
                    logo={logo}
                />

                <div className="border shadow-lg p-4 m-2">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-bold">Nome da Promoção:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="nome"
                                    value={promocao.nome}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Descrição:</label>
                            <textarea
                                className="form-control"
                                name="descricao"
                                rows="3"
                                value={promocao.descricao}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-bold">Preço (R$):</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="form-control"
                                    name="preco"
                                    value={promocao.preco}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-bold">Desconto (%):</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    className="form-control"
                                    name="desconto"
                                    value={promocao.desconto}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-bold">Foto da Promoção:</label>

                                <ImageUploaderModal
                                    setFile={setChosenFile}
                                    setImage={setImage}
                                    chosenImage={chosenImage} />

                            </div>
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
                                <button type="button" className="btn btn-secondary" onClick={() => navigate('/promocao')}>
                                    Cancelar
                                </button>
                                <button type="submit" className="btn btn-success">
                                    Salvar Promoção
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditarPromocao;