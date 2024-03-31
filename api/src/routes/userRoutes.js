const express = require('express');
const {
  registerUser,
  verifyUserToken,
  userLogin,
  getUserByToken,
  getUserByEmail,
} = require('@api/controllers/userController');

const userRouter = express.Router();

userRouter.post('/register', registerUser);

userRouter.get('/verify/:token', verifyUserToken);

userRouter.post('/login', userLogin);

userRouter.get('/get_user/:token', getUserByToken);

userRouter.get('/fetch_user/:email', getUserByEmail);

module.exports = userRouter;
