const db = require("../models");
const pdf = require("html-pdf");
const Penawaran = db.penawaran;
const Barang = db.barang;
const Customer = db.customer;
const Op = db.Sequelize.Op;
const Sequelize = require("sequelize");
const invoiceTemplate = require("../documents/Penawaran");
const path = require("path");

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: penawaran } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, penawaran, totalPages, currentPage };
};

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.id_penawaran) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  try {
    const { barang, ...data } = req.body;
    const penawaran = await Penawaran.create(data);

    if (barang && barang.length > 0) {
      penawaran.setBarang(barang);
    }
    return res.status(200).json(penawaran);
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials.",
    });
  }

  // // Create a Tutorial
  // const penawaran = {
  //   id_penawaran: req.body.id_penawaran,
  //   subtotal: req.body.subtotal,
  //   disc: req.body.disc,
  //   after_disc: req.body.after_disc,
  //   ppn: req.body.ppn,
  //   grand_total: req.body.grand_total,
  //   id_perusahaan: req.body.id_perusahaan,
  //   id_user: req.body.id_user,
  // };

  // // Save Tutorial in the database
  // Penawaran.create(penawaran)
  //   .then((data) => {
  //     res.send(data);
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message:
  //         err.message || "Some error occurred while creating the Barang.",
  //     });
  //   });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const { page, size, id_penawaran } = req.query;
  var condition = id_penawaran
    ? { id_penawaran: { [Op.like]: `%${id_penawaran}%` } }
    : null;

  const { limit, offset } = getPagination(page, size);

  Penawaran.findAndCountAll({
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
  const id_penawaran = req.params.id_penawaran;

  Penawaran.findByPk(id_penawaran)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id_penawaran,
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id_penawaran = req.params.id_penawaran;

  Penawaran.update(req.body, {
    where: { id_penawaran: id_penawaran },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Barang was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Barang with id=${id_penawaran}. Maybe Barang was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Barang with id=" + id_penawaran,
        err,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id_penawaran = req.params.id_penawaran;

  Penawaran.destroy({
    where: { id_penawaran: id_penawaran },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Barang was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Barang with id=${id_penawaran}. Maybe Barang was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Could not delete Barang with id=" + id_penawaran,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Penawaran.destroy({
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

exports.createPdf = (req, res) => {
  var config = {
    format: "A4",
    localUrlAccess: true,
    directory: "../documents",
  };
  const zz = path.join("app", "controllers", "result.pdf");
  pdf.create(invoiceTemplate(req.body), config).toFile(zz, (err) => {
    if (err) {
      res.send(Promise.reject());
    }

    res.send(Promise.resolve());
  });
};

exports.fetchPdf = (req, res) => {
  res.sendFile(`/${__dirname}/result.pdf`);
};
