const { Router } = require("express");

const router = Router();

const {
  saveTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactions,
} = require("../controller/transactionController");

router.post("/", saveTransaction);

router.put("/:id", updateTransaction);

router.delete("/:id", deleteTransaction);

router.get("/", getTransactions);

module.exports = router;
