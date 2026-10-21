import mongoose from "mongoose"

const cartSchema = new mongoose.Schema({
    products:[{
        product:{
            type:mongoose.Schema.Types.ObjectId,
            required:true
        },
        quantity:{
            type:Number,
            required:true,
            default:1,
            min:1
        },
        size:{
            type:String,
            required:true,
            enum:["XS","S","M","L","XL","XXL"]
        },

    }],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    status:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    }
})
const cartModel = mongoose.model("carts",cartSchema)
export default cartModel