import bcrypt from "bcrypt";
import userModel from "../model/user.model";
import { createAccessToken, createRefreshToken ,readRefreshToken} from "../utils/auth.util";



export const registerController = async (req , res)=>{
    const { email, name, password} = req.body
    //find the exitsing user
    const isUserAlreadyExits = await userModel.findOne({
        email
    })

    //throw error if user is missing
    if(isUserAlreadyExits){
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
    // PUT THE DAT IN DB
    const user = await userModel.create({
        email:email,
        name:name,
        passwordHash:await bcrypt.hash(password,12)
    })

    //CREATE ACCES AND REFERSH TOKEN
    console.log("User created:", user._id);

    const accessToken = createAccessToken({
        userId: user._id,
        role: user.role
    });

    console.log("Access token:", accessToken);
    const refreshToken = createRefreshToken({
        userId:user._id,
        role:user.role
    })
    //send refresh token to cokie but in http only
    res.cookie("refreshToken", refreshToken, {
        httpOnly:true
    })
    //send th erefresh token to db
    await userModel.findByIdAndUpdate(user._id,{
        refreshToken:refreshToken
    })

    //send the acces token as response
    res.status(201).json({
        message:"data is sent succeesfully",
        data:{
            user:{
                email:user.email,
                name:user.name,
                id:user.id
            },
            accessToken
        }
    })

}

/** login a user and create new set of accesss and refresh token
 * name and pass will be input
 */
export const loginController = async(req,res)=>{
    const { email, password } = req.body;

    // Check whether user exists
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // Check whether password is correct
    const isPasswordValid = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // Create tokens
    const accessToken = createAccessToken({
      userId: user._id,
      role: user.role,
    });

    const refreshToken = createRefreshToken({
      userId: user._id,
      role: user.role,
    });

    // Update refresh token in database
    await userModel.findByIdAndUpdate(user._id, {
      refreshToken,
    });

    // Store refresh token in HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res.status(200).json({
      message: "User logged in successfully",
      data: {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
        accessToken,
      },
    });
}

/** token refresh karega bhai */
export const refreshController = async(req,res)=>{
    //cheak refresh token exits or not
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken){
        return res.status(401).json({
            message:"refresh token is required"
        })
    }

    try {
        const decoded = readRefreshToken(refreshToken)
        const {userId,role} = decoded
        const user = await userModel.findById(userId)
        //if user invalid so remove token from db and other places
        if(refreshToken != user.refreshToken){
            await userModel.findByIdAndUpdate(user._id,{
                refreshToken:null,
                isAccountFreeze:true
            })

            return res.status(401).json({
                message:"refresh token mismatch"
            })
        }
        //create new access token
        const accessToken = createAccessToken({
            userId,role
        })
        //create refresh token
        const newRefreshToken = createRefreshToken({
            userId,role
        })
        //update refresh otken in db
        await userModel.findByIdAndUpdate(userId,{
            refreshToken:newRefreshToken
        })
        //update refress token in cookie
        res.cookie("refreshToken",newRefreshToken,{
            httpOnly:true
        })

        return res.status(200).json({
            message:"use is rotated succesfully",
            data:{
                email:user.email,
                name:user.name,
                id:user._id
            },
            accessToken
        })

    } catch (error) {
        return res.status(401).json({
            message:"invalid refresh token"
        })
    }

}

/*
 * user details dega 
 * middle create karega 
*/
export const getMeController = async(req,res)=>{
    const {userId, role} = req.user 
    const user = await userModel.findById(userId)

    res.status(200).json({
        message:"data fetched successfully",
        data:{
            user:{
                email:user.email,
                name:user.name,
                id:user._id
            }
        }
    })
}