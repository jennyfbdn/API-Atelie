import http from '../common/http-common';

const API_URL = "mensagem/usuario/";

const findByUsuario = (usuarioId) => {
    return http.mainInstance.get(API_URL + `findByUsuario/${usuarioId}`);
};

const enviarMensagem = (data) => {
    return http.mainInstance.post(API_URL + 'enviar', data);
};

const marcarComoLida = (mensagemId) => {
    return http.mainInstance.put(API_URL + `marcarLida/${mensagemId}`);
};

const MensagemUsuarioService = {
    findByUsuario,
    enviarMensagem,
    marcarComoLida,
}

export default MensagemUsuarioService;