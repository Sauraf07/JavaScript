import express, { Router } from "express";
import { verfifyToken } from "../middleware/auth.middleware.js";
import { createOrder, getOrders } from "../controllers/order.controller.js";



const Orderrouter = express.Router()

Orderrouter.post("/",verfifyToken,createOrder);
Orderrouter.get("/",verfifyToken,getOrders);

export default Orderrouter;