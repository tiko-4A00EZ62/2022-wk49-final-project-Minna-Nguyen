const expenses = require("../models/expenses");

const getExpenses = async (req, res) => {
  const response = await expenses.getAllExpenses();
  if (response) {
    res.send(response);
  }
};
const getTotalSum = async (req, res) => {
  const response = await expenses.getSum();
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

const getAmountLt = async (req, res) => {
  const filter = parseInt(req.params.amount);
  const response = await expenses.getAmountLt(filter);
  if (response) {
    res.send(response);
  }
};
const getAmountGt = async (req, res) => {
  const filter = parseInt(req.params.amount);
  const response = await expenses.getAmountGt(filter);
  if (response) {
    res.send(response);
  }
};
const getShop = async (req, res) => {
  const shopName = req.params.shop;
  const response = await expenses.getShopName(shopName);
  if (response) {
    res.send(response);
  }
};
const deleteExpense = async (req, res) => {
  const deleteById = parseInt(req.params.id);
  const response = await expenses.deleteById(deleteById);
  if (response) {
    res.send("Expense deleted");
  }
};
const newExpense = async (req, res) => {
  const expense = {
    shop_name: req.body.shop_name,
    category_id: req.body.category_id,
    amount: parseFloat(req.body.amount),
  };
  const response = await expenses.createExpense(expense);
  if (response) {
    res.send(expense);
  }
};
const updateById = async (req, res) => {
  const id = req.params.id;
  // const getId = await expenses.getById(id);
  // if (getId) {
  //   console.log("löyty");
  // }
  const updateExpense = {
    shop_name: req.body.shop_name,
    category_id: req.body.category_id,
    amount: parseFloat(req.body.amount),
    date: req.body.date,
    expense_id: id,
  };
  const update = await expenses.updateById(updateExpense);
  if (update) {
    res.send("Expense updated");
  }
};

module.exports = {
  getExpenses,
  getTotalSum,
  getExpenseByType,
  getExpenseById,
  getByMonth,
  getAmountLt,
  getAmountGt,
  getShop,
  deleteExpense,
  newExpense,
  updateById,
};
