const { sequelize, Transaction } = require("../models/index");

const saveInvestment = async (req, res) => {
  await sequelize.sync({ alter: true });
  const currentTransaction = req.body;
  currentTransaction.type = "investment";
  const investment = await Transaction.create(currentTransaction);
  investment.userId = req.user.id;
  await investment.save();
  res.send(investment);
};

const updateInvestment = async (req, res) => {
  try {
    const { id } = req.params;
    const currentTransaction = req.body;
    currentTransaction.type = "investment";
    Transaction.update(currentTransaction, { where: { id } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to updated investment" });
  }
};

const deleteInvestment = async (req, res) => {
  try {
    const { id } = req.params;
    await Transaction.destroy({ where: { id } });
    res.status(200).json({ message: "investment deleted successfully" });
  } catch (error) {
    console.log(error);
    res.send(500).json({ error: "Failed to delete investment" });
  }
};

const getInvestments = async (req, res) => {
  try {
    const incomes = await Transaction.findAll({
      where: { type: "investment", userId: req.user.id },
    });
    res.status(200).json(incomes);
  } catch (error) {
    console.log(error);
    res.send(500).json({ error: "Failed to get Incomes" });
  }
};

const getInvestmentById = async (req, res) => {
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
    res.status(500).json({ error: "Failed to get investment by id" });
  }
};

module.exports = {
  saveInvestment,
  updateInvestment,
  deleteInvestment,
  getInvestments,
  getInvestmentById,
};
