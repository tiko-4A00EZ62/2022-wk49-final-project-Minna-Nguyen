const express = require("express");

const {
  getExpenses,
  getExpenseByType,
  getExpenseById,
  getByMonth,
  getTotalSum,
} = require("../controllers/expenses");
const router = express.Router();

router.get("/", getExpenses);
router.get("/:id", getExpenseById);
router.get("/category/:type", getExpenseByType);
router.get("/month/:month", getByMonth);
router.get("/expenses/totalsum", getTotalSum);

module.exports = router;
