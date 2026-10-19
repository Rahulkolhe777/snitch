import app from "./src/app";
import connectToDb from "./src/config/DB";
const port = 3000




connectToDb()
app.listen(port , ()=>{
    console.log(`server is runing on port ${port}`)
})