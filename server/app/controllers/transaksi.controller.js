const db = require("../models");
const Trabsaksi = db.transaksi;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: transaksi } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, transaksi, totalPages, currentPage };
};

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.id_transaksi) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Tutorial
  const customer = {
    id_transaksi: req.body.id_transaksi,
    no_po: req.body.no_po,
    no_surat_jalan: req.body.no_surat_jalan,
    no_invoice: req.body.no_invoice,
    nama_perusahaan: req.body.nama_perusahaan,
    tgl_pembayaran: req.body.tgl_pembayaran,
    total_pembayaran: req.body.total_pembayaran,
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
  const { page, size, id_transaksi } = req.query;
  var condition = id_transaksi
    ? { id_transaksi: { [Op.like]: `%${id_transaksi}%` } }
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
  const id_transaksi = req.params.id_transaksi;

  Customer.findByPk(id_transaksi)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id_transaksi,
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id_transaksi = req.params.id_transaksi;

  Customer.update(req.body, {
    where: { id_transaksi: id_transaksi },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Barang was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Barang with id=${id_transaksi}. Maybe Barang was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Barang with id=" + id_transaksi,
        id_transaksi,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id_transaksi = req.params.id_transaksi;

  Customer.destroy({
    where: { id_transaksi: id_transaksi },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Barang was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Barang with id=${id_transaksi}. Maybe Barang was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Barang with id=" + id_transaksi,
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
