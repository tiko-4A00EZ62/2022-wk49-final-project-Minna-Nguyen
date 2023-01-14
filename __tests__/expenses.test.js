const { describe, expect, test } = require("@jest/globals");
const supertest = require("supertest");
// const connection = require("../db/connection");
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
          expense_id: 2,
          shop_name: "Tokmanni",
          category_type: "shop",
          amount: 2.89,
          date: "2022-12-27T16:05:50.000Z",
        },
        {
          expense_id: 6,
          shop_name: "Alepa",
          category_type: "shop",
          amount: 3,
          date: "2022-12-27T16:05:50.000Z",
        },
        {
          expense_id: 4,
          shop_name: "Prisma",
          category_type: "shop",
          amount: 5.02,
          date: "2022-12-27T16:05:50.000Z",
        },
      ])
    );
  });
  // endpoint by id
  test("Should return expense 2", async () => {
    const response = await supertest(app)
      .get("/api/expenses/12")
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    expect(response.headers["content-type"]).toMatch(
      "application/json; charset=utf-8"
    );
    expect(response.body).toEqual(
      expect.objectContaining({
        expense_id: 12,
        shop_name: "Sale",
        category_type: "shop",
        amount: 50,
        date: "2023-01-22T22:00:00.000Z",
      })
    );
  });
  // error testing
  test("Should return 404 and not found", async () => {
    const response = await supertest(app).get("/api/expenses/202");
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
          date: "2022-12-27T16:05:50.000Z",
        },
        {
          expense_id: 3,
          shop_name: "Prisma",
          category_type: "shop",
          amount: 11.48,
          date: "2022-12-27T16:05:50.000Z",
        },
        {
          expense_id: 4,
          shop_name: "Prisma",
          category_type: "shop",
          amount: 5.02,
          date: "2022-12-27T16:05:50.000Z",
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
          date: "2022-12-27T16:05:50.000Z",
        },
        {
          expense_id: 8,
          shop_name: "Rituals",
          category_type: "other",
          amount: 10.9,
          date: "2022-02-12T22:00:00.000Z",
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
          date: "2022-12-27T16:05:50.000Z",
        },
        {
          expense_id: 7,
          shop_name: "K-market",
          category_type: "food",
          amount: 69.02,
          date: "2022-12-27T16:05:50.000Z",
        },
      ])
    );
  });
  // endpoint by month
  test("Should return list of expenses with month filter", async () => {
    const response = await supertest(app)
      .get("/api/expenses/month/2")
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    expect(response.headers["content-type"]).toMatch(
      "application/json; charset=utf-8"
    );
    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          expense_id: 8,
          shop_name: "Rituals",
          category_type: "other",
          amount: 10.9,
          date: "2022-02-12T22:00:00.000Z",
        },
      ])
    );
  });
  // endpoint by shop name
  test("Should return list of expenses by shop name", async () => {
    const response = await supertest(app)
      .get("/api/expenses/shop/Sale")
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    expect(response.headers["content-type"]).toMatch(
      "application/json; charset=utf-8"
    );
    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          expense_id: 11,
          shop_name: "Sale",
          category_type: "shop",
          amount: 50,
          date: "2023-01-22T22:00:00.000Z",
        },
        {
          expense_id: 12,
          shop_name: "Sale",
          category_type: "shop",
          amount: 50,
          date: "2023-01-22T22:00:00.000Z",
        },
        {
          expense_id: 19,
          shop_name: "Sale",
          category_type: "shop",
          amount: 50,
          date: "2023-01-22T22:00:00.000Z",
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
          date: "2022-12-27T16:05:50.000Z",
        },
        {
          expense_id: 4,
          shop_name: "Prisma",
          category_type: "shop",
          amount: 5.02,
          date: "2022-12-27T16:05:50.000Z",
        },
        {
          expense_id: 6,
          shop_name: "Alepa",
          category_type: "shop",
          amount: 3,
          date: "2022-12-27T16:05:50.000Z",
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
          date: "2022-12-27T16:05:50.000Z",
        },
        {
          expense_id: 3,
          shop_name: "Prisma",
          category_type: "shop",
          amount: 11.48,
          date: "2022-12-27T16:05:50.000Z",
        },
        {
          expense_id: 5,
          shop_name: "Wolt",
          category_type: "food",
          amount: 32.18,
          date: "2022-12-27T16:05:50.000Z",
        },
      ])
    );
  });
});

describe("POST expense endpoint", () => {
  const connection = require("../db/connection");

  test("Should create new expense", async () => {
    const expense = {
      shop_name: "Apple Store",
      category_id: 3,
      amount: 24.9,
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
    expect(response.body.shop_name).toEqual("Apple Store");
    expect(response.body.category_id).toEqual(3);
    expect(response.body.amount).toEqual(24.9);
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
  test("Amount must be one or greater than one", async () => {
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
      '"amount" must be greater than or equal to 1'
    );
  });
  test("Should create new expense", async () => {
    const expense = {
      shop_name: "Apple Store",
      category_id: 3,
      amount: 24.91,
    };

    const response = await supertest(app)
      .post("/api/expenses")
      .set("Accept", "application/json")
      .send(expense);

    expect(response.status).toEqual(400);
    expect(response.text).toContain("expense already exist");
  });

  afterAll(async () => {
    const deleteQuery = `DELETE FROM expenses WHERE shop_name LIKE 'Apple Store' AND category_id LIKE 3 AND amount LIKE 24.91;`;
    connection.query(deleteQuery, (err, result) => {
      if (err) {
        console.log(err);
      }
    });
  });
});
