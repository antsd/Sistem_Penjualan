module.exports = (app) => {
  const barang = require("../controllers/barang.controller.js");

  var router = require("express").Router();

  // Create a new BArang
  router.post("/", barang.create);

  // Retrieve all BArangs
  router.get("/", barang.findAll);

  // Retrieve a single BArang with id
  router.get("/:id_barang", barang.findOne);

  // Update a BArang with id
  router.put("/:id_barang", barang.update);

  // Delete a BArang with id
  router.delete("/:id_barang", barang.delete);

  // Delete all barang
  router.delete("/", barang.deleteAll);

  app.use("/api/barang", router);
};
