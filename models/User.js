import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
    {
       firstname:{
            type:String,
            required:true
        },
        lastname:{
            type:String,
            required:true
       }
        ,
        email:{
            type:String,
            unique:true,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        phone:{
            type:String,
            required:true
        },
        role:{
            type:String,
            required:true,
            default:"customer"
        },
        profilePicture:{
            type:String,
            required:true,
            default:"https://static.vecteezy.com/system/resources/previews/005/005/788/non_2x/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg"
        }
    }
)

const User = mongoose.model('User',userSchema);

export default User;


