import { addOrder,getAllOrders,getorderstocustomer,deleteOrder ,deleteOrderbyCustomer,updateOrder,approveOrder} from "../controllers/orderController.js";
import express from 'express';

const orderRouter=express.Router();

orderRouter.post('/add',addOrder);
orderRouter.get('/allorders',getAllOrders);
orderRouter.get('/myorders',getorderstocustomer);
orderRouter.delete('/delete/:id',deleteOrder);
orderRouter.delete('/deletebycustomer/:id',deleteOrderbyCustomer);
orderRouter.put('/update/:id',updateOrder);
orderRouter.put('/approve/:id',approveOrder);

export default orderRouter;