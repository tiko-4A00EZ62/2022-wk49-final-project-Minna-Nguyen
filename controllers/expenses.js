const expenses = require("../models/expenses");

const getExpenses = async (req, res) => {
  const response = await expenses.getAllExpenses();
  if (response) {
    res.send(response);
  }
};

module.exports = { getExpenses };
