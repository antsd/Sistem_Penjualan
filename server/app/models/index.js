const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: 1,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.barang = require("../models/barang.model")(sequelize, Sequelize);
db.customer = require("../models/customer.model")(sequelize, Sequelize);
db.transaksi = require("../models/transaksi.model")(sequelize, Sequelize);
db.penawaran = require("../models/penawaran.model")(sequelize, Sequelize);
db.detail_penawaran = require("../models/detail_penawaran.model")(
  sequelize,
  Sequelize
);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

db.barang.belongsToMany(db.penawaran, {
  through: "detail_penawaran_barang",
  foreignKey: "id_barang",
  as: "barang",
});

db.penawaran.belongsToMany(db.barang, {
  through: "detail_penawaran_barang",
  foreignKey: "id_penawaran",
  as: "barang",
});

// db.customer.hasMany(db.penawaran,"penawaran")
db.penawaran.belongsTo(db.customer, {
  as: "perusahaan",
  foreignKey: "id_perusahaan",
});

db.penawaran.belongsTo(db.user, {
  as: "penawaranusr",
  foreignKey: "id_user",
});

db.ROLES = ["user", "admin"];

module.exports = db;
