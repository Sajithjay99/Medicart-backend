import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt,{decode} from 'jsonwebtoken';
import userRouter from './routes/userRoutes.js ';
import reviewRouter from './routes/reviewRoutes.js';
import productRouter from './routes/ProductsRoutes.js';
import cors from 'cors';
import orderRouter from './routes/orderRoute.js';

 

 dotenv.config();
 const app = express();

app.use(bodyParser.json());
app.use(cors());

  


app.use((req, res, next) => {
    let token = req.headers['authorization']; 

    if (token) {
        token = token.replace('Bearer ', '');
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Token is invalid' });
            } else {
                req.user = decoded;  
                next();
            }
        });
    } else {
        next();  
    }
});

const mongoUrl =  process.env.MONGO_URL;


mongoose.connect(mongoUrl );

const connection = mongoose.connection;

connection.once('open',()=>{
    console.log('MongoDB connection established successfully');
})


app.use('/api/users',userRouter);
app.use('/api/reviews',reviewRouter);
app.use('/api/products',productRouter);
app.use('/api/orders',orderRouter);

app.listen(5000,()=>{
    console.log('Server is running on port 5000');
})
 




 







