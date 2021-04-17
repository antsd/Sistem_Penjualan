module.exports = (app) => {
  const transaksi = require("../controllers/transaksi.controller");

  var router = require("express").Router();

  // Create a new transaksi
  router.post("/", transaksi.create);

  // Retrieve all transaksis
  router.get("/", transaksi.findAll);

  // Retrieve a single transaksi with id
  router.get("/:id_transaksi", transaksi.findOne);

  // Update a transaksi with id
  router.put("/:id_transaksi", transaksi.update);

  // Delete a transaksi with id
  router.delete("/:id_transaksi", transaksi.delete);

  // Delete all transaksi
  router.delete("/", transaksi.deleteAll);

  app.use("/api/transaksi", router);
};
