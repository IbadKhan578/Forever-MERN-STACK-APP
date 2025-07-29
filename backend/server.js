import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDb from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './Routes/userRoute.js';
import productRouter from './Routes/productRoute.js';
import cartRoute from './Routes/cartRoute.js';
import OrderRouter from './Routes/orderRoute.js';

// app config
const app = express();
const port = process.env.PORT || 8080;
connectDb();
connectCloudinary();

 // middleware 
app.use(cors());  // to run client and server on same ip
app.use(express.json());  // to parse json

// api end points
app.use('/api/user',userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart',cartRoute);
app.use('/api/order',OrderRouter);


app.get('/', (req, res) => {
  res.send("server is running");
});

app.listen(port, () => {
  console.log(`server is running at port: ${port}`);
});