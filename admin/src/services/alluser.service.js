import http from "../http-common.js";

const getAll = (params) => {
  return http.get("/alluser", { params });
};

const get = (id) => {
  return http.get(`/alluser/${id}`);
};

const create = (data) => {
  return http.post("/alluser", data);
};

const update = (id, data) => {
  return http.put(`/alluser/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/alluser/${id}`);
};

const removeAll = () => {
  return http.delete(`/alluser`);
};

const findByNama = (username) => {
  return http.get(`/alluser?nama_alluser=${username}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByNama,
};
