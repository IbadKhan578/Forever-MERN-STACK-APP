import userModel from "../models/userModel.js";


// add to cart
const addToCart = async (req,res)=>{

try {
        let {userId , itemId , size } = req.body;

        const UserData = await userModel.findById(userId);
        const cartData = await UserData.cartData;

        // if item already exists in cart 
        if(cartData[itemId]){
            // if item exists with same size then increase else add product with different size
            if(cartData[itemId][size]){
                cartData[itemId][size] +=1;
            }else{

            cartData[itemId][size] = 1; }
        }else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
                }


                await userModel.findByIdAndUpdate(userId, {cartData});
                res.json({success:true ,  message:"Added To Cart"});

    
} catch (error) {
    console.log(console.error);
    res.json({success:false, message:error.message});
    
}    

}

// update cart
const updateCart = async (req,res)=>{

    try {
        let {userId , itemId, size , quantity}  = req.body;
         const UserData = await userModel.findById(userId);
        const cartData = await UserData.cartData;

        cartData[itemId][size] = quantity;

         await userModel.findByIdAndUpdate(userId,{cartData});
         res.json({success:true ,  message:"Cart Updated"});

        
    } catch (error) {
            console.log(console.error);
    res.json({success:false, message:error.message});
        
    }

}


//get user cart
const getUerCart = async (req,res)=>{

    try {

        let {userId} = req.body;
         const UserData = await userModel.findById(userId);
        const cartData = await UserData.cartData;
               res.json({success:true ,  cartData});

        
        
    } catch (error) {
      console.log(console.error);
    res.json({success:false, message:error.message});
        
    }

}

export {addToCart , updateCart ,getUerCart};