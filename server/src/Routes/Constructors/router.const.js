import {Router} from "express";
import { userLogin } from "../../Controllers/login.controler.js";
import { userLogout } from "../../Controllers/logout.controler.js";
import { refreshToken } from "../../Controllers/refresh.controler.js";
import { createNewUser } from "../../Controllers/register.controler.js";
import root from "../../Controllers/root.controler.js";

const router = Router()

router.use(root)

//Register new user
router.post("/register", createNewUser)

// Login a user
router.post("/login", userLogin)

//Refresh token
router.post("/refresh", refreshToken) //authToken

// Login a user
router.post("/logout", userLogout)


export default router