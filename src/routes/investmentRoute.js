const express = require("express");

const router = express.Router();

const {
  saveInvestment,
  updateInvestment,
  deleteInvestment,
  getInvestments,
  getInvestmentById,
} = require("../controller/investmentController");

router.post("/investments", saveInvestment);

router.put("/investments", updateInvestment);

router.delete("/investments/:id", deleteInvestment);

router.get("/investments", getInvestments);

router.get("/investments/:id", getInvestmentById);

module.exports = router;
