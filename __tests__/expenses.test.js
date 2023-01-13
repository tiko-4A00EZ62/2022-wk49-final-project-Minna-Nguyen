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
