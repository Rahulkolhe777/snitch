import { Router } from "express";
import registerValidators from "../validators/auth.validators";
import { registerController } from "../controllers/auth.controller";

const router = Router();


router.post("/register",registerValidators,registerController)

export default router;