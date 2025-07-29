import express from 'express';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/Auth.js';
import {placeOrder,placeOrderStripe , placeOrderRazorpay, AllOrders , userOrders , updateStatus, verifyStripePayment} from '../Controllers/orderController.js';

const OrderRouter = express.Router();

// admin features
OrderRouter.post('/list',adminAuth, AllOrders)
OrderRouter.post('/status',adminAuth,updateStatus);

//  payment features

OrderRouter.post('/place',authUser,placeOrder);
OrderRouter.post('/stripe',authUser,placeOrderStripe);
OrderRouter.post('/razorpay',authUser,placeOrderRazorpay);
OrderRouter.post('/verify-stripe', verifyStripePayment);

// user feature

OrderRouter.post('/userorders',authUser,userOrders);


export default OrderRouter;