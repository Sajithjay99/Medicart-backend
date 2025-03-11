import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt,{decode} from 'jsonwebtoken';
import userRouter from './routes/userRoutes.js ';



 dotenv.config();
 const app = express();

app.use(bodyParser.json());


app.use((req,res,next)=>{

    let token = req.headers("Authorization");


    if(token != null){

        token = token.replace('Bearer ','');

        jwt.veryfy(token,process.env.JWT_SECRET,(err,decoded)=>{

            if(err){
                res.status(403).json('Token is invalid');
            }else{
                next();
            }
        })
    }
    
})


const mongoUrl =  process.env.MONGO_URL;


mongoose.connect(mongoUrl );

const connection = mongoose.connection;

connection.once('open',()=>{
    console.log('MongoDB connection established successfully');
})


app.use('/api/users',userRouter);


app.listen(5000,()=>{
    console.log('Server is running on port 5000');
})
 







