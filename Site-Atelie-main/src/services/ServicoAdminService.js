import http from "../common/http-common";

const API_URL = "/servicos/admin/";

const getAll = () => {
    return http.get(API_URL + "findAll");
};

const getByStatus = (status) => {
    return http.get(API_URL + `findByStatus/${status}`);
};

const create = (data) => {
    return http.post(API_URL + "create", data);
};

const update = (id, data) => {
    return http.put(API_URL + `update/${id}`, data);
};

const updateStatus = (id, status) => {
    return http.put(API_URL + `updateStatus/${id}`, { status });
};

const remove = (id) => {
    return http.delete(API_URL + `delete/${id}`);
};

const gerarRelatorio = (dataInicio, dataFim) => {
    return http.get(API_URL + `relatorio?inicio=${dataInicio}&fim=${dataFim}`);
};

const ServicoAdminService = {
    getAll,
    getByStatus,
    create,
    update,
    updateStatus,
    remove,
    gerarRelatorio,
};

export default ServicoAdminService;