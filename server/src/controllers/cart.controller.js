import cartModel from "../model/cart.model"
import productModel from "../model/product.model.js"


export const addToCartController = async (req, res) => {
    try {
        const { productId, quantity, size } = req.body
        const product = await productModel.findById(productId)
        //product nhi available if product is not found in db
        if (!product) {
            return res.status(400).json({
                message: "product is not available"
            })
        }
        //check size available hai or nhi
        const selectedSize = product.sizes.find(s => s.size === size)
        if (!selectedSize) {
            return res.status(400).json({
                message: "selected size is not available"
            })
        }
        //jitne select kiye utne quantity hai ya nhi
        if (selectedSize.stock < quantity) {
            return res.status(400).json({
                message: "selected size is not available or insufficient stock"
            })
        }
        //user.req se userId gand 
        // peheli value null hai toh second value  run karta hai '??' operator
        //nullish coalescing operator
        const cart = (await cartModel.findOne({ user: req.user.userId })) ?? await cartModel.create({ user: req.user.userId })

        //compare product id after convertin it to string 
        // interview que in md
        const productCart = cart.products.find(p => p.product.toString() === productId && p.size === size)

        if (productCart) {
            if (productCart.quantity + quantity > selectedSize.stock) {
                return res.status(400).json({
                    message: "product is not available or insufficient stock"
                })
            }
            await cartModel.updateOne(
                {
                    user: req.user.userId,
                    "products.product": productId,
                    "products.size": size
                },
                {
                    $inc: {
                        "products.$.quantity": quantity
                    }
                }
            )
            return res.status(200).json({
                message: "product added to cart successfully"
            })
        }

        await cartModel.findOneAndUpdate(
            { user: req.user.userId },
            {
                $push: {
                    products: {
                        product: productId,
                        quantity: quantity,
                        size: size
                    }
                }
            }
        )

        return res.status(200).json({
            message: "product added to cart successfully"
        })
    } catch (error) {
        console.error("Add to cart error:", error)
        return res.status(500).json({
            message: "Failed to add product to cart"
        })
    }
}

export const getCartControlller = async (req, res) => {
    try {
        const cart = await cartModel.findOne({ user: req.user.userId }) || await cartModel.create({ user: req.user.userId })
        return res.status(200).json({
            message: "cart retrived successfully",
            data: {
                cart: cart
            }
        })
    } catch (error) {
        console.error("Get cart error:", error)
        return res.status(500).json({
            message: "Failed to fetch cart"
        })
    }
}