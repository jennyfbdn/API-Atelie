import http from "../common/http-common";
const API_URL = "categoria/";

const findAll = () => {
  return http.mainInstance.get(API_URL + "findAll");
};

const findById = id => {
  return http.mainInstance.get(API_URL + `findById/${id}`);
};

const create = (data) => {
  return http.mainInstance.post(API_URL + "create", data);
};

const update = (id, data) => {
  return http.mainInstance.put(API_URL + `update/${id}`, data);
};

const CategoriaService = {
  findAll,
  findById,
  create,
  update
};

export default CategoriaService;