const { Router } = require('express');
const {
  getAllUsers,
  getOneUser,
  deleteUser,
  updateUser,
  RegisterNewUser,
  VerifyUserEmail,
  LoginUser,
  getAllTodosOfOneUser,
} = require('../controllers/user.controller');

const verifyJwtToken = require('../middleware/authMiddleware');

const router = Router();

/**
 * @URL : /user/
 * @Method : GET
 * @Status : PUBLIC
 * @Description : get all users data
 */

router.get('/', getAllUsers);

/**
 * @URL : /user/:id
 * @Method : GET
 * @Status : PUBLIC
 * @Description : get one user data
 */
// router.get('/:id', getOneUser);

/**
 * @URL : /user/:id
 * @Method : DELETE
 * @Status : PUBLIC
 * @Description : delete one user data
 */
router.delete('/:id', deleteUser);

/**
 * @URL : /user/:id
 * @Method : PATCH
 * @Status : PUBLIC
 * @Description : update one user data
 */
router.patch('/:id', updateUser);

/**
 * @URL : /user
 * @Method : POST
 * @Status : PUBLIC
 * @Description : create one user data
 */

router.post('/', RegisterNewUser);

/**
 * @URL : /user/verify/:id/:token
 * @Method : GET
 * @Status : PUBLIC
 * @Description : verify user email
 */

router.get('/verify/:id/:token', VerifyUserEmail);

/**
 * @URL : /user/login
 * @Method : POST
 * @Status : PUBLIC
 * @Description : user login
 */

router.post('/login', LoginUser);

/**
 * @URL : /user/todos/show
 * @Method : GET
 * @Status : PRIVET
 * @Description : get all todos for specific user
 */

router.get('/todos/show', verifyJwtToken, getAllTodosOfOneUser);

module.exports = router;
