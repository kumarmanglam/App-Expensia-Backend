const { sequelize, Transaction } = require("../models/index");

const saveTransaction = async (req, res) => {
  await sequelize.sync({ alter: true });
  const currentTransaction = req.body;
  const trans = await Transaction.create(req.body);
  trans.userId = req.user.id;
  await trans.save();
  res.send(req.body);
};

const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTransaction = await Transaction.update(req.body, {
      where: { id },
    });
    res.status(200).json(updatedTransaction);
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(500).json({ error: "Failed to update transaction" });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    await Transaction.destroy({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ error: "Failed to delete transaction" });
  }
};

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      where: { userId: req.user.id },
    });
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error getting transactions:", error);
    res.status(500).json({ error: "Failed to get transactions" });
  }
};

const getTransactionById = async (req, res) => {
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
    console.error("Error getting transaction by ID:", error);
    res.status(500).json({ error: "Failed to get transaction by ID" });
  }
};
module.exports = {
  saveTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactions,
  getTransactionById,
};
