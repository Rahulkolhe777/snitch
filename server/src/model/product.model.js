import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    tittle: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    images: {
        type: [String],
        validate: {
            validator: function (images) {
                return images.length <= 5;
            },
            message: "A product can have at most 5 images.",
        },
        default: [],
    },
    price: {
        amount:{
            type:Number,
            required:true,
            trim:true
        },
        currency:{
            type:String,
            enum:["INR","USD"],
            default:"INR"
        }
    },
    sizes:[{
        size:{
            type:String,
            enum:["S","M","L","XL","XXL"],
            required:true,
            trim:true
        },
        stock:{
            type:Number,
            min:0,
            default:0,
        }
    }],

    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
}, { timestamps: true });


const productModel = mongoose.model("products", productSchema);


export default productModel;