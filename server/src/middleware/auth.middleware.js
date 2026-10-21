import { readAccessToken } from "../utils/auth.util.js";

export function authenticate(req, res, next) {
    const accessToken = req.header("Authorization")?.split(" ")[1];

    if (!accessToken) {
        return res.status(401).json({
            message: "Access token not found in request header"
        });
    }

    try {
        const decoded = readAccessToken(accessToken);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}
