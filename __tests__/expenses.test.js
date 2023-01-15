const { describe, expect, test } = require("@jest/globals");
const supertest = require("supertest");
const app = require("../app");

describe("GET expenses endpoint", () => {
  // main endpoint
  test("Should return 200 AND json", async () => {
    const response = await supertest(app)
      .get("/api/expenses")
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    expect(response.headers["content-type"]).toMatch(
      "application/json; charset=utf-8"
    );
    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          expense_id: 1,
          shop_name: "Spotify",
          category_type: "other",
          amount: 17.89,
          expense_date: "2023-01-14T20:16:10.000Z",
        },
        {
          expense_id: 2,
          shop_name: "Tokmanni",
          category_type: "shop",
          amount: 2.89,
          expense_date: "2023-01-14T20:16:10.000Z",
        },
        {
          expense_id: 3,
          shop_name: "Prisma",
          category_type: "shop",
          amount: 11.48,
          expense_date: "2023-01-14T20:16:10.000Z",
        },
      ])
    );
  });
  // endpoint by id
  test("Should return expense 2", async () => {
    const response = await supertest(app)
      .get("/api/expenses/2")
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    expect(response.headers["content-type"]).toMatch(
      "application/json; charset=utf-8"
    );
    expect(response.body).toEqual(
      expect.objectContaining({
        expense_id: 2,
        shop_name: "Tokmanni",
        category_type: "shop",
        amount: 2.89,
        expense_date: "2023-01-14T20:16:10.000Z",
      })
    );
  });
  // error testing
  test("Should return 404 and not found", async () => {
    const response = await supertest(app).get("/api/expenses/2000000");
    expect(response.status).toEqual(404);
    expect(response.text).toContain("not found");
  });
  // endpoint by category filter
  test("Should return list of expenses with 'shop' category", async () => {
    const response = await supertest(app)
      .get("/api/expenses/category/shop")
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    expect(response.headers["content-type"]).toMatch(
      "application/json; charset=utf-8"
    );
    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          expense_id: 2,
          shop_name: "Tokmanni",
          category_type: "shop",
          amount: 2.89,
          expense_date: "2023-01-14T20:16:10.000Z",
        },
        {
          expense_id: 3,
          shop_name: "Prisma",
          category_type: "shop",
          amount: 11.48,
          expense_date: "2023-01-14T20:16:10.000Z",
        },
      ])
    );
  });
  // error testing
  test("Should return 404 and no expense by category type", async () => {
    const response = await supertest(app).get("/api/expenses/category/cake");
    expect(response.status).toEqual(404);
    expect(response.text).toContain("no expense by category type");
  });
  // endpoint by other category filter
  test("Should return list of expenses with 'other' category", async () => {
    const response = await supertest(app)
      .get("/api/expenses/category/other")
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    expect(response.headers["content-type"]).toMatch(
      "application/json; charset=utf-8"
    );
    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          expense_id: 1,
          shop_name: "Spotify",
          category_type: "other",
          amount: 17.89,
          expense_date: "2023-01-14T20:16:10.000Z",
        },
        {
          expense_id: 9,
          shop_name: "Apple Store",
          category_type: "other",
          amount: 229,
          expense_date: "2023-01-14T20:16:10.000Z",
        },
      ])
    );
  });
  // endpoint by food category filter
  test("Should return list of expenses with 'food' category", async () => {
    const response = await supertest(app)
      .get("/api/expenses/category/food")
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    expect(response.headers["content-type"]).toMatch(
      "application/json; charset=utf-8"
    );
    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          expense_id: 5,
          shop_name: "Wolt",
          category_type: "food",
          amount: 32.18,
          expense_date: "2023-01-14T20:16:10.000Z",
        },
        {
          expense_id: 7,
          shop_name: "K-market",
          category_type: "food",
          amount: 69.02,
          expense_date: "2023-01-14T20:16:10.000Z",
        },
        {
          expense_id: 8,
          shop_name: "Pancho Villa",
          category_type: "food",
          amount: 23.99,
          expense_date: "2023-01-14T20:16:10.000Z",
        },
      ])
    );
  });
  // endpoint by month
  test("Should return list of expenses with month filter", async () => {
    const response = await supertest(app)
      .get("/api/expenses/month/1")
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    expect(response.headers["content-type"]).toMatch(
      "application/json; charset=utf-8"
    );
    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          expense_id: 1,
          shop_name: "Spotify",
          category_type: "other",
          amount: 17.89,
          expense_date: "2023-01-14T20:16:10.000Z",
        },
        {
          expense_id: 2,
          shop_name: "Tokmanni",
          category_type: "shop",
          amount: 2.89,
          expense_date: "2023-01-14T20:16:10.000Z",
        },
      ])
    );
  });
  test("Should return 404 and no expense by this month", async () => {
    const response = await supertest(app).get("/api/expenses/month/5");
    expect(response.status).toEqual(404);
    expect(response.text).toContain("no expenses in this month");
  });
  // endpoint by shop name
  test("Should return list of expenses by shop name", async () => {
    const response = await supertest(app)
      .get("/api/expenses/shop/Alepa")
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    expect(response.headers["content-type"]).toMatch(
      "application/json; charset=utf-8"
    );
    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          expense_id: 6,
          shop_name: "Alepa",
          category_type: "shop",
          amount: 3,
          expense_date: "2023-01-14T20:16:10.000Z",
        },
      ])
    );
  });
  //error testing
  test("Should return 404 and expense doesn't exist", async () => {
    const response = await supertest(app).get("/api/expenses/shop/delulu");
    expect(response.status).toEqual(404);
    expect(response.text).toContain("expense doesn't exist");
  });
  test("Should return list of expenses less than 10", async () => {
    const response = await supertest(app)
      .get("/api/expenses/lt10/10")
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    expect(response.headers["content-type"]).toMatch(
      "application/json; charset=utf-8"
    );
    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          expense_id: 2,
          shop_name: "Tokmanni",
          category_type: "shop",
          amount: 2.89,
          expense_date: "2023-01-14T20:16:10.000Z",
        },
        {
          expense_id: 4,
          shop_name: "Power",
          category_type: "other",
          amount: 3.12,
          expense_date: "2023-01-25T22:00:00.000Z",
        },
        {
          expense_id: 6,
          shop_name: "Alepa",
          category_type: "shop",
          amount: 3,
          expense_date: "2023-01-14T20:16:10.000Z",
        },
      ])
    );
  });
  test("Should return list of expenses greater than 10", async () => {
    const response = await supertest(app)
      .get("/api/expenses/gt10/10")
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    expect(response.headers["content-type"]).toMatch(
      "application/json; charset=utf-8"
    );
    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          expense_id: 1,
          shop_name: "Spotify",
          category_type: "other",
          amount: 17.89,
          expense_date: "2023-01-14T20:16:10.000Z",
        },
        {
          expense_id: 3,
          shop_name: "Prisma",
          category_type: "shop",
          amount: 11.48,
          expense_date: "2023-01-14T20:16:10.000Z",
        },
      ])
    );
  });
});

