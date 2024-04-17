const { sequelize, Transaction } = require("../models/index");

const saveExpense = async (req, res) => {
  try {
    await sequelize.sync({ alter: true });
    const currentTransaction = req.body;
    currentTransaction.type = "expense";
    const expense = await Transaction.create(currentTransaction);
    expense.userId = req.user.id;
    await expense.save();
    res.send(expense);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to save Expense" });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const currentTransaction = req.body;
    currentTransaction.type = "expense";
    Transaction.update(currentTransaction, { where: { id } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to updated expense" });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    await Transaction.destroy({ where: { id } });
    res.status(200).json({ message: "expense deleted successfully" });
  } catch (error) {
    console.log(error);
    res.send(500).json({ error: "Failed to delete expense" });
  }
};

const getExpenses = async (req, res) => {
  try {
    const expenses = await Transaction.findAll({
      where: { type: "expense", userId: req.user.id },
    });
    res.status(200).json(expenses);
  } catch (error) {
    console.log(error);
    res.send(500).json({ error: "Failed to get Expenses" });
  }
};

const getExpenseById = async (req, res) => {
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
    res.status(500).json({ error: "Failed to get expense by id" });
  }
};

module.exports = {
  saveExpense,
  updateExpense,
  deleteExpense,
  getExpenses,
  getExpenseById,
};
