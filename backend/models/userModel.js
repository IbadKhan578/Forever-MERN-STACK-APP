import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true , unique:true },
    password:{type:String, required:true},
    cartData: {type:Object, default:{}} // when a user will be created the cart data object will set to empty





},{minimize:false})// empty object will be saved even there is no item is cartdata object

const userModel = mongoose.model('user',userSchema);
export default userModel;