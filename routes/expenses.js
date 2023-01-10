const express = require("express");

const {
  getExpenses,
  getExpenseByType,
  getExpenseById,
  getByMonth,
  getTotalSum,
  getAmountLt,
  getAmountGt,
  getShop,
  deleteExpense,
  newExpense,
} = require("../controllers/expenses");
const router = express.Router();

router.get("/", getExpenses);
router.get("/:id", getExpenseById);
router.get("/category/:type", getExpenseByType);
router.get("/month/:month", getByMonth);
router.get("/expenses/totalsum", getTotalSum);
router.get("/lt10/:amount", getAmountLt);
router.get("/gt10/:amount", getAmountGt);
router.get("/shop/:shop", getShop);

router.delete("/:id", deleteExpense);
router.post("/", newExpense);

module.exports = router;
