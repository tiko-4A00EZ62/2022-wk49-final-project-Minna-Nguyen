const connection = require("../db/connection");

const expenses = {
  // query the data base and send it as a Promise
  getAllExpenses: () =>
    new Promise((resolve, reject) => {
      const getAll = `SELECT expense_id, shop_name, category_type, amount, expense_date
FROM expenses INNER JOIN categories ON category_id = categories.id
`;
      connection.query(getAll, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    }),

  getSum: () =>
    new Promise((resolve, reject) => {
      const getSum = `SELECT sum(amount) as total_sum
FROM expenses INNER JOIN categories ON category_id = categories.id;`;
      connection.query(getSum, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    }),

  getById: (id) =>
    new Promise((resolve, reject) => {
      const getId = `SELECT expense_id, shop_name, category_type, amount, expense_date
  FROM expenses INNER JOIN categories ON category_id = categories.id WHERE expense_id=?`;
      connection.query(getId, id, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    }),

  findByExpense: (expense) =>
    new Promise((resolve, reject) => {
      const checkDublicateExpense =
        "SELECT * FROM expenses WHERE shop_name LIKE ? AND category_id = ? AND amount LIKE ?;";
      connection.query(
        checkDublicateExpense,
        [expense.shop_name, expense.category_id, expense.amount],
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    }),

  filterCategory: (type) =>
    new Promise((resolve, reject) => {
      const filterType = `SELECT expense_id, shop_name, category_type, amount, expense_date
FROM expenses INNER JOIN categories ON category_id = categories.id WHERE category_type=?`;
      connection.query(filterType, type, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    }),

  getMonth: (month) =>
    new Promise((resolve, reject) => {
      const monthSelection = `SELECT expense_id, shop_name, category_type, amount, expense_date
FROM expenses INNER JOIN categories ON category_id = categories.id WHERE MONTH(expense_date)=?`;
      connection.query(monthSelection, month, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    }),

  getAmountLt: (amount) =>
    new Promise((resolve, reject) => {
      const getAll = `SELECT expense_id, shop_name, category_type, amount, expense_date
FROM expenses INNER JOIN categories ON category_id = categories.id WHERE amount<?;
`;
      connection.query(getAll, amount, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    }),
  getAmountGt: (amount) =>
    new Promise((resolve, reject) => {
      const getAll = `SELECT expense_id, shop_name, category_type, amount, expense_date
FROM expenses INNER JOIN categories ON category_id = categories.id WHERE amount>?
;`;
      connection.query(getAll, amount, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    }),
  getShopName: (shopName) =>
    new Promise((resolve, reject) => {
      const getShopName = `SELECT expense_id, shop_name, category_type, amount, expense_date 
      FROM expenses INNER JOIN categories ON category_id = categories.id WHERE shop_name=?;`;
      connection.query(getShopName, shopName, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    }),
  deleteById: (id) =>
    new Promise((resolve, reject) => {
      const deleteId = `DELETE FROM expenses WHERE expense_id = ?`;
      connection.query(deleteId, id, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    }),
  createExpense: (expense) =>
    new Promise((resolve, reject) => {
      // console.log(expense);
      const postNewExpense = `INSERT INTO expenses SET ?;`;
      connection.query(postNewExpense, expense, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    }),
  updateById: (update) =>
    new Promise((resolve, reject) => {
      const updateExpense = `UPDATE expenses SET shop_name = ?, category_id = ?, amount = ?, expense_date = ? WHERE expense_id = ? `;
      connection.query(
        updateExpense,
        [
          update.shop_name,
          update.category_id,
          update.amount,
          update.expense_date,
          update.expense_id,
        ],
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    }),
};

module.exports = expenses;
