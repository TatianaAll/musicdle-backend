
const request = require("supertest");
const app = require("../app");

describe("User Connection", () => {
  it("should connect the user", async () => {
    //GIVEN
    const password = "test";

    //WHEN
    const response = await request(app)
      .get("/api/search?q=test")
    console.log(response.body);
    //THEN
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.length).toBeGreaterThan(0);
  });
});
