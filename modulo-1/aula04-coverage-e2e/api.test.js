const { describe, it } = require("mocha");
const request = require("supertest");
const app = require("./api");
const assert = require("assert");

describe("API Suite Test", () => {
  describe("/contact", () => {
    it("should request the contact page and return HTTP status 200", async () => {
      const response = await request(app).get("/contact").expect(200);
      assert.deepStrictEqual(response.text, "Contact us");
    });
  });

  describe("/hello", () => {
    it("should request an inexistent route /hi and redirect to /hello", async () => {
      const response = await request(app).get("/hi").expect(200);
      assert.deepStrictEqual(response.text, "Hello world");
    });
  });

  describe("/login", () => {
    it("should successfuly login and return HTTP status 200", async () => {
      const response = await request(app)
        .post("/login")
        .send({
          username: "cordeirovictorhc",
          password: "123456",
        })
        .expect(200);

      assert.deepStrictEqual(response.text, "Login success");
    });

    it("should not login with wrong credentials and return HTTP status 401", async () => {
      const response = await request(app)
        .post("/login")
        .send({
          username: "xuxadasilva",
          password: "abcdef",
        })
        .expect(401);

      assert.ok(response.unauthorized);
      assert.deepStrictEqual(response.text, "Login failed");
    });
  });
});
