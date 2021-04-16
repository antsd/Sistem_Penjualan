const db = require("../models");
const Barang = db.barang;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: barang } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, barang, totalPages, currentPage };
};

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nama_barang) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Tutorial
  const barang = {
    id_barang: req.body.id_barang,
    nama_barang: req.body.nama_barang,
    jenis_barang: req.body.jenis_barang,
    material: req.body.material,
    qty: req.body.qty,
    unit: req.body.unit,
    harga: req.body.harga,
  };

  // Save Tutorial in the database
  Barang.create(barang)
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
  const { page, size, nama_barang } = req.query;
  var condition = nama_barang
    ? { nama_barang: { [Op.like]: `%${nama_barang}%` } }
    : null;

  const { limit, offset } = getPagination(page, size);

  Barang.findAndCountAll({ where: condition, limit, offset })
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
  const id_barang = req.params.id_barang;

  Barang.findByPk(id_barang)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id_barang,
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id_barang = req.params.id_barang;

  Barang.update(req.body, {
    where: { id_barang: id_barang },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Barang was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Barang with id=${id_barang}. Maybe Barang was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Barang with id=" + id,
        id_barang,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id_barang = req.params.id_barang;

  Barang.destroy({
    where: { id_barang: id_barang },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Barang was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Barang with id=${id_barang}. Maybe Barang was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Barang with id=" + id_barang,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Barang.destroy({
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
