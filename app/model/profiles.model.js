module.exports = (sequelize, Sequelize) => {
  const Profile = sequelize.define(
    "profiles",
    {
      imageUrl: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      isLatest: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      underscored: true,
    }
  );
  return Profile;
};
