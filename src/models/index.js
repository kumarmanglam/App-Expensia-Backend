const { sequelize } = require("../config/db");
const Transaction = require("./transactionsModel");
const User = require("./userModel");
const categoryEnums = require("../config/categoryEnum");

User.hasMany(Transaction, { onDelete: "CASCADE" });

module.exports = {
  sequelize,
  Transaction,
  User,
};

// (async () => {
//   await sequelize.sync();
//   try {
//     // const user = await User.create({
//     //   name: "kumar manglam",
//     //   username: "kumar6",
//     //   email: "kumar6@email.com",
//     //   password: "kumar",
//     // });
//     const user = await User.findOne({ where: { username: "kumar6" } });
//     console.log("user iis " + JSON.stringify(user));
//     const trans = await Transaction.create({
//       amount: 500,
//       dateTime: new Date(),
//       description: "Pasta",
//       category: categoryEnums.EXPENSE,
//     });
//     // const s = await user.add(trans);

//     // Associate transaction with user
//     trans.userId = user.id;
//     const s = await trans.save();
//     // const s = await trans.set(user);
//     console.log("after setting -----<<<<<" + JSON.stringify(s));
//   } catch (error) {
//     console.log("error-------> " + error);
//   }
// })();
