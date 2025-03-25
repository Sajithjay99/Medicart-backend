import mongoose from "mongoose";

const orderSchema = mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },

    duration:{ 
        type:String,
        required:true
    },
    gender:{
        type:Boolean,
        required:true
    },
    reveive_substitutes:{
        type:Boolean,
        required:true
    },
    allergies:{
        type:Boolean,
        required:true
    },
    
    
    order_date:{
        type:Date,
        default:Date.now
    },

    note:{
        type:String,
        required:true
    },

    prescription_Image:{
        type:String,
        required:true
    },
    isApproved:{
        type:Boolean,
        default:false,
        required:true
    },
   
});

const Order = mongoose.model('Order',orderSchema);
export default Order;