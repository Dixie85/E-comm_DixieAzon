import {Router} from "express";
import { addNewStore, allStores, deleteStore, storeById, storeProductsById } from "../../Controllers/Api/store.controllers.js";
import { authAdmin, authSuper } from "../../Middleware/authenticateUsers.js";

export const store = Router()

//get all stores by id
store.get("/store", authAdmin, allStores);

//get specific store by id
store.get("/store/:id", authAdmin, storeById);

//get specific stores products by id
store.get("/store/products/:id", authAdmin, storeProductsById);

//create new store
store.post("/store", authAdmin, addNewStore);

//Delete store by id
store.delete("/store/:id", authSuper, deleteStore);

export default store