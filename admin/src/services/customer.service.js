import http from "../http-common.js";

const getAll = (params) => {
  return http.get("/customer", { params });
};

const get = (id_perusahaan) => {
  return http.get(`/customer/${id_perusahaan}`);
};

const create = (data) => {
  return http.post("/customer", data);
};

const update = (id_perusahaan, data) => {
  return http.put(`/customer/${id_perusahaan}`, data);
};

const remove = (id_perusahaan) => {
  return http.delete(`/customer/${id_perusahaan}`);
};

const removeAll = () => {
  return http.delete(`/customer`);
};

const findByNama = (nama_perusahaan) => {
  return http.get(`/customer?nama_perusahaan=${nama_perusahaan}`);
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
