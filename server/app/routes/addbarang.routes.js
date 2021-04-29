module.exports = (app) => {
  const addbarang = require("../controllers/addbarang.controller");

  var router = require("express").Router();

  // Create a new penawaran
  router.post("/", addbarang.create);

  //   router.post("/addpenawaran", penawaran.addPenawaran);

  //   // Retrieve all penawarans
  //   router.get("/", penawaran.findAll);

  //   // Retrieve a single penawaran with id
  //   router.get("/:id_penawaran", penawaran.findOne);

  //   // Update a penawaran with id
  //   router.put("/:id_penawaran", penawaran.update);

  //   // Delete a penawaran with id
  //   router.delete("/:id_penawaran", penawaran.delete);

  //   // Delete all penawaran
  //   router.delete("/", penawaran.deleteAll);

  app.use("/api/addbarang", router);
};
