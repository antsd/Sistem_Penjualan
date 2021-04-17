module.exports = (sequelize, Sequelize) => {
  const Transaksi = sequelize.define("transaksi", {
    id_transaksi: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    no_penawaran: {
      type: Sequelize.STRING,
    },
    no_po: {
      type: Sequelize.STRING,
    },
    no_surat_jalan: {
      type: Sequelize.STRING,
    },
    no_invoice: {
      type: Sequelize.STRING,
    },
    nama_perusahaan: {
      type: Sequelize.STRING,
    },
    nama_seles: {
      type: Sequelize.STRING,
    },
    tgl_pembayaran: {
      type: Sequelize.DATE,
    },
    total_pembayaran: {
      type: Sequelize.INTEGER,
    },
  });
  return Transaksi;
};
