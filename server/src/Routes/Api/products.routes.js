import {Router} from "express";
import { addNewProduct, allProducts, deleteProduct, productById, updateQuantity } from "../../Controllers/Api/product.controllers.js";
import { authToken } from "../../Middleware/authenticateToken.js";
import { authAdmin } from "../../Middleware/authenticateUsers.js";

export const product = Router()

//Get all products endpoint
product.get("/product", authToken, allProducts); //authToken ,

//Get specific product by id endpoint
product.get("/product/:id", authToken, productById);

//Add new product endpoint
product.post("/product", authAdmin, addNewProduct);

//Update product quantity endpoint
product.patch("/product/quantity", authAdmin, updateQuantity);

//Delete product endpoint
product.delete("/product/:id", authAdmin, deleteProduct);



export default product