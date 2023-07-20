module.exports = (sequelize, Sequelize) => {
  const Variant = sequelize.define(
    "variants",
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      productName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      value: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      imageUrl: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );
  return Variant;
};
