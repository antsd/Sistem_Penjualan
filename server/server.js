const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = [
  ((origin = "http://localhost:3000"), (origin = "http://localhost:3001")),
];

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//db
const db = require("./app/models");
const Role = db.role;

// db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync DB");
  initial();
});

//routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/barang.routes")(app);
require("./app/routes/customer.routes")(app);
require("./app/routes/alluser.routes")(app);
require("./app/routes/transaksi.routes")(app);
require("./app/routes/penawaran.routes")(app);

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });
  Role.create({
    id: 2,
    name: "admin",
  });
}
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to sistem penjualan" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
