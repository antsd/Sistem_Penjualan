module.exports = (sequelize, Sequelize) => {
  const Customer = sequelize.define("customer", {
    id_perusahaan: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    nama_perusahaan: {
      type: Sequelize.STRING,
    },
    contact_person: {
      type: Sequelize.STRING,
    },
    alamat: {
      type: Sequelize.STRING,
    },
    no_telp: {
      type: Sequelize.STRING,
    },
    fax: {
      type: Sequelize.STRING,
    },
    jenis_perusahaan: {
      type: Sequelize.STRING,
    },
  });
  return Customer;
};
