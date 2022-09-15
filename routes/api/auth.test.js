const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();
const app = require("../../app");
const { User } = require("../../models/user");

const { BD_HOST_TEST, PORT } = process.env;

describe("test auth routes", () => {
  let server;
  beforeAll(() => server = app.listen(PORT));
  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(BD_HOST_TEST).then(() => done())
  });

  afterEach((done) => {
    mongoose.connection.db.dropCollection(() => {
      mongoose.connection.close(() => done());
    })
  });

  test("test login route", async () => {
    const newUser = {
      email: "usertest@gmail.com",
      password: "user-test-password",
    };

    const user = await User.create(newUser);

    const loginUser = {
      email: "usertest@gmail.com",
      password: "user-test-password",
    };

    const response = await request(app)
      .post("/api/auth/login")
      .send(loginUser);
    expect(response.statusCode).toBe(200);
    const { body } = response;
    expect(body.token).toBeTruthy();
    const { token } = await User.findById(user._id);
    expect(body.token).toBe(token);
  })
})