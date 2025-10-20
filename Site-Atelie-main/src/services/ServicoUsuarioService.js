import http from "../common/http-common";

const API_URL = "/servicos/usuario/";

const getMeusServicos = (usuarioId) => {
    return http.get(API_URL + `meus/${usuarioId}`);
};

const solicitarServico = (data) => {
    return http.post(API_URL + "solicitar", data);
};

const getDetalhesServico = (servicoId, usuarioId) => {
    return http.get(API_URL + `detalhes/${servicoId}/${usuarioId}`);
};

const cancelarServico = (servicoId, usuarioId) => {
    return http.put(API_URL + `cancelar/${servicoId}/${usuarioId}`);
};

const ServicoUsuarioService = {
    getMeusServicos,
    solicitarServico,
    getDetalhesServico,
    cancelarServico,
};

export default ServicoUsuarioService;