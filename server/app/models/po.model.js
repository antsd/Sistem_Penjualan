module.exports = (sequelize, Sequelize) => {
  const Po = sequelize.define("po", {
    id_po: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    subtotal: {
      type: Sequelize.INTEGER,
    },
    disc: {
      type: Sequelize.INTEGER,
    },
    after_disc: {
      type: Sequelize.INTEGER,
    },
    ppn: {
      type: Sequelize.INTEGER,
    },
    grand_total: {
      type: Sequelize.INTEGER,
    },
  });

  return Po;
};
