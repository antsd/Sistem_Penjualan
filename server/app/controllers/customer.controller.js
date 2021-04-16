const db = require("../models");
const Customer = db.customer;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: customer } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, customer, totalPages, currentPage };
};

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nama_perusahaan) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Tutorial
  const customer = {
    id_perusahaan: req.body.id_perusahaan,
    nama_perusahaan: req.body.nama_perusahaan,
    contact_person: req.body.contact_person,
    alamat: req.body.alamat,
    no_telp: req.body.no_telp,
    fax: req.body.fax,
    jenis_perusahaan: req.body.jenis_perusahaan,
  };

  // Save Tutorial in the database
  Customer.create(customer)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Barang.",
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const { page, size, nama_perusahaan } = req.query;
  var condition = nama_perusahaan
    ? { nama_perusahaan: { [Op.like]: `%${nama_perusahaan}%` } }
    : null;

  const { limit, offset } = getPagination(page, size);

  Customer.findAndCountAll({ where: condition, limit, offset })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id_perusahaan = req.params.id_perusahaan;

  Customer.findByPk(id_perusahaan)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id_perusahaan,
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id_perusahaan = req.params.id_perusahaan;

  Customer.update(req.body, {
    where: { id_perusahaan: id_perusahaan },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Barang was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Barang with id=${id_perusahaan}. Maybe Barang was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Barang with id=" + id_perusahaan,
        id_perusahaan,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id_perusahaan = req.params.id_perusahaan;

  Customer.destroy({
    where: { id_perusahaan: id_perusahaan },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Barang was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Barang with id=${id_perusahaan}. Maybe Barang was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Barang with id=" + id_perusahaan,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Customer.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Barang were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Barang.",
      });
    });
};
