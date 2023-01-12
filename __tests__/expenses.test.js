const { describe, expect, test } = require("@jest/globals");
const supertest = require("supertest");
const app = require("../app");

describe("GET expenses endpoint", () => {
  test("should return 200 AND json", async () => {
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
});

describe("GET endpoint by ID", () => {
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
    test("Should return 404 and not found", async () => {
      const response = await supertest(app).get("api/expenses/202");

      expect(response.status).toEqual(404);
      expect(response.text).toContain("not found");
    });
  });
});
