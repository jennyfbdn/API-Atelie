import httpCommom from "../common/http-common";

const API_URL = "/agendamentos";

const getAll = () => {
    return httpCommom.mainInstance.get(API_URL + "/findAll");
};

const getByUsuario = (usuarioId) => {
    return httpCommom.mainInstance.get(API_URL + `/usuario/${usuarioId}`);
};

const create = (data) => {
    return httpCommom.mainInstance.post(API_URL, data);
};

const AgendamentoService = {
    getAll,
    getByUsuario,
    create,
};

export default AgendamentoService;