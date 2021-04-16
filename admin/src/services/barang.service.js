import http from "../http-common.js";

const getAll = (params) => {
  return http.get("/barang", { params });
};

const get = (id_barang) => {
  return http.get(`/barang/${id_barang}`);
};

const create = (data) => {
  return http.post("/barang", data);
};

const update = (id_barang, data) => {
  return http.put(`/barang/${id_barang}`, data);
};

const remove = (id_barang) => {
  return http.delete(`/barang/${id_barang}`);
};

const removeAll = () => {
  return http.delete(`/barang`);
};

const findByNama = (nama_barang) => {
  return http.get(`/barang?nama_barang=${nama_barang}`);
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
