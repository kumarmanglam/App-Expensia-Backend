const { sequelize, DataTypes } = require("../config/db");

const User = sequelize.define(
  "user",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      // unique
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      // unique
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = User;

// (async () => {
//   await sequelize.sync({ force: true });
//   const saved = await User.create({
//     name: "kumar manglam",
//     username: "kumar",
//     email: "kumar@email.com",
//     password: "kumar",
//   });
//   console.log(saved);
// })();
