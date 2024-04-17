const express = require("express");

const router = express.Router();

const {
  saveIncome,
  updateIncome,
  deleteIncome,
  getIncomes,
  getIncomeById,
} = require("../controller/incomeController");

router.post("/incomes", saveIncome);

router.put("/incomes", updateIncome);

router.delete("/incomes/:id", deleteIncome);

router.get("/incomes", getIncomes);

router.get("/incomes/:id", getIncomeById);

module.exports = router;
