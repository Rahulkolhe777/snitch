import { readAccessToken } from "../utils/auth.util"

export function authenticate(req,res){
    const accessToken = req.header.Authorization?.split(" ")[1]
    if(!accessToken){
        return res.status(404).json({
            message:"access token not found in request header"
        })
    }
    try {
        const decoded = readAccessToken(accessToken)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({
            message:"invalid or expired token"
        })
    }

}