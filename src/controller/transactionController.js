const { sequelize, Transaction } = require("../models/index");

const saveTransaction = async (req, res) => {
  try {
    await sequelize.sync({ alter: true });

    // Set userId directly while creating the transaction
    req.body.userId = req.user.id;

    // Create the transaction
    const transaction = await Transaction.create(req.body);

    res.status(201).json(transaction);
  } catch (error) {
    console.error("Error saving transaction:", error);
    res.status(500).json({ error: "Failed to save transaction" });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.user;

    // Check if the transaction exists and belongs to the authenticated user
    const existingTransaction = await Transaction.findOne({
      where: { id, userId },
    });
    if (!existingTransaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    // Update the transaction
    await Transaction.update(req.body, { where: { id, userId } });

    // Fetch and return the updated transaction
    const updatedTransaction = await Transaction.findByPk(id);
    res.status(200).json(updatedTransaction);
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(500).json({ error: "Failed to update transaction" });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.user;

    // Check if the transaction exists and belongs to the authenticated user
    const existingTransaction = await Transaction.findOne({
      where: { id, userId },
    });
    if (!existingTransaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    // Delete the transaction
    await Transaction.destroy({ where: { id, userId } });

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ error: "Failed to delete transaction" });
  }
};

const getTransactions = async (req, res) => {
  try {
    const { type, id, page = 1, limit = 10 } = req.query;
    let whereCondition = { userId: req.user.id };

    if (type) {
      whereCondition.type = type;
    }

    if (id) {
      whereCondition.id = id;
      const transactions = await Transaction.findAll({
        where: whereCondition,
      });
      return res.status(200).json(transactions);
    }

    if (!type && !id) {
      const transactions = await Transaction.findAll({
        where: { userId: req.user.id },
      });
      return res.status(200).json(transactions);
    }

    const transactions = await Transaction.findAndCountAll({
      where: whereCondition,
      limit: parseInt(limit),
      offset: (page - 1) * limit,
    });

    res.status(200).json({
      totalItems: transactions.count,
      totalPages: Math.ceil(transactions.count / limit),
      currentPage: page,
      transactions: transactions.rows,
    });
  } catch (error) {
    console.error("Error getting transactions:", error);
    res.status(500).json({ error: "Failed to get transactions" });
  }
};

module.exports = {
  saveTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactions,
};