describe("POST expense endpoint", () => {
  test("Should create new expense", async () => {
    const expense = {
      shop_name: "Pancho Villa",
      category_id: 2,
      amount: 32,
      expense_date: "2022-12-11T22:00:00.000Z",
    };

    const response = await supertest(app)
      .post("/api/expenses")
      .set("Accept", "application/json")
      .send(expense);
    expect(response.status).toEqual(201);
    expect(response.headers["content-type"]).toMatch(
      "application/json; charset=utf-8"
    );
    // expect(response.body.expense_id).toBeTruthy();
    expect(response.body.shop_name).toEqual("Pancho Villa");
    expect(response.body.category_id).toEqual(2);
    expect(response.body.amount).toEqual(32);
    expect(response.body.expense_date).toEqual("2022-12-11T22:00:00.000Z");
  });
  test("Shop name required", async () => {
    const expense = {
      category_id: 3,
      amount: 24.91,
    };

    const response = await supertest(app)
      .post("/api/expenses")
      .set("Accept", "application/json")
      .send(expense);

    expect(response.status).toEqual(400);
    expect(response.text).toContain('"shop_name" is required');
  });
  test("Name cannot be too short", async () => {
    const expense = {
      shop_name: "A",
      category_id: 3,
      amount: 24.91,
    };

    const response = await supertest(app)
      .post("/api/expenses")
      .set("Accept", "application/json")
      .send(expense);

    expect(response.status).toEqual(400);
    expect(response.text).toContain(
      '"shop_name" length must be at least 2 characters long'
    );
  });
  test("Name cannot be empty", async () => {
    const expense = {
      shop_name: "",
      category_id: 3,
      amount: 24.91,
    };

    const response = await supertest(app)
      .post("/api/expenses")
      .set("Accept", "application/json")
      .send(expense);

    expect(response.status).toEqual(400);
    expect(response.text).toContain('"shop_name" is not allowed to be empty');
  });

  test("Category id must have a number", async () => {
    const expense = {
      shop_name: "Apple Store",
      amount: 24.91,
    };

    const response = await supertest(app)
      .post("/api/expenses")
      .set("Accept", "application/json")
      .send(expense);

    expect(response.status).toEqual(400);
    expect(response.text).toContain('"category_id" is required');
  });
  test("Category id cannot be negative or 0", async () => {
    const expense = {
      shop_name: "Apple Store",
      category_id: 0,
      amount: 24.91,
    };

    const response = await supertest(app)
      .post("/api/expenses")
      .set("Accept", "application/json")
      .send(expense);

    expect(response.status).toEqual(400);
    expect(response.text).toContain(
      '"category_id" must be greater than or equal to 1'
    );
  });
  test("Category id cannot be over 3", async () => {
    const expense = {
      shop_name: "Apple Store",
      category_id: 4,
      amount: 24.91,
    };

    const response = await supertest(app)
      .post("/api/expenses")
      .set("Accept", "application/json")
      .send(expense);

    expect(response.status).toEqual(400);
    expect(response.text).toContain(
      '"category_id" must be less than or equal to 3'
    );
  });
  test("Category id must be an integer", async () => {
    const expense = {
      shop_name: "Apple Store",
      category_id: 3.2,
      amount: 24.91,
    };

    const response = await supertest(app)
      .post("/api/expenses")
      .set("Accept", "application/json")
      .send(expense);

    expect(response.status).toEqual(400);
    expect(response.text).toContain('"category_id" must be an integer');
  });
  test("Amount required", async () => {
    const expense = {
      shop_name: "Apple Store",
      category_id: 3,
    };

    const response = await supertest(app)
      .post("/api/expenses")
      .set("Accept", "application/json")
      .send(expense);

    expect(response.status).toEqual(400);
    expect(response.text).toContain('"amount" is required');
  });
  test("Amount must be one or greater than zero", async () => {
    const expense = {
      shop_name: "Apple Store",
      category_id: 3,
      amount: -1,
    };

    const response = await supertest(app)
      .post("/api/expenses")
      .set("Accept", "application/json")
      .send(expense);

    expect(response.status).toEqual(400);
    expect(response.text).toContain(
      '"amount" must be greater than or equal to 0'
    );
  });
  test("Date must be greater than or equal", async () => {
    const expense = {
      shop_name: "Apple Store",
      category_id: 3,
      amount: 229,
      expense_date: "2001-02-22",
    };

    const response = await supertest(app)
      .post("/api/expenses")
      .set("Accept", "application/json")
      .send(expense);

    expect(response.status).toEqual(400);
    expect(response.text).toContain(
      '"expense_date" must be greater than or equal to "2005-01-01T00:00:00.000Z"'
    );
  });
  test("Date required", async () => {
    const expense = {
      shop_name: "Apple Store",
      category_id: 3,
      amount: 229,
    };

    const response = await supertest(app)
      .post("/api/expenses")
      .set("Accept", "application/json")
      .send(expense);

    expect(response.status).toEqual(400);
    expect(response.text).toContain('"expense_date" is required');
  });
  test("Expense already exist", async () => {
    const expense = {
      shop_name: "Apple Store",
      category_id: 3,
      amount: 24.91,
      expense_date: "2021-03-21T22:00:00.000Z",
    };

    const response = await supertest(app)
      .post("/api/expenses")
      .set("Accept", "application/json")
      .send(expense);

    expect(response.status).toEqual(400);
    expect(response.text).toContain("expense already exist");
  });
  const connection = require("../db/connection");
  afterAll(async () => {
    const deleteQuery = `DELETE FROM expenses WHERE shop_name LIKE 'Pancho Villa' AND category_id LIKE 2 AND amount LIKE 32.00;`;
    connection.query(deleteQuery, (err, result) => {
      if (err) {
        console.log(err);
      }
    });
  });
});

