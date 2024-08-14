const { Schema, model } = require("mongoose");

const todoSchema = new Schema({
  title: {
    type: String,
    required: [true, "title is required"],
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const Todo = model("Todo", todoSchema);

module.exports = Todo;
