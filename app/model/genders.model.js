module.exports = (sequelize, Sequelize) => {
  const Gender = sequelize.define(
    "gender",
    {
      value: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );
  return Gender;
};
