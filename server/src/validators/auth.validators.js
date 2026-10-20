import {validationResult,body}from "express-validator"

const registerValidators = [
    body('email')
        .exists().withMessage("email is required")
        .trim()
        .bail()
        .isEmail().withMessage("plz enter a valid email"),
    body("name")
        .exists().withMessage("name is required").bail()
        .isString().withMessage("name must be in string")
        .trim()
        .isLength({min:2 , max:50}).withMessage("nam must be between2 to 50 letters"),
    body("password")
        .exists().withMessage("password is required").bail()
        .isString().withMessage("password must be string")
        .trim()
        .isLength({min:6}).withMessage("password must be atleast 6 letters"),
    (req,res,next)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                message:"invalid request",
                errors:errors.array()
            })
        }
        next()
    }
]


const loginValidator = [
    body('email')
        .exists().withMessage("email is required")
        .isString().withMessage("email must be string")
        .trim()
        .bail()
        .isEmail().withMessage("plz enter a valid email"),
    body("password")
        .exists().withMessage("password is required").bail()
        .isString().withMessage("password must be string")
        .trim()
        .isLength({min:6}).withMessage("password must be atleast 6 letters"),
        (req,res,next)=>{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
            return res.status(400).json({
                message:"invalid request",
                errors:errors.array()
            })
        }
        next()


        }
]


export {registerValidators,loginValidator} 