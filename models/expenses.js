const connection = require("../db/connection");
// const { get } = require("../routes/expenses");

const expenses = {
  getAllExpenses: () => {
    const getAll = `SELECT shop_name, category_type, amount, date
FROM expenses INNER JOIN categories ON category_id = categories.id
ORDER BY amount DESC;`;
    new Promise((resolve, reject) => {
      connection.query(getAll, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
};

module.exports = expenses;
