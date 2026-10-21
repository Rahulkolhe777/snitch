

export const createProductController = async(req,res)=>{
    console.log(req.body)
    console.log(req.files)
    res.status(200).json({
        meessage:"dummy resposnse"
    })
}