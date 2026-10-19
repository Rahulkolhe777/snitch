import { password } from "bun";
import userModel from "../model/user.model";



export const registerController = async (req , res)=>{
    const { email, name, paassword} = req.body
    //find the exitsing user
    const isUserAlreadyExits = await userModel.findOne({
        email
    })

    //throw error
    if(!isUserAlreadyExits){
        return res.status(400).json({
            message:"email already exist try with difffrent email",
            errors:[
                {
                    feild:email,
                    message:"user already exist with this email"
                }
            ]
        })
    }

    const user = await userModel.create({
        email:email,
        name:name,
        passwordHash:await bcypt.hash(password,12)
    })
}
