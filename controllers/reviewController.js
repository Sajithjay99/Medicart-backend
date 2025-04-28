import mongoose from 'mongoose';
import Review from "../models/review.js";

 //Add a review

 export function addReview(req,res){

        if(req.user== null){

            res.status(401).json({message:"You must be logged in to add a review"});
        }

        const data=req.body;
        data.name=req.user.firstName + " " + req.user.lastName;
        data.email=req.user.email;

        const newreview = new Review(data);

        newreview.save()
        .then(()=>{
            res.status(201).json({message:"Review added successfully"});
        }).catch((err)=>{
            res.status(500).json({message:"Error adding review",error:err});
        })

 
   }

// Get all reviews to Customers

 export function getReviewsAllCustomers(req,res){
    
        Review.find(
            {isApproved:true})
        .then(
            (reviews)=>{
            res.status(200).json(reviews);
            })
        .catch((err)=>{
            res.status(500).json({message:"Error getting reviews",error:err});
            })

    }

    // Get all reviews to Admin

    export function getReviewsAllAdmin(req,res){


        if(req.user== null || req.user.role != "admin"){

            res.status(401).json({message:"You must be logged in as an admin to view all reviews"});

            
        }

        if (req.user.role == "admin"){

            Review.find()
            .then(
                (reviews)=>{
                res.status(200).json(reviews);
                })
            .catch((err)=>{
                res.status(500).json({message:"Error getting reviews",error:err});
                })
    }
    }

    //Delete Reviews by Admin

    export function deleteReviewbyAdmin(req,res){

        if(req.user== null || req.user.role != "admin"){

            res.status(401).json({message:"You must be logged in as an admin to delete a review"});
            return;
            
        }

        const id=req.params.id;

        Review.findByIdAndDelete(id).then(()=>{
    res.status(200).json({message:"Review deleted successfully"});

    }).catch((err)=>{
        res.status(500).json({message:"Error deleting review",error:err});
    })
}


//Delete Reviews by Customer

export function deleteReviewbyCustomer(req, res) {

    if (req.user == null) {
        res.status(401).json({ message: "You must be logged in to delete a review" });
        return;
    }

    const id = req.params.id;

    // Find the review by ID first
    Review.findById(id)
        .then((review) => {
            // Check if the review exists
            if (!review) {
                return res.status(404).json({ message: "Review not found" });
            }

            // Ensure the logged-in user is the one who wrote the review
            if (review.email === req.user.email) {
                // Delete the review
                Review.findByIdAndDelete(id)
                    .then(() => {
                        res.status(200).json({ message: "Review deleted successfully" });
                    })
                    .catch((err) => {
                        // Log the error and respond with the message
                        console.error("Error deleting review:", err);
                        res.status(500).json({ message: "Error deleting review", error: err });
                    });
            } else {
                res.status(401).json({ message: "You can only delete your own reviews" });
            }
        })
        .catch((err) => {
            // Log the error and respond with the message
            console.error("Error finding review:", err);
            res.status(500).json({ message: "Error finding review", error: err });
        });
}


    //Update Reviews by Customer
    export function updateReviewByCustomer(req, res) {
        if (req.user == null) {
            res.status(401).json({ message: "You must be logged in to update a review" });
            return;
        }
    
        const id = req.params.id;
        const updatedData = req.body;
    
        Review.findById(id)
            .then((review) => {
                if (!review) {
                    res.status(404).json({ message: "Review not found" });
                    return;
                }
    
                if (review.email === req.user.email) {
                    Review.findByIdAndUpdate(id, updatedData, { new: true })
                        .then((updatedReview) => {
                            res.status(200).json({ message: "Review updated successfully", data: updatedReview });
                        })
                        .catch((err) => {
                            res.status(500).json({ message: "Error updating review", error: err });
                        });
                } else {
                    res.status(401).json({ message: "You can only update your own reviews" });
                }
            })
            .catch((err) => {
                res.status(500).json({ message: "Error finding review", error: err });
            });
    }
    

//Get Own Reviews by Customer
    export function getOwnReviews(req, res) {
        if (req.user == null) {
            res.status(401).json({ message: "You must be logged in to view your reviews" });
            return;
        }
    
        Review.find({ email: req.user.email })
            .then((reviews) => {
                if (reviews.length === 0) {
                    res.status(404).json({ message: "No reviews found" });
                } else {
                    res.status(200).json({ message: "Reviews retrieved successfully", data: reviews });
                }
            })
            .catch((err) => {
                res.status(500).json({ message: "Error fetching reviews", error: err });
            });
    }
    
    //Update Review Approval by Admin
     
   export function updateReviewApprovalByAdmin(req,res){

    const id=req.params.id;

    if(req.user == null ){
        
        res.status(401).json({message:"You must be logged in to approve a review"});
        return;
    }

    if (req.user.role != "admin") {
        res.status(401).json({ message: "You must be logged in as an admin to approve or disapprove reviews" });
        return;
    }

        Review.updateOne(
            {
                _id:id
            },
            {
                isApproved:true
            },
        ).then(
            ()=>{
                res.status(200).json({message:"Review approved successfully"});
            }
        ).catch(
            (err)=>{
                res.status(500).json({message:"Error approving review",error:err});
            }
        )

    }

//    // // Get Own One Review by Customer
export function getOwnOneReview(req, res) {
    if (req.user == null) {
        res.status(401).json({ message: "You must be logged in to view a review" });
        return;
    }

    const id = req.params.id;

    // Find the review by ID first
    Review.findById(id)
        .then((review) => {
            if (!review) {
                return res.status(404).json({ message: "Review not found" });
            }

            // Ensure the logged-in user is the one who wrote the review
            if (review.email === req.user.email) {
                res.status(200).json({ message: "Review retrieved successfully", data: review });
            } else {
                res.status(401).json({ message: "You can only view your own reviews" });
            }
        })
        .catch((err) => {
            res.status(500).json({ message: "Error finding review", error: err });
        });
}
