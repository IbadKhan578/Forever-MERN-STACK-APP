import express from 'express';
import {addToCart,updateCart,getUerCart} from '../Controllers/cartController.js'
import authUser from '../middleware/Auth.js';


const cartRoute = express.Router();

cartRoute.post('/get', authUser, getUerCart);
cartRoute.post('/add', authUser, addToCart);
cartRoute.post('/update', authUser,  updateCart);


export default cartRoute;