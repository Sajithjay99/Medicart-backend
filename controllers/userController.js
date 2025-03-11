import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


 export function registerUser(req,res){
    

    const UserData = req.body;
    UserData.password = bcrypt.hashSync(UserData.password,10);

    const newUser = new User(UserData);


     newUser.save().then(
        ()=>{
            res.status(200).json('User Added successfully');
        }
     ).catch(
            (err)=>{
                res.status(400).json('Error: '+err);
            }
     )


 }


 export function loginUser(req,res){

    const data = req.body;

    User.findOne(
        {
            email:data.email
        }
    ).then(
        (user)=>{
            if(user == null ){
                res.status(400).json('User not found');
            }else{

                const isPasswordCorrect = bcrypt.compareSync(data.password,user.password);

                if(isPasswordCorrect){
                            const token = jwt.sign(
                                {
                                    firstName:user.firstname,
                                    lastName:user.lastname,
                                    email:user.email,
                                    role:user.role,
                                    profilePicture:user.profilePicture
                                }, process.env.JWT_SECRET
                            )


                    res.status(200).json({
                       message: 'Login successful',token:token
                    });
                }else{
                    res.status(400).json('Invalid password');
                }
            }
        }
    )





 }


//edit profile




//logout user 