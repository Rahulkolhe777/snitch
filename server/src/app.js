import express from "express"
import authRoutes from "./routes/auth.routes";
import cookieParser from "cookie-parser"

const app = express();
app.use(express.json())


app.use("/api/auth",authRoutes)
app.use(cookieParser())

export default app