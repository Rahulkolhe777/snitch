import { uploadFile } from "../storage/storage.service"


export const createProductController = async(req,res)=>{
    console.log(req.body)
    console.log(req.files)
    const fileUrl =[]
    for(let i=0;i<req.files.length;i++){
       const response = await uploadFile({
            buffer:req.files[i].buffer,
            fileName:req.files[i].originalname
       })
       console.log(response)
    }
    res.status(200).json({
        meessage:"dummy resposnse"
    })
}