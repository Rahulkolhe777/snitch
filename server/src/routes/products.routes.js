import {Router} from "express";
import createProductValidator, { unlistProductValidator } from "../validators/product.validator";
import authenticateUser, { authenticate, authenticateseller } from "../middleware/auth.middleware";
import {createProductController,getAllProductsController, unlistProductController} from "../controllers/products.controller"
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
    authenticateseller,
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

/**
 * get 
 * route api/products
 * read all the products from db
 * acess user 
 */
router.get("/",
    //cheak user autharised or not
    authenticate,
    //cheak the role
    authenticateUser
    ,
    getAllProductsController
)

/**
 * patch
 * route api/products/unlist/:id
 * unlist the product
 * acess user 
*/
router.patch("api/products/unlist/:id",authenticate,authenticateseller,unlistProductValidator,unlistProductController)

export default router;