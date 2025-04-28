import { addReview,getReviewsAllCustomers,getReviewsAllAdmin,deleteReviewbyAdmin,deleteReviewbyCustomer,updateReviewByCustomer,getOwnReviews,updateReviewApprovalByAdmin,getOwnOneReview} from "../controllers/reviewController.js";
import express from "express";

const reviewRouter = express.Router();

reviewRouter.post('/add', addReview);
reviewRouter.get('/getallapprove', getReviewsAllCustomers);
reviewRouter.get('/getall', getReviewsAllAdmin);
reviewRouter.get('/getownreviews', getOwnReviews);
reviewRouter.delete('/deletebyadmin/:id', deleteReviewbyAdmin);
reviewRouter.delete('/deletebycustomer/:id', deleteReviewbyCustomer);
reviewRouter.put('/updatebycustomer/:id', updateReviewByCustomer);
reviewRouter.put('/updatebyadmin/:id',updateReviewApprovalByAdmin);
reviewRouter.get('/getOwnOneReview/:id', getOwnOneReview);

export default reviewRouter;