module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    nama: {
      type: Sequelize.STRING,
    },
    no_telp: {
      type: Sequelize.STRING,
    },
  });
  return User;
};
