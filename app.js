require("dotenv").config();
const express = require("express");
const Logger = require("./middleware/logger");
const cors = require("cors");

const app = express();
app.use(cors(), Logger, express.json(), express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ msg: "todos api" });
});

app.use("/todo", require("./routes/todo.routes"));

module.exports = app;
