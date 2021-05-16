const db = require("../models");
const Po = db.po;
const Barang = db.barang;
const Customer = db.customer;
const Op = db.Sequelize.Op;
const Sequelize = require("sequelize");
const suratJalanTemplate = require("../documents/Surat-jalan");
const invoiceTemplate = require("../documents/Invoice");
const path = require("path");
const pdf = require("html-pdf");

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: po } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, po, totalPages, currentPage };
};

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.id_po) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  try {
    const { barang, ...data } = req.body;
    const po = await Po.create(data);

    if (barang && barang.length > 0) {
      po.setBarang(barang);
    }
    return res.status(200).json(po);
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials.",
    });
  }
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const { page, size, id_po } = req.query;
  var condition = id_po ? { id_po: { [Op.like]: `%${id_po}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  Po.findAndCountAll({
    where: condition,
    limit,
    offset,
    include: [
      {
        model: Customer,
        as: "perusahaan",
        attributes: [
          "id_perusahaan",
          "nama_perusahaan",
          "contact_person",
          "alamat",
          "no_telp",
          "fax",
          "jenis_perusahaan",
        ],
      },
      {
        model: Barang,
        as: "barang",
        attributes: [
          "id_barang",
          "nama_barang",
          "jenis_barang",
          "material",
          "qty",
          "unit",
          "harga",
          //sum 2 row
          [Sequelize.literal("COALESCE(qty, 0) * COALESCE(harga, 0)"), "total"],
        ],
      },
    ],
  })
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
  const id_po = req.params.id_po;

  Po.findByPk(id_po)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id_po,
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id_po = req.params.id_po;

  Po.update(req.body, {
    where: { id_po: id_po },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Barang was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Barang with id=${id_po}. Maybe Barang was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Barang with id=" + id_po,
        err,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id_po = req.params.id_po;

  Po.destroy({
    where: { id_po: id_po },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Barang was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Barang with id=${id_po}. Maybe Barang was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Barang with id=" + id_po,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Po.destroy({
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

exports.createSuratJalanPdf = (req, res) => {
  var config = {
    format: "A4",
    localUrlAccess: true,
  };
  const zz = path.join("app", "controllers", "surat-jalan.pdf");
  pdf.create(suratJalanTemplate(req.body), config).toFile(zz, (err) => {
    if (err) {
      res.send(Promise.reject());
    }

    res.send(Promise.resolve());
  });
};

exports.fetchSuratJalanPdf = (req, res) => {
  res.sendFile(`/${__dirname}/surat-jalan.pdf`);
};

exports.createInvoicePdf = (req, res) => {
  var config = {
    format: "A4",
    localUrlAccess: true,
  };
  const zz = path.join("app", "controllers", "invoice.pdf");
  pdf.create(invoiceTemplate(req.body), config).toFile(zz, (err) => {
    if (err) {
      res.send(Promise.reject());
    }

    res.send(Promise.resolve());
  });
};

exports.fetchInvoicePdf = (req, res) => {
  res.sendFile(`/${__dirname}/invoice.pdf`);
};
