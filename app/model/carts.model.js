module.exports = (sequelize, Sequelize) => {
  const Cart = sequelize.define(
    "carts",
    {
      price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
    },
    {
      underscored: true,
    }
  );
  return Cart;
};
