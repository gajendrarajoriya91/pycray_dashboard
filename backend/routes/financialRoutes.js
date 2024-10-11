// routes/financialRoutes.js
const express = require("express");
const {
  getFinancialsByPropertyId,
  getAllFinancials,
  updateFinancial,
  deleteFinancial,
} = require("../controllers/financialController");

const router = express.Router();


router.get("/properties/:id/financials", getFinancialsByPropertyId);


router.get("/", getAllFinancials);


router.put("/:id", updateFinancial);


router.delete("/:id", deleteFinancial);

module.exports = router;
