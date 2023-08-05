module.exports = (sequelize, Sequelize) => {
  const OrderStatus = sequelize.define("orderstatus", {
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  });
  return OrderStatus;
};
