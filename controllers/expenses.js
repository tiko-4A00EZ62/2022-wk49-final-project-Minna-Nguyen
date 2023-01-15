const expenses = require("../models/expenses");
const Joi = require("joi");

// fecth the data. The data is asynchronous. It will retrun a Promise respond.
const getExpenses = async (req, res) => {
  try {
    const response = await expenses.getAllExpenses();
    if (response) {
      res.send(response);
    }
  } catch (error) {
    res.sendStatus(500);
    // res.send(error);
  }
};
const getTotalSum = async (req, res) => {
  try {
    const response = await expenses.getSum();
    if (response) {
      res.status(200).send(response);
    }
  } catch (error) {
    res.sendStatus(500);
  }
};
const getExpenseById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const response = await expenses.getById(id);
    if (response.length === 1) {
      res.send(response[0]);
    } else {
      res.status(404).send("not found");
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

const getExpenseByType = async (req, res) => {
  const typeCategory = req.params.type;
  try {
    const response = await expenses.filterCategory(typeCategory);
    if (response.length !== 0) {
      res.send(response);
    } else {
      res.status(404).send("no expense by category type");
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

const getByMonth = async (req, res) => {
  const getMonth = req.params.month;
  try {
    const response = await expenses.getMonth(getMonth);

    // const data = await expenses.getAllExpenses();
    // let ok = null;
    // // check if shop name is in the database
    // for (let i = 0; i < data.length; i++) {
    //   if (data[i].expense.date === getByMonth) {
    //     ok = true;
    //   }
    // }

    if (response.length !== 0) {
      res.send(response);
    } else {
      res.status(404).send("no expenses in this month");
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

const getAmountLt = async (req, res) => {
  const filter = parseInt(req.params.amount);
  try {
    const response = await expenses.getAmountLt(filter);
    if (response) {
      res.send(response);
    }
  } catch (error) {
    res.sendStatus(500);
  }
};
const getAmountGt = async (req, res) => {
  const filter = parseInt(req.params.amount);
  try {
    const response = await expenses.getAmountGt(filter);
    if (response) {
      res.send(response);
    }
  } catch (error) {
    res.sendStatus(500);
  }
};
const getShop = async (req, res) => {
  const shopName = req.params.shop;
  try {
    const data = await expenses.getAllExpenses();
    const response = await expenses.getShopName(shopName);
    let ok = null;
    // check if shop name is in the database
    for (let i = 0; i < data.length; i++) {
      if (data[i].shop_name === shopName) {
        ok = true;
      }
    }
    if (ok) {
      res.send(response);
    } else {
      res.status(404).send("expense doesn't exist");
    }
  } catch (error) {
    res.sendStatus(500);
  }
};
const deleteExpense = async (req, res) => {
  const deleteById = parseInt(req.params.id);
  try {
    // check if exist
    const result = await expenses.getById(deleteById);
    if (result.length === 0) {
      res.status(404).send("not found");
      return;
    }
    // delete
    const response = await expenses.deleteById(deleteById);
    if (response.affectedRows === 1) {
      res.status(200).send("expense deleted");
    }
  } catch (error) {
    res.sendStatus(500);
  }
};
const newExpense = async (req, res) => {
  // Define the schema
  const schema = Joi.object({
    shop_name: Joi.string().min(2).required(),
    category_id: Joi.number().integer().min(1).max(3).required(),
    amount: Joi.number().min(0).required(),
    expense_date: Joi.date().min("2005-01-01").required(),
  });

  // Validate the req.body against the schema
  // Validate returns an error object if there are validation errors
  const { error } = schema.validate(req.body);
  if (error) {
    //Sending back the error details
    res.status(400).send(error.details[0].message);
    return;
  }

  const expense = {
    shop_name: req.body.shop_name,
    category_id: req.body.category_id,
    amount: parseFloat(req.body.amount),
    expense_date: req.body.expense_date,
    expense_id: req.body.expense_id,
  };
  try {
    const alreadyExist = await expenses.findByExpense(expense);
    if (alreadyExist.length > 0) {
      res.status(400).send("expense already exist");
      return;
    }
    const response = await expenses.createExpense(expense);
    if (response) {
      expense.expense_id = response.insertId;
      res.status(201).send(expense);
    }
  } catch (error) {
    res.sendStatus(500);
  }
};
const updateById = async (req, res) => {
  const schema = Joi.object({
    shop_name: Joi.string().min(2).required(),
    category_id: Joi.number().integer().min(1).max(3).required(),
    amount: Joi.number().min(0).required(),
    expense_date: Joi.date().min("2005-01-01").required(),
    expense_id: Joi.number().integer().min(1).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    //Sending back the error details
    res.status(400).send(error.details[0].message);
    return;
  }
  const id = parseInt(req.params.id);

  const updateExpense = {
    shop_name: req.body.shop_name,
    category_id: req.body.category_id,
    amount: parseFloat(req.body.amount),
    expense_date: req.body.expense_date,
    expense_id: id,
  };
  try {
    const response = await expenses.getById(id);
    //if city by id found, update
    if (response.length === 1) {
      const update = await expenses.updateById(updateExpense);
      if (update) {
        res.status(200).send(updateExpense);
      }
    } else {
      res.status(404).send("not found");
    }
  } catch (error) {
    res.sendStatus(500);
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
