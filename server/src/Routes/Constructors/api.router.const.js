import {Router} from "express";
import { authToken } from "../../Middleware/authenticateToken.js";
import product from "../Api/products.routes.js";
import store from "../Api/stores.routes.js";
import user from "../Api/users.routes.js";

export const api = Router()

api.use(authToken)
api.use(user)
api.use(store)
api.use(product)

export default api