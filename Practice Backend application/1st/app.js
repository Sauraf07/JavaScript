import express from "express";
import authrouter from "./routers/auth.router.js";
import productrouter from "./routers/product.routes.js";
import Orderrouter from "./routers/order.router.js";

const app = express();
app.use(express.json());
app.use("/auth",authrouter);
app.use("/products",productrouter)
app.use("/orders",Orderrouter)
export default app;