import http from "../common/http-common";

const getAll = () => {
    return http.get("/servicos");
};

const get = (id) => {
    return http.get(`/servicos/${id}`);
};

const create = (data) => {
    return http.post("/servicos", data);
};

const update = (id, data) => {
    return http.put(`/servicos/${id}`, data);
};

const remove = (id) => {
    return http.delete(`/servicos/${id}`);
};

const ServicoService = {
    getAll,
    get,
    create,
    update,
    remove,
};

export default ServicoService;