describe("DELETE expense endpoint", () => {
  test("should delete the expense by id", async () => {
    // create expense to delete
    const expense = {
      shop_name: "Ristorante Momento",
      category_id: 2,
      amount: 18.1,
      expense_date: "2022-10-21T21:00:00.000Z",
    };

    const response = await supertest(app)
      .post("/api/expenses")
      .set("Accept", "application/json")
      .send(expense);
    const postId = response.body.expense_id;

    const deleteExpense = await supertest(app)
      .delete(`/api/expenses/${postId}`)
      .set("Accept", "application/json");
    expect(deleteExpense.status).toEqual(200);
    expect(deleteExpense.text).toEqual("expense deleted");
  });

  test("should check that city with id exists", async () => {
    const response = await supertest(app)
      .delete("/api/expenses/32")
      .set("Accept", "application/json");

    expect(response.status).toEqual(404);
    expect(response.text).toEqual("not found");
  });
});

describe("PUT expense endpoint", () => {
  const connection = require("../db/connection");
  let postId;
  beforeAll(async () => {
    const expense = {
      shop_name: "Ristorante Momento",
      category_id: 2,
      amount: 18.1,
      expense_date: "2022-10-21T21:00:00.000Z",
    };
    const response = await supertest(app)
      .post("/api/expenses")
      .set("Accept", "application/json")
      .send(expense);
    expect(response.status).toEqual(201);
    expect(response.headers["content-type"]).toMatch(
      "application/json; charset=utf-8"
    );
    postId = parseInt(response.body.expense_id);
  });

  test("update expense with the id", async () => {
    const updateExpense = {
      expense_id: postId,
      shop_name: "Sale",
      category_id: 1,
      amount: 50,
      expense_date: "2023-01-23",
    };

    const response = await supertest(app)
      .put(`/api/expenses/${postId}`)
      .set("Accept", "application/json")
      .send(updateExpense);

    expect(response.status).toEqual(200);

    expect(response.body.expense_id).toEqual(postId);
    expect(response.body.shop_name).toEqual("Sale");
    expect(response.body.category_id).toEqual(1);
    expect(response.body.amount).toEqual(50);
    expect(response.body.expense_date).toEqual("2023-01-23");
  });

  test("should check that city with id exists", async () => {
    const expense = {
      expense_id: 10000,
      shop_name: "Sale",
      category_id: 1,
      amount: 50,
      expense_date: "2023-01-23",
    };
    const response = await supertest(app)
      .put("/api/expenses/10000")
      .set("Accept", "application/json")
      .send(expense);
    expect(response.status).toEqual(404);
    expect(response.text).toContain("not found");
  });
  test("Shop name required", async () => {
    const updateExpense = {
      expense_id: postId,
      category_id: 1,
      amount: 50,
      expense_date: "2023-01-23",
    };

    const response = await supertest(app)
      .put(`/api/expenses/${postId}`)
      .set("Accept", "application/json")
      .send(updateExpense);

    expect(response.status).toEqual(400);
    expect(response.text).toContain('"shop_name" is required');
  });
  test("Name cannot be too short", async () => {
    const updateExpense = {
      expense_id: postId,
      shop_name: "S",
      category_id: 1,
      amount: 50,
      expense_date: "2023-01-23",
    };

    const response = await supertest(app)
      .put(`/api/expenses/${postId}`)
      .set("Accept", "application/json")
      .send(updateExpense);

    expect(response.status).toEqual(400);
    expect(response.text).toContain(
      '"shop_name" length must be at least 2 characters long'
    );
  });
  test("Name cannot be empty", async () => {
    const updateExpense = {
      expense_id: postId,
      shop_name: "",
      category_id: 1,
      amount: 50,
      expense_date: "2023-01-23",
    };

    const response = await supertest(app)
      .put(`/api/expenses/${postId}`)
      .set("Accept", "application/json")
      .send(updateExpense);

    expect(response.status).toEqual(400);
    expect(response.text).toContain('"shop_name" is not allowed to be empty');
  });

  test("Category id must have a number", async () => {
    const updateExpense = {
      expense_id: postId,
      shop_name: "Sale",
      category_id: 1.2,
      amount: 50,
      expense_date: "2023-01-23",
    };

    const response = await supertest(app)
      .put(`/api/expenses/${postId}`)
      .set("Accept", "application/json")
      .send(updateExpense);

    expect(response.status).toEqual(400);
    expect(response.text).toContain('"category_id" must be an integer');
  });
  test("Category id cannot be negative or 0", async () => {
    const updateExpense = {
      expense_id: postId,
      shop_name: "Sale",
      category_id: 0,
      amount: 50,
      expense_date: "2023-01-23",
    };

    const response = await supertest(app)
      .put(`/api/expenses/${postId}`)
      .set("Accept", "application/json")
      .send(updateExpense);

    expect(response.status).toEqual(400);
    expect(response.text).toContain(
      '"category_id" must be greater than or equal to 1'
    );
  });
  test("Category id cannot be over 3", async () => {
    const updateExpense = {
      expense_id: postId,
      shop_name: "Sale",
      category_id: 4,
      amount: 50,
      expense_date: "2023-01-23",
    };

    const response = await supertest(app)
      .put(`/api/expenses/${postId}`)
      .set("Accept", "application/json")
      .send(updateExpense);

    expect(response.status).toEqual(400);
    expect(response.text).toContain(
      '"category_id" must be less than or equal to 3'
    );
  });
  test("Category id must be an integer", async () => {
    const updateExpense = {
      expense_id: postId,
      shop_name: "Sale",
      category_id: 1.1,
      amount: 50,
      expense_date: "2023-01-23",
    };

    const response = await supertest(app)
      .put(`/api/expenses/${postId}`)
      .set("Accept", "application/json")
      .send(updateExpense);

    expect(response.status).toEqual(400);
    expect(response.text).toContain('"category_id" must be an integer');
  });
  test("Amount required", async () => {
    const updateExpense = {
      expense_id: postId,
      shop_name: "Sale",
      category_id: 1,
      expense_date: "2023-01-23",
    };

    const response = await supertest(app)
      .put(`/api/expenses/${postId}`)
      .set("Accept", "application/json")
      .send(updateExpense);

    expect(response.status).toEqual(400);
    expect(response.text).toContain('"amount" is required');
  });
  test("Amount must be one or greater than zero", async () => {
    const updateExpense = {
      expense_id: postId,
      shop_name: "Sale",
      category_id: 1,
      amount: -10,
      expense_date: "2023-01-23",
    };

    const response = await supertest(app)
      .put(`/api/expenses/${postId}`)
      .set("Accept", "application/json")
      .send(updateExpense);

    expect(response.status).toEqual(400);
    expect(response.text).toContain(
      '"amount" must be greater than or equal to 0'
    );
  });
  test("Date must be greater than or equal", async () => {
    const updateExpense = {
      expense_id: postId,
      shop_name: "Sale",
      category_id: 1,
      amount: 50,
      expense_date: "2000-01-23",
    };

    const response = await supertest(app)
      .put(`/api/expenses/${postId}`)
      .set("Accept", "application/json")
      .send(updateExpense);

    expect(response.status).toEqual(400);
    expect(response.text).toContain(
      '"expense_date" must be greater than or equal to "2005-01-01T00:00:00.000Z"'
    );
  });
  test("Date required", async () => {
    const updateExpense = {
      expense_id: postId,
      shop_name: "Sale",
      category_id: 1,
      amount: 50,
    };

    const response = await supertest(app)
      .put(`/api/expenses/${postId}`)
      .set("Accept", "application/json")
      .send(updateExpense);

    expect(response.status).toEqual(400);
    expect(response.text).toContain('"expense_date" is required');
  });
  test("Expense_id required", async () => {
    const updateExpense = {
      shop_name: "Sale",
      category_id: 1,
      amount: 50,
      expense_date: "2023-01-23",
    };

    const response = await supertest(app)
      .put(`/api/expenses/${postId}`)
      .set("Accept", "application/json")
      .send(updateExpense);

    expect(response.status).toEqual(400);
    expect(response.text).toContain('"expense_id" is required');
  });

  test("Expense_id must be integer", async () => {
    const updateExpense = {
      expense_id: 23.23,
      shop_name: "Sale",
      category_id: 1,
      amount: 50,
      expense_date: "2023-01-23",
    };

    const response = await supertest(app)
      .put(`/api/expenses/${postId}`)
      .set("Accept", "application/json")
      .send(updateExpense);

    expect(response.status).toEqual(400);
    expect(response.text).toContain('"expense_id" must be an integer');
  });
  afterAll(async () => {
    await supertest(app)
      .delete(`/api/expenses/${postId}`)
      .set("Accept", "application/json");
    connection.end();
  });
});
