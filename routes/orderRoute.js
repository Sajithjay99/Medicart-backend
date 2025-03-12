import { addOrder,getAllOrders,getorderstocustomer,deleteOrder ,deleteOrderbyCustomer} from "../controllers/orderController.js";
import express from 'express';

const orderRouter=express.Router();

orderRouter.post('/add',addOrder);
orderRouter.get('/allorders',getAllOrders);
orderRouter.get('/myorders',getorderstocustomer);
orderRouter.delete('/delete/:id',deleteOrder);
orderRouter.delete('/deletebycustomer/:id',deleteOrderbyCustomer);

export default orderRouter;