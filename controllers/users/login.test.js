/**
 * *  Login requirements:
 * *  1. Response status must be 200.
 * *  2. The response must contain a token.
 * *  3. The response must contain a user object with 2 fields email and subscription, which have a String data type.
 */

const { default: mongoose } = require("mongoose");
const request = require("supertest");
const app = require("../../app");
require("dotenv").config();
const { connectMongo } = require("../../db/connection");

const start = async () => {
  try {
    await connectMongo();
    console.log("Database connection successful");

    return app.listen(process.env.PORT, (err) => {
      if (err) console.error("Error at server launch: ", err);
      console.log(`Server running. Use our API on port: ${process.env.PORT}`);
    });
  } catch (err) {
    console.error(`Failed to launch application with error: ${err.message}`);
    process.exit(1);
  }
};

const testUser = {
  email: "test@gmail.com",
  password: "123456",
};

describe("test login controller", () => {
  let server;

  beforeAll(async () => {
    server = await start();
  });

  afterAll(() => {
    server.close(() => {
      mongoose.connection.close(false);
    });
  });

  test("Response status must be 200", async () => {
    const response = await request(app).post("/api/users/login").send(testUser);

    expect(response.status).toBe(200);
  });

  test("The response must contain a token", async () => {
    const response = await request(app).post("/api/users/login").send(testUser);

    expect(response.body.token).toBeDefined();
  });

  const testDescription =
    "The response must contain a user object with 2 fields email and subscription, which have a String data type";

  test(testDescription, async () => {
    const response = await request(app).post("/api/users/login").send(testUser);

    expect(response.body.user).toEqual(
      expect.objectContaining({
        email: expect.any(String),
        subscription: expect.any(String),
      })
    );
  });
});
