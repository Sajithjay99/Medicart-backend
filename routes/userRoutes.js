import { registerUser } from '../controllers/userController.js';
import { loginUser } from '../controllers/userController.js';
import { editUser } from '../controllers/userController.js';
import { deleteUser } from '../controllers/userController.js';
import { getAllUsers } from '../controllers/userController.js';
import { deleteUserByAdmin } from '../controllers/userController.js';
import { logoutUser } from '../controllers/userController.js';
import { getUser } from '../controllers/userController.js';
import express from 'express';


const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.put('/edit/:id', editUser);  // Protected route, requires authentication
userRouter.delete('/delete/:id',  deleteUser);  // Regular user delete route
userRouter.get('/all', getAllUsers);  // Admin-only route, requires authentication
userRouter.get('/profile', getUser);
userRouter.post('/logout', logoutUser);  // POST method for logout
userRouter.delete('/delete-user/:id',  deleteUserByAdmin);  // Admin route for deleting by ID

export default userRouter;
