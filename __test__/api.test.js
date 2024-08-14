const request = require("supertest");
const app = require("../app");

const { connect, disconnectDB } = require("../db/connectDB");
beforeEach(async () => {
  await connect(process.env.MONGO_URI).then(() => console.log("ok"));
});

afterEach(async () => {
  await disconnectDB();
});

describe("test / GET route", () => {
  test("status code of GET route should be 200", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });

  test('response body of / route should be {msg: "todos api"}', async () => {
    const response = await request(app).get("/");
    expect(response.body).toEqual({ msg: "todos api" });
  });
});

describe("CRUD routes", () => {
  let todoId;
  test("test GET route", async () => {
    const response = await request(app).get("/todo");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  test("test POST route", async () => {
    const response = await request(app).post("/todo").send({
      title: "todo #1",
      description: "it is desc for todo #1",
    });

    todoId = response.body._id;
    expect(response.status).toBe(201);
    expect(response.body.title).toBe("todo #1");
    expect(response.body.description).toBe("it is desc for todo #1");
    expect(response.body.isCompleted).toBeFalsy();
  });

  test("test PATCH route", async () => {
    const response = await request(app).patch(`/todo/${todoId}`).send({
      title: "todo #2",
      description: "it is desc for todo #2",
    });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe("todo #2");
    expect(response.body.description).toBe("it is desc for todo #2");
    expect(response.body.isCompleted).toBeFalsy();
  });

  test("test DELETE route", async () => {
    const response = await request(app).delete(`/todo/${todoId}`);

    expect(response.status).toBe(200);
  });
});
