import http from "../common/http-common";
const API_URL = "produto/";

const findAll = () => {
  return http.mainInstance.get(API_URL + "findAll");
};

const findById = id => {
  return http.mainInstance.get(API_URL + `findById/${id}`);
};

const findByCategoria = id => {
  return http.mainInstance.get(API_URL + `findByCategoria/${id}`);
};

const create = (data, usuario) => {
    const payload = {
        ...data,
        usuario: { id: usuario.id },
        categoria: { id: parseInt(data.categoria) }
    };

    return http.mainInstance.post(API_URL + "create", payload);
};


const createSemFoto = (data) => {
  const formData = new FormData();

  formData.append('nome', data.nome);
  formData.append('descricao', data.descricao);
  formData.append('codigoBarras', data.codigoBarras);
  formData.append('preco', data.preco);
  formData.append('categoria', data.categoria);

  return http.mainInstance.post(API_URL + "createSemFoto", formData);
};

const createComFoto = (file, data) => {
  const formData = new FormData();

  formData.append('file', file);
  formData.append('nome', data.nome);
  formData.append('tipo', data.tipo);
  formData.append('descricao', data.descricao);
  formData.append('codigoBarras', data.codigoBarras);
  formData.append('preco', data.preco);
  formData.append('categoria', data.categoria);

  for (const key of formData.entries()) {
    console.log(key[0] + ', ' + key[1]);
  } 

  return http.multipartInstance.post(API_URL + "createComFoto", formData);
};

const alterar = (id, data) => {
  return http.mainInstance.put(API_URL + `alterar/${id}`, data);
};



const deletar = (id) => {
  return http.multipartInstance.delete(API_URL + `deletar/${id}`);
};


const addCardapio = (id) => {
  return http.multipartInstance.put(API_URL + `addCardapio/${id}`);
};

const findAllCardapio = () => {
  return http.mainInstance.get(API_URL + "findAllCardapio");
};

const ProdutoService = {
  findAll,
  findById,
  findByCategoria,
  create,
  createSemFoto,
  createComFoto,
  alterar,
  deletar,
  addCardapio,
  findAllCardapio
};

export default ProdutoService;