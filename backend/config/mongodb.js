import mongoose from "mongoose";

const connectDb = async ()=>{

mongoose.connection.on('connected',()=>{  // run this function on success connection of db
    console.log("DataBase connected");
})


    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`) // / e-commerce is the name of the site
}

export default connectDb;