module.exports = (app) => {
  const alluser = require("../controllers/alluser.contoller.js");

  var router = require("express").Router();

  // Create a new alluser
  //   router.post("/", alluser.create);

  // Retrieve all allusers
  router.get("/", alluser.findAll);

  //   // Retrieve a single alluser with id
  //   router.get("/:id", alluser.findOne);

  //   // Update a alluser with id
  //   router.put("/:id", alluser.update);

  //   // Delete a alluser with id
  //   router.delete("/:id", alluser.delete);

  //   // Delete all alluser
  //   router.delete("/", alluser.deleteAll);

  app.use("/api/alluser", router);
};
