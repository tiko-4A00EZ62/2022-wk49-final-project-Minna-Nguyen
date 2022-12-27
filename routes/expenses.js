const express = require("express");

const { getExpenses } = require("../controllers/expenses");
const router = express.Router();

router.get("/", getExpenses);

module.exports = router;
