module.exports = (sequelize, Sequelize) => {
  const Barang = sequelize.define("barang", {
    id_barang: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    nama_barang: {
      type: Sequelize.STRING,
    },
    jenis_barang: {
      type: Sequelize.STRING,
    },
    material: {
      type: Sequelize.STRING,
    },
    qty: {
      type: Sequelize.INTEGER,
    },
    unit: {
      type: Sequelize.STRING,
    },
    harga: {
      type: Sequelize.INTEGER,
    },
  });
  return Barang;
};
