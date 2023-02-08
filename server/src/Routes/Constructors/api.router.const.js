import {Router} from "express";
import product from "../Api/products.routes.js";
import store from "../Api/stores.routes.js";
import user from "../Api/users.routes.js";

export const api = Router()

api.use(user)
api.use(store)
api.use(product)

export default api