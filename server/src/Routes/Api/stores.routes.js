import {Router} from "express";
import { allStores, storeById } from "../../Controllers/Api/store.controllers.js";

export const store = Router()

//get all stores by id
store.get("/store", allStores);

//get specific store by id
store.get("/store/:id", storeById);

export default store