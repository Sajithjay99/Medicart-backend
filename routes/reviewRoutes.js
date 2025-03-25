import { addReview,getReviewsAllCustomers,getReviewsAllAdmin,deleteReviewbyAdmin,deleteReviewbyCustomer,updateReviewByCustomer,getOwnReviews,updateReviewApprovalByAdmin} from "../controllers/reviewController.js";
import express from "express";

const reviewRouter = express.Router();

reviewRouter.post('/add', addReview);
reviewRouter.get('/getallapprove', getReviewsAllCustomers);
reviewRouter.get('/getall', getReviewsAllAdmin);
reviewRouter.delete('/deletebyadmin/:id', deleteReviewbyAdmin);
reviewRouter.delete('/deletebycustomer/:id', deleteReviewbyCustomer);
reviewRouter.put('/updatebycustomer/:id', updateReviewByCustomer);
reviewRouter.get('/getownreviews', getOwnReviews);
reviewRouter.put('/updatebyadmin/:id',updateReviewApprovalByAdmin);
export default reviewRouter;