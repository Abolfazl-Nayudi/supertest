const { Router } = require("express");
const {
  deleteTodo,
  getSingleTodo,
  getAllTodos,
  postTodo,
  updateTodo,
} = require("../controllers/todo.controller");

const router = Router();

/**
 * @URL : /todo/
 * @Method : GET
 * @Status : PUBLIC
 * @Description : get all todos data
 */
router.get("/", getAllTodos);

/**
 * @URL : /todo/:id
 * @Method : GET
 * @Status : PUBLIC
 * @Description : get one todo data
 */
router.get("/:id", getSingleTodo);

/**
 * @URL : /todo
 * @Method : POST
 * @Status : PUBLIC
 * @Description : create one todo data
 */
router.post("/", postTodo);

/**
 * @URL : /todo/:id
 * @Method : DELETE
 * @Status : PUBLIC
 * @Description : delete one todo data
 */
router.delete("/:id", deleteTodo);

/**
 * @URL : /todo/:id
 * @Method : PATCH
 * @Status : PUBLIC
 * @Description : update one todo data
 */
router.patch("/:id", updateTodo);

module.exports = router;
