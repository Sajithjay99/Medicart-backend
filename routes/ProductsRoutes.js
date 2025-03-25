 import express from 'express';
 import {addProducts, getProducts, updateProduct,deleteProduct} from '../controllers/ProductController.js';


 const productRouter = express.Router();

    productRouter.post('/add', addProducts);
    productRouter.get('/all', getProducts);
    productRouter.put('/update/:id', updateProduct);
    productRouter.delete('/delete/:id', deleteProduct);


    export default productRouter;
