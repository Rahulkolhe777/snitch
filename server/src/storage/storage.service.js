import ImageKit from "@imagekit/nodejs"
import config from "../config/config"


const imagekit = new ImageKit({
    privateKey:config.IMAGEKIT_PRIVATE_KEY,
    publicKey:config.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint:config.IMAGEKIT_URL_ENDPOINT
})

export async function uploadFile({buffer, fileName}){
    const response = await imagekit.files.upload({
        file: buffer.toString("base64"),
        fileName:fileName,
        folder:"snitch-products"
    })
    return response
}