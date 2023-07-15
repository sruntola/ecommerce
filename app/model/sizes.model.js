module.exports = (sequelize, Sequelize) => {
  const Sizes = sequelize.define(
    "sizes",
    {
      sizeText: {
        type: Sequelize.TEXT,
        allownull: false,
      },
    },
    {
      underscored: true,
    }
  );
  return Sizes;
};
