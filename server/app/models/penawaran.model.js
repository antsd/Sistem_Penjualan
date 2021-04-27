module.exports = (sequelize, Sequelize) => {
  const Penawaran = sequelize.define("penawaran", {
    id_penawaran: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    disc: {
      type: Sequelize.INTEGER,
    },
    ppn: {
      type: Sequelize.INTEGER,
    },
    grand_total: {
      type: Sequelize.INTEGER,
    },
  });
  
  return Penawaran;
};
