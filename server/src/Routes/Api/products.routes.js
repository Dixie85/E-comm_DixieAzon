import {Router} from "express";
import { allProducts, productById } from "../../Controllers/Api/product.controllers.js";

export const product = Router()

//Get all products endpoint
product.get("/product", allProducts);

//Get specific product by id endpoint
product.get("/product/:id", productById);

export default product