import { validationResult, body } from "express-validator"

const createProductValidator = [
    body("tittle")
        .exists().withMessage("tittle is required").bail()
        .isString().withMessage("tittle must be a string")
        .trim()
        .isLength({ min: 3, max: 100 }).withMessage("tittle must be between 3 to 100 characters")
        .isAlpha("en-US",{ignore:" -"}).withMessage("tittle must contain only angrezi lettersand the spaces"),

    body("description")
        .exists().withMessage("description is important bro misunderstanding ho sakti hai").bail()
        .isString().withMessage("description must be a string")
        .trim()
        .isLength({ min: 10, max: 1000 }).withMessage("description must be between 10 to 1000 characters"),

    body("images")
        .optional()
        .isArray({ max: 5 }).withMessage("images must be an array with at most 5 items"),
    body("images.*")
        .isURL().withMessage("each image must be a valid URL"),

    body("price.amount")
        .exists().withMessage("price amount is required").bail()
        .isFloat({min:0}).withMessage("price amount must be a floating number and greater then 0 "),

    body("price.currency")
        .exists().withMessage("currency is required").bail()
        .isString().withMessage("price currency must be a string")
        .isIn(["INR", "USD"]).withMessage("currency must be either INR or USD"),

    body("sizes")
        .exists().withMessage("sizes is required").bail()
        .isArray({ min: 1 }).withMessage("sizes must be a non-empty array"),
    body("sizes.*.size")
        .exists().withMessage("size sieze must be present in every entry of sizes array").bail()
        .isString().withMessage("size must be a string")
        .isIn(["S", "M", "L", "XL", "XXL"]).withMessage("size must be one of S, M, L, XL, XXL"),
    body("sizes.*.stock")
        .optional()
        .isInt({ min: 0 }).withMessage("stock must be a non-negative integer"),

    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "invalid request",
                errors: errors.array()
            })
        }
        next()
    }
]


export default createProductValidator 
