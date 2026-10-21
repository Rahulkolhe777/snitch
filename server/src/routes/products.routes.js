import {Router} from "express";
import createProductValidator from "../validators/product.validator";
import { authenticate } from "../middleware/auth.middleware";
import {createProductController} from "../controllers/products.controller"
import multer from "multer"


const router = Router();

const upload = multer({
    storage:multer.memoryStorage(),
    limits:{
        fileSize: 3 * 1024 * 1024
    }
    //filefilter is used to except the file of specific type like image audio video pdf etc
})


/**
 * post         
 * route /api/products
 * crate product and save on db and store images in imagekit
 */
router.post("/",
    //cheak user autharised or not
    authenticate,
    //cheak the role
    async(req,res,next)=>{
        if (req.user.role !== "seller") {
            return res.status(403).json({
                Message:"invalid seller please get lost sir"
            })
        }
        next()
    },
    //require fore reading form data
    upload.array("images"),
    //parse the prices and sizes 
    (req, res, next) => {
        try {
            if (typeof req.body.price === "string") {
                req.body.price = JSON.parse(req.body.price)
            }
            if (typeof req.body.sizes === "string") {
                req.body.sizes = JSON.parse(req.body.sizes)
            }
            next()
        } catch (error) {
            return res.status(400).json({
                message: "invalid request",
                errors: [
                    {
                        field: "price/sizes",
                        message: "price and sizes must be valid JSON strings"
                    }
                ]
            })
        }
    },
    createProductValidator,
    createProductController)





export default router;