import productModel from "../model/product.model"
import { uploadFile } from "../storage/storage.service"


export const createProductController = async(req,res)=>{
    console.log(req.body)
    console.log(req.files)
    const fileUrl =[]
    for(let i=0;i<req.files.length;i++){
       const response = await uploadFile({
            buffer:req.files[i].buffer,
            fileName:req.files[i].originalname
       })
       fileUrl.push(response.url)   
    }
    console.log(fileUrl)

    const product = await productModel.create({
        tittle:req.body.tittle,
        description:req.body.description,
        images:fileUrl,
        price:{
            amount:req.body.price.amount,
            currency:req.body.price.currency
        },
        sizes:req.body.sizes,
        seller:req.user.userId
    })
    res.status(200).json({
        meessage:"products created successfully",
        data:product
    })
}

export const getAllProductsController = async(req,res)=>{
    const products = await productModel.find()
    res.status(200).json({
        message:"products fetched successfully",
        data:products
    })
}