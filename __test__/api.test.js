const request = require("supertest");
const app = require("../app");
const assert = require("assert");
const mongoose = require("mongoose");

const { connect, disconnectDB } = require("../db/connectDB");
beforeEach((done) => {
  mongoose.connect(process.env.MONGO_URI);
  // connect(process.env.MONGO_URI);
  console.log(done);
});

afterEach((done) => {
  mongoose.connection.close();
  // disconnectDB();
  console.log(done);
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
  test("test GET route", async () => {
    const response = await request(app).get("/todo");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  test("test POST route", async () => {
    const response = await request(app).post("/todo").send({
      title: "todo #1",
      description: "it is desc for todo #1",
      userId: "66828d89d2b3a919bc1be26d",
    });

    expect(response.status).toBe(201);
    expect(res.body.title).toBe("todo #1");
    expect(res.body.description).toBe("it is desc for todo #1");
    expect(res.body.isCompleted).toBeFalsy();
    expect(res.body.userId).toBe("66828d89d2b3a919bc1be26d");
  });
});

// request(app)
//   .get("/")
//   .expect(200)
//   .expect((res) => {
//     assert.deepEqual(res.body, { msg: "todos api" });
//   })
//   .end((err) => {
//     if (err) throw new Error(err);
//     console.log("test passed for / GET");
//   });

const runTests = async () => {
  try {
    await connect(process.env.MONGO_URI);
    console.log("Running tests...");

    const getAllTodoResponse = await request(app)
      .get("/todo")
      .expect(200)
      .expect((res) => {
        assert(Array.isArray(res.body));
      });

    console.log("test passed for /todo GET");

    const postTodoResponse = await request(app)
      .post("/todo")
      .send({
        title: "todo #1",
        description: "it is desc for todo #1",
        userId: "66828d89d2b3a919bc1be26d",
      })
      .expect(200)
      .expect((res) => {
        assert(res.body.title === "todo #1");
        assert(res.body.description === "it is desc for todo #1");
        assert(res.body.isCompleted === false);
        assert(res.body.userId === "66828d89d2b3a919bc1be26d");
      });

    console.log("test passed for /todo POST");

    const updateTodoResponse = await request(app)
      .patch(`/todo/${postTodoResponse.body._id}`)
      .send({
        title: "todo shalgham",
        description: "it is desc for todo shalgam",
        userId: "66828d89d2b3a919bc1be26d",
      })
      .expect(200)
      .expect((res) => {
        assert(res.body.title === "todo shalgham");
        assert(res.body.description === "it is desc for todo shalgam");
      });

    console.log(`test passed for /todo/${updateTodoResponse.body._id} PATCH`);

    const deleteTodoResponse = await request(app)
      .delete(`/todo/${updateTodoResponse.body._id}`)
      .expect(200);

    console.log(`test passed for /todo/${deleteTodoResponse.body._id} DELETE`);
  } catch (error) {
    console.log(error);
  }
};

// runTests();
