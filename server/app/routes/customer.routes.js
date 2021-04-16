module.exports = (app) => {
  const customer = require("../controllers/customer.controller.js");

  var router = require("express").Router();

  // Create a new customer
  router.post("/", customer.create);

  // Retrieve all customers
  router.get("/", customer.findAll);

  // Retrieve a single customer with id
  router.get("/:id_perusahaan", customer.findOne);

  // Update a customer with id
  router.put("/:id_perusahaan", customer.update);

  // Delete a customer with id
  router.delete("/:id_perusahaan", customer.delete);

  // Delete all customer
  router.delete("/", customer.deleteAll);

  app.use("/api/customer", router);
};
