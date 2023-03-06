import {Router} from "express";
import { allUsers, deleteUser, test, updateUser, userById } from "../../Controllers/Api/user.controllers.js";
import { authSuper } from "../../Middleware/authenticateUsers.js";

export const user = Router()

//Get all users endpoint
user.get("/user",  allUsers);

//Get specific user by id endpoint
user.get("/user/:id", userById);

//Patch a specific user
user.patch("/user/:id", authSuper, updateUser)

//Delete a specific user
user.delete("/user/:id", authSuper,deleteUser)

user.post("/user/test", test)

export default user