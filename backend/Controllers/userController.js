import validator from "validator";
import 'dotenv/config';
import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// generate token

const createToken = async (id)=>{ // generate token using user id
    return jwt.sign({id},process.env.JWT_SECRET)

}


// route for user login
const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    // check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      // if user does not exists , send response
      return res.json({ success: false, message: "User doesn't exists" });
    }

    // check  if passowrd is correct
    const isMatch = await bcrypt.compare(password, user.password);
    // if the password is incorrect
    if (!isMatch) {
      return res.json({ success: false, message: "Incorrect Password" });
    } else {
      let token = await createToken(user._id);
      return res.json({ success: true, token });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// route for user registration

const registerUser = async (req, res) => {
  try {
    let { name, email, password } = req.body; // will get name , email , password from frontend

    // check if userAlready exists
    const exists = await userModel.findOne({ email });
    // if existed send massage and terminate the function
    if (exists) {
      return res.json({ success: false, message: "User already exists" }); // if existed, terminate function
    }

    // validating email format and strong password

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a  strong password",
      });
    }
    // Hash passowrd using bcrypt 

    let hashedPassword = await bcrypt.hash(password,10);



    //create new user
    const newUser = new userModel({ name, email, password: hashedPassword });
   const user = await newUser.save();

   // after registeration we will provide a token to a user so by using that user can login
    const token = await createToken(user._id);
    res.json({success:true, token , message:"User Registerd successfully"})




  } catch (error) {
 console.log(error)
 res.json({success:false, message: error.message});


  }
};

// route for admin login

const adminLogin = async (req,res) => {
  try {

    const {email,password} = req.body;

    if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
      
      const token =  jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({success:true, token})
    }else{
      res.json({success:false,message:"Invalid Credentials"})
    }
    
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message }); 
  }


};

export { loginUser, registerUser, adminLogin };
