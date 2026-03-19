import Order from "../models/order.model.js";

export const createOrder = async (req,res)=>{
    const {total}= req.body;

    const order = await Order.create({
        total,
        userId : res.user.id,
    })
    res.json(order)
};
export const getOrders = async(req,res)=>{
    const order = await Order.findAll({
        where:{userId:res.user.id}
    })
    res.json(order)
}