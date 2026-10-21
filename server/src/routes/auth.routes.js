import { Router } from "express";
import {registerValidators,loginValidator} from "../validators/auth.validators";
import { registerController,loginController,refreshController,getMeController } from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

//register 
//require {email,pass,name}
router.post("/register",registerValidators,registerController)

//login
//require {email,pass} = ree.body
//201 if successed else 404 not found
router.post("/login",loginValidator,loginController)


/**
 * post auth/api/refresh
 */
router.post("/refresh",refreshController)


/**
 * get to /api/auth/me
 * it will provide the detail of the user
 */

router.get("/me",authenticate,getMeController)

export default router;
