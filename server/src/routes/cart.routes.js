import { Router } from "express";
import {addToCartController,getCartControlller} from "../controllers/cart.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router()

/**
 * post
 * /api/cart
 * access protected
 * description - add the product to the cart
 */
router.post("/",authenticate,AddToCartValidators,addToCartController)



/**
 * get 
 * protected acess
 * description- get the users cart items
 */
router.get("/",authenticate,getCartControlller)
    
    


export default router