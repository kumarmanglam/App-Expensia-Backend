const { Router } = require("express");

const router = Router();

const {
  saveTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactions,
  getTransactionById,
} = require("../controller/transactionController");

router.post("/transactions", saveTransaction);

router.put("/transactions/:id", updateTransaction);

router.delete("/transactions/:id", deleteTransaction);

router.get("/transactions", getTransactions);

router.get("/transactions/:id", getTransactionById);

module.exports = router;
