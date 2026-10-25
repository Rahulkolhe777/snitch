
import productModel from "../model/product.model.js";
import { uploadFile } from "../storage/storage.service.js";

export const createProductController = async (req, res) => {
    try {
        const {
            title,
            description,
            amount,
            currency,
            sizes,
        } = req.body;

        const files = req.files;

        // 1. Validate input
        if (!files?.length) {
            return res.status(400).json({
                message: "At least one product image is required",
            });
        }

        if (!title || !description || !amount || !currency) {
            return res.status(400).json({
                message: "Required product fields are missing",
            });
        }

        const priceAmount = Number(amount);

        if (!Number.isFinite(priceAmount) || priceAmount <= 0) {
            return res.status(400).json({
                message: "Price must be a positive number",
            });
        }

        // 2. Upload images concurrently
        const uploadedFiles = await Promise.all(
            files.map((file) =>
                uploadFile({
                    buffer: file.buffer,
                    fileName: file.originalname,
                })
            )
        );

        const imageUrls = uploadedFiles.map((file) => file.url);

        // 3. Parse sizes if sent as JSON in multipart/form-data
        const parsedSizes =
            typeof sizes === "string" ? JSON.parse(sizes) : sizes;

        // 4. Create product in database
        const product = await productModel.create({
            title,
            description,
            images: imageUrls,
            price: {
                amount: priceAmount,
                currency,
            },
            sizes: parsedSizes,
            seller: req.user.userId,
        });

        // 5. Send response
        return res.status(201).json({
            message: "Product created successfully",
            data: product,
        });
    } catch (error) {
        console.error("Create product error:", error);

        return res.status(500).json({
            message: "Failed to create product",
        });
    }
};

export const getAllProductsController = async (req, res) => {
    try {
        const products = await productModel.find().lean();

        return res.status(200).json({
            message: "Products fetched successfully",
            data: products,
        });
    } catch (error) {
        console.error("Fetch products error:", error);

        return res.status(500).json({
            message: "Failed to fetch products",
        });
    }
};
