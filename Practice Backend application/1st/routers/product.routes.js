import express, { Router } from "express";
import { verfifyToken } from "../middleware/auth.middleware.js";
import { createProduct, getProducts } from "../controllers/product.controller.js";
const productrouter = express.Router();
productrouter.post("/",verfifyToken,createProduct)
productrouter.get("/",getProducts)
export default productrouter;