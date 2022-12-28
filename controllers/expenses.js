const expenses = require("../models/expenses");

const getExpenses = async (req, res) => {
  const response = await expenses.getAllExpenses();
  if (response) {
    res.send(response);
  }
};

const getExpenseById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const response = await expenses.getById(id);
  if (response) {
    res.send(response);
  }
};

const getExpenseByType = async (req, res) => {
  const typeCategory = req.params.type;
  const response = await expenses.filterCategory(typeCategory);
  if (response) {
    res.send(response);
  }
};

const getByMonth = async (req, res) => {
  const getMonth = req.params.month;
  const response = await expenses.getMonth(getMonth);
  if (response) {
    res.send(response);
  }
};
module.exports = { getExpenses, getExpenseByType, getExpenseById, getByMonth };
