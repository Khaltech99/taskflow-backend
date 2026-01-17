import request from "supertest";

import { connectDb, clearDb, closeDb } from "./setup";

beforeAll(async () => {
  await connectDb();
}, 300000);

afterEach(async () => {
  await clearDb();
});

afterAll(async () => {
  await closeDb();
});

describe("user api", () => {
  it("should register a new user", async () => {
    const response = await request(app).post("/auth/register").send({
      name: "test",
      email: "test@gmail.com",
      password: "test",
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
  });
  it("login user", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "test@gmail.com",
      password: "test",
    });
    expect(response.status).toBe(200);
    expect(response.header).toHaveProperty("authorization");
  });
});
