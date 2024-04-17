const { sequelize, Transaction } = require("../models/index");

const saveIncome = async (req, res) => {
  await sequelize.sync({ alter: true });
  const currentTransaction = req.body;
  currentTransaction.type = "income";
  const income = await Transaction.create(currentTransaction);
  income.userId = req.user.id;
  await income.save();
  res.send(income);
};

const updateIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const currentTransaction = req.body;
    currentTransaction.type = "income";
    Transaction.update(currentTransaction, { where: { id } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to updated income" });
  }
};

const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    await Transaction.destroy({ where: { id } });
    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    console.log(error);
    res.send(500).json({ error: "Failed to delete income" });
  }
};

const getIncomes = async (req, res) => {
  try {
    const incomes = await Transaction.findAll({
      where: { type: "income", userId: req.user.id },
    });
    res.status(200).json(incomes);
  } catch (error) {
    console.log(error);
    res.send(500).json({ error: "Failed to get Incomes" });
  }
};

const getIncomeById = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findOne({
      where: { id, userId: req.user.id },
    });
    if (!transaction) {
      res.status(404).json({ error: "Transaction not found" });
    } else {
      res.status(200).json(transaction);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to get income by id" });
  }
};

module.exports = {
  saveIncome,
  updateIncome,
  deleteIncome,
  getIncomes,
  getIncomeById,
};
