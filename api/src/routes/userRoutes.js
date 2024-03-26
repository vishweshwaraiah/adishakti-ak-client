const express = require('express');
const {
  registerUser,
  verifyUserToken,
  userLogin,
  getUserByToken,
} = require('@api/controllers/userController');

const userRouter = express.Router();

userRouter.post('/register', registerUser);

userRouter.get('/verify/:token', verifyUserToken);

userRouter.post('/login', userLogin);

userRouter.get('/get_user/:token', getUserByToken);

module.exports = userRouter;
