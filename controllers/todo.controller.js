const Todo = require("../model/todo.schema");

const getAllTodos = async (req, res) => {
  try {
    const getAllTodos = await Todo.find({});
    res.status(200).json(getAllTodos);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
  }
};

const postTodo = async (req, res) => {
  try {
    const createTodo = await Todo.create({ ...req.body });
    res.status(201).json(createTodo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
  }
};

const getSingleTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const singleTodo = await Todo.findById(id);
    res.status(200).json(singleTodo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
  }
};

const updateTodo = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      _id,
      { ...req.body, _id },
      { new: true }
    );
    res.status(200).json(updatedTodo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findOneAndDelete({ _id: id });
    return res.status(200).json(todo);
  } catch (error) {
    console.log(err);
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllTodos,
  postTodo,
  getSingleTodo,
  updateTodo,
  deleteTodo,
};
