module.exports = (sequelize, Sequelize) => {
  const Sizes = sequelize.define(
    "sizes",
    {
      sizeText: {
        type: Sequelize.TEXT,
        allownull: false,
      },
      price: {
        type: Sequelize.DOUBLE,
        allownull: false,
      },
      qty: {
        type: Sequelize.INTEGER,
        allownull: false,
      },
    },
    {
      underscored: true,
    }
  );
  return Sizes;
};
