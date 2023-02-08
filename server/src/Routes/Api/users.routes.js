import {Router} from "express";
import { allUsers, createNewUser, deleteUser, updateUser, userById } from "../../Controllers/Api/user.controllers.js";

export const user = Router()

//Get all users endpoint
user.get("/user", allUsers);

//Get specific user by id endpoint
user.get("/user/:id", userById);

//Post a new user endpoint
user.post("/user/", createNewUser)

//Patch a specific user
user.patch("/user/:id", updateUser)

//Delete a specific user
user.delete("/user/:id",deleteUser)


export default user