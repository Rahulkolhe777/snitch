import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth.routes";
import cookieParser from "cookie-parser"
import productRoutes from "./routes/products.routes"
import cartRoutes from "./routes/cart.routes"

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, Postman) or any origin
      callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api/products",productRoutes)
app.use("/api/cart",cartRoutes)

export default app