const express = require("express");

const router = express.Router();

const {
  saveExpense,
  updateExpense,
  deleteExpense,
  getExpenses,
  getExpenseById,
} = require("../controller/expenseController");

router.post("/expenses", saveExpense);

router.put("/expenses", updateExpense);

router.delete("/expenses/:id", deleteExpense);

router.get("/expenses", getExpenses);

router.get("/expenses/:id", getExpenseById);

module.exports = router;
