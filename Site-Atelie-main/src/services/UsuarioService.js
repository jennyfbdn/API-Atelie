import http from '../common/http-common';
const API_URL = "usuario/";

const findAll = () => {
    return http.mainInstance.get(API_URL + 'findAll');
};

const findById = (id) => {
    return http.mainInstance.get(API_URL + `findById/${id}`);
};

const signup = (nome, email, password) => {
    return http.mainInstance.post(API_URL + "signup", {
        nome,
        email,
        password,
    });
};

const signin = async (email, password) => {
    const response = await http.mainInstance
        .post(API_URL + "login", {
            email,
            senha: password,
        });
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const create = data => {
    const formData = new FormData();
    formData.append('nome', data.nome);
    formData.append('email', data.email);
    formData.append('senha', data.senha);
 formData.append('telefone', data.telefone);
    formData.append('nivelAcesso', data.nivelAcesso);

    return http.mainInstance.post(API_URL + "create", formData);
};

const update = (id, data) => {
    return http.mainInstance.put(API_URL + `editar/${id}`, data);
};

const inativar = (id) => {
    return http.mainInstance.put(API_URL + `inativar/${id}`);
};

const reativar = (id) => {
    return http.mainInstance.put(API_URL + `reativar/${id}`);
};

const alterarSenha = (id, data) => {
    return http.mainInstance.put(API_URL + `alterarSenha/${id}`, {
        senha: data.senha
    });
};

const findByNome = nome => {
    return http.mainInstance.get(API_URL + `findByNome?nome=${nome}`);
};

const forgotPassword = (data) => {
    return http.mainInstance.post(API_URL + "forgotPassword", data);
};

const UsuarioService = {
    findAll,
    findById,
    signup,
    signin,
    logout,
    getCurrentUser,
    create,
    update,
    inativar,
    reativar,
    alterarSenha,
    findByNome,
    forgotPassword,
}

export default UsuarioService;