module.exports = (sequelize, Sequelize) => {
  const DetailPenawaran = sequelize.define("DetailPenawaran", {
    id_penawaran: {
      type: Sequelize.STRING,
    },
    id_barang: {
      type: Sequelize.INTEGER,
    },
  });

  return DetailPenawaran;
};
