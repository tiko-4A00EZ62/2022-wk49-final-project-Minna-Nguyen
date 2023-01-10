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
module.exports = {
  getExpenses,
  getTotalSum,
  getExpenseByType,
  getExpenseById,
  getByMonth,
  getAmountLt,
  getAmountGt,
  getShop,
};
