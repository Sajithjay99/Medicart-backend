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
             
        },

        name
        :{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true,
            min: [1, 'Rating must be at least 1'],
            max: [5, 'Rating cannot be more than 5']
        },
        comment:{
            type:String,
            required:[true, 'comment is required'],
        },

        date:{
            type:Date,
            default:Date.now
        },

        profilePicture:{
            type:String,
            required:true,
            default:"https://static.vecteezy.com/system/resources/previews/005/005/788/non_2x/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg"
        },

        isApproved:{
            type:Boolean,
            default:false,
            required:true
        },
        reviewType: {
            type: String,
            required: [true, 'Type is required'],
          },
          recommendation: {
            type: Boolean,
            required: true,
          },
          image: {
            type: String,
            required: false,
          },



 });

 const Review = mongoose.model('Review',reviewSchema);

 export default Review;