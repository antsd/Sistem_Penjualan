module.exports = (sequelize, Sequelize) => {
  const Detail_penawaran = sequelize.define("detail_penawaran", {
    harga: {
      type: Sequelize.INTEGER,
    },
    jumlah: {
      type: Sequelize.INTEGER,
    },
    total: {
      type: Sequelize.INTEGER,
    },
    
  });
  // Detail_penawaran.removeAttribute("id_detail_penawaran");
  return Detail_penawaran;
};
