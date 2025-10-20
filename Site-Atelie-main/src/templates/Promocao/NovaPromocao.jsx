import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import logo from '../../assets/images/primobolan.png';
import PromocaoService from "../../services/PromocaoService";
import ImageUploaderModal from "../../components/ImageUploader/ImageUploaderModal";

const NovaPromocao = () => {
    const usuario = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    const [formData, setFormData] = useState(() => {
        const savedData = localStorage.getItem('novaPromocaoData');
        return savedData ? JSON.parse(savedData) : {
            nome: '',
            descricao: '',
            preco: '',
            desconto: '',
        };
    });

    const [file, setFile] = useState("");
    const [chosenImage, setChosenImage] = useState();
    const setChosenFile = (dataFile) => {
        setFile(dataFile);
    }
    const setImage = (dataImage) => {
        setChosenImage(dataImage);
    }

    useEffect(() => {
        localStorage.setItem('novaPromocaoData', JSON.stringify(formData));
    }, [formData]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            foto: e.target.files[0]
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        PromocaoService.addPromocao(file, formData, usuario).then(
            (response) => {
                localStorage.removeItem('novaPromocaoData');
                navigate('/promocoes');
                /*window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                })*/
            }, (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
            }
        )
    };

    const handleExcluir = () => {
        if (window.confirm('Tem certeza que deseja excluir esta promoção?')) {
            const newFormData = {
                nome: '',
                descricao: '',
                preco: '',
                desconto: '',
            };
            setFormData(newFormData);
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
                    title={'Nova Promoção'}
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
                                    value={formData.nome}
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
                                value={formData.descricao}
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
                                    value={formData.preco}
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
                                    value={formData.desconto}
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

                        <div className="d-flex justify-content-end gap-2">
                            <button type="button" className="btn btn-secondary" onClick={() => navigate('/promocao')}>
                                Cancelar
                            </button>
                            <button type="submit" className="btn btn-success">
                                Salvar Promoção
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NovaPromocao;