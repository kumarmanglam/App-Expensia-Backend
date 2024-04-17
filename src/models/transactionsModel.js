const { sequelize, DataTypes } = require("../config/db");
const categoryEnums = require("../config/categoryEnum");
/**
 * amount
 * date
 * description
 * category
 * user
 */
const Transaction = sequelize.define(
  "transaction",
  {
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    dateTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    category: {
      type: DataTypes.STRING,
    },
    type: {
      // make it mandatory
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);
const s = new Date();
console.log(s);

module.exports = Transaction;

// (async () => {
//   await sequelize.sync({ alter: true });
//   const saved = await Transaction.create({
//     amount: 50,
//     date: new Date().getDate,
//     description: "Pasta",
//     category: categoryEnums.EXPENSE,
//   });
//   console.log(saved);
// })();
