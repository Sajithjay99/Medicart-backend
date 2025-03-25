import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(


    {
        _id:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            auto:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },

        name
        :{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        comment:{
            type:String,
            required:true
        },

        date:{
            type:Date,
            default:Date.now
        },

        profilePiccture:{
            type:String,
            required:true,
            default:"https://static.vecteezy.com/system/resources/previews/005/005/788/non_2x/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg"
        } ,

        isApproved:{
            type:Boolean,
            default:false,
            required:true
        }


 });

 const Review = mongoose.model('Review',reviewSchema);

 export default Review;