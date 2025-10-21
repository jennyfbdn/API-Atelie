import httpCommom from "../common/http-common";

const API_URL = "/encomenda";

const getAll = () => {
    return httpCommom.mainInstance.get(API_URL + "/findAll");
};

const getByUsuario = (usuarioId) => {
    return httpCommom.mainInstance.get(API_URL + `/usuario/${usuarioId}`);
};

const create = (data) => {
    return httpCommom.mainInstance.post(API_URL + "/create", data);
};

const marcarComoPronta = (id) => {
    return httpCommom.mainInstance.put(API_URL + `/${id}/pronta`);
};

const EncomendaService = {
    getAll,
    getByUsuario,
    create,
    marcarComoPronta,
};

export default EncomendaService;