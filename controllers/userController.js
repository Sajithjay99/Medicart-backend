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




// edit profile
export function editUser(req, res) {
    if (req.user == null){
        return res.status(400).json('You are not authorized to view this page');
    }

    const id = req.params.id;
    const updatedData = req.body;
    
    User.findById(id).then((user) => {
        if (!user) {
            return res.status(404).json({ message:'User not found' });
        }

        // Check if the logged-in user is trying to edit their own profile
        if (user.email === req.user.email) {
            // If the email matches, update the user
            User.findByIdAndUpdate(id, updatedData, { new: true })
                .then(updatedUser => res.status(200).json({ message: 'User Profile updated successfully', user: updatedUser }))
                .catch(err => res.status(400).json({ message:"Error updating User", error: err }));
        } else {
            return res.status(400).json({ message: 'You are not authorized to edit this user' });
        }
    }).catch((err) => {
        return res.status(400).json({ message: 'Error finding user', error: err });
    });
}


 


// delete user
export function deleteUser(req, res) {
    // Check if user is logged in
    if (req.user == null) {
        return res.status(400).json('You must login to delete your account');
    }

    const id = req.params.id;

    // Find the user by ID
    User.findById(id).then((user) => {
        // Check if the user is trying to delete their own account
        if (user.email === req.user.email) {
            // If so, proceed with deletion
            User.findByIdAndDelete(id).then(() => {
                return res.status(200).json({ message: 'User Deleted Successfully!' });
            })
            .catch((err) => {
                return res.status(400).json('Error: ' + err);
            });
        } else {
            // If the user is trying to delete someone else's account
            return res.status(403).json('You are not authorized to delete this account');
        }
    })
    .catch((err) => {
        // Error when user is not found
        return res.status(400).json('Error: ' + err);
    });
}


//logout user

export const logoutUser = (_req, res) => {
    try {
        res.clearCookie('token'); 
        res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// get all users to admin
export function getAllUsers(req, res) {
    const user = req.user;  // Assuming the user object is coming from the request (e.g., through authentication middleware)

    if (user == null || user.role !== 'admin') {
        return res.status(400).json("You can't view all users' details!");
    }

    if (user.role === 'admin') {
        User.find()
            .then(users => res.status(200).json(users))
            .catch(err => res.status(400).json('Error: ' + err));
    }
}


// delete users in admin board
export function deleteUserByAdmin(req, res) {
    const user = req.user;  // Assuming the user object is coming from the request (e.g., through authentication middleware)
    const userId = req.params.id;

    if (user == null || user.role !== 'admin') {
        return res.status(400).json("You can't delete users' details!");
    }

    User.findByIdAndDelete(userId)
        .then(deletedUser => {
            if (!deletedUser) {
                return res.status(404).json('User not found');
            }
            res.status(200).json({ message: 'User deleted successfully by Admin' });
        })
        .catch(err => res.status(400).json('Error: ' + err));
}

//getallprofiledeatils
export function getUser(req, res) {
    if (req.user == null) {
        return res.status(400).json({ message: 'You must be logged in first!' });
    }

    User.find({ email: req.user.email })
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((err) => {
            res.status(400).json('Error: ' + err);
        });
}

