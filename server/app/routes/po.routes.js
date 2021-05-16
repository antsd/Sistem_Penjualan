module.exports = (app) => {
  const po = require("../controllers/po.controller");

  var router = require("express").Router();

  // Create a new po
  router.post("/", po.create);

  // Retrieve all pos
  router.get("/", po.findAll);

  router.post("/create-surat-jalan-pdf", po.createSuratJalanPdf);

  router.get("/fetch-surat-jalan-pdf", po.fetchSuratJalanPdf);

  router.post("/create-invoice-pdf", po.createInvoicePdf);

  router.get("/fetch-invoice-pdf", po.fetchInvoicePdf);

  // Retrieve a single po with id
  router.get("/:id_po", po.findOne);

  // Update a po with id
  router.put("/:id_po", po.update);

  // Delete a po with id
  router.delete("/:id_po", po.delete);

  // Delete all po
  router.delete("/", po.deleteAll);

  app.use("/api/po", router);
};
