import http from '../common/http-common';

const API_URL = "mensagem/admin/";

const findAll = () => {
    return http.mainInstance.get(API_URL + 'findAll');
};

const findByStatus = (status) => {
    return http.mainInstance.get(API_URL + `findByStatus/${status}`);
};

const responderMensagem = (mensagemId, resposta) => {
    return http.mainInstance.post(API_URL + `responder/${mensagemId}`, { resposta });
};

const deletarMensagem = (mensagemId) => {
    return http.mainInstance.delete(API_URL + `delete/${mensagemId}`);
};

const gerarRelatorio = (dataInicio, dataFim) => {
    return http.mainInstance.get(API_URL + `relatorio?inicio=${dataInicio}&fim=${dataFim}`);
};

const MensagemAdminService = {
    findAll,
    findByStatus,
    responderMensagem,
    deletarMensagem,
    gerarRelatorio,
}

export default MensagemAdminService;