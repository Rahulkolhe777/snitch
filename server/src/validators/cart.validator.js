import {body,validationResult} from "express-validator"

const AddToCartValidators = [
    body("product")
        .exists().withMessage("product id is required").bail()
        .isString().withMessage("product id must be a string").bail()
        .trim()
        .isMongoId().withMessage("product id is invalid"),
    body("quantity")
        .exists().withMessage("quantity is required").bail()
        .isInt({min:1}).withMessage("quantity must be a positive integer"),
    body("size")
        .exists().withMessage("size is required").bail()
        .isString().withMessage("size must be a string").bail()
        .isIn(["S","M","L","XL","XXL"]).withMessage("size is invalid"),
    (req,res,next)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){ m 
            return res.status(400).json({
                message:"invalid request",
                errors:errors.array()
            })
        }
        next()
    }
]


export default cartValidators