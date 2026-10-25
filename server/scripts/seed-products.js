import "dotenv/config";
import mongoose from "mongoose";
import productModel from "../src/model/product.model.js";
import userModel from "../src/model/user.model.js";

const products = [
  {
    title: "Urban Oversized Graphic Tee",
    description: "Relaxed-fit cotton tee with a bold back graphic and soft everyday feel.",
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85"],
    price: { amount: 899, currency: "INR" },
    sizes: [{ size: "S", stock: 10 }, { size: "M", stock: 18 }, { size: "L", stock: 15 }, { size: "XL", stock: 8 }],
  },
  {
    title: "Classic Black Cargo Pants",
    description: "Straight-fit utility cargos with roomy pockets and an adjustable hem.",
    images: ["https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=900&q=85"],
    price: { amount: 1799, currency: "INR" },
    sizes: [{ size: "S", stock: 7 }, { size: "M", stock: 12 }, { size: "L", stock: 14 }, { size: "XL", stock: 6 }],
  },
  {
    title: "Midnight Varsity Jacket",
    description: "A lightweight varsity jacket made for layering through cool evenings.",
    images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85"],
    price: { amount: 2499, currency: "INR" },
    sizes: [{ size: "M", stock: 9 }, { size: "L", stock: 11 }, { size: "XL", stock: 5 }],
  },
  {
    title: "Sandstone Relaxed Fit Shirt",
    description: "Breathable overshirt in a warm neutral shade with a clean, minimal finish.",
    images: ["https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=900&q=85"],
    price: { amount: 1299, currency: "INR" },
    sizes: [{ size: "S", stock: 8 }, { size: "M", stock: 16 }, { size: "L", stock: 10 }, { size: "XL", stock: 5 }],
  },
  {
    title: "Everyday Essential Hoodie",
    description: "Brushed fleece hoodie with a relaxed silhouette and kangaroo pocket.",
    images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85"],
    price: { amount: 1599, currency: "INR" },
    sizes: [{ size: "S", stock: 6 }, { size: "M", stock: 14 }, { size: "L", stock: 13 }, { size: "XL", stock: 9 }],
  },
  {
    title: "Slate Blue Denim Jacket",
    description: "A timeless denim layer with a structured fit and washed blue finish.",
    images: ["https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85"],
    price: { amount: 2199, currency: "INR" },
    sizes: [{ size: "M", stock: 10 }, { size: "L", stock: 12 }, { size: "XL", stock: 7 }],
  },
  {
    title: "Signature Co-ord Set",
    description: "Matching shirt and shorts set designed for a clean, effortless streetwear look.",
    images: ["https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=900&q=85"],
    price: { amount: 1999, currency: "INR" },
    sizes: [{ size: "S", stock: 5 }, { size: "M", stock: 10 }, { size: "L", stock: 8 }, { size: "XL", stock: 4 }],
  },
  {
    title: "Olive Utility Overshirt",
    description: "Military-inspired overshirt with durable fabric and front patch pockets.",
    images: ["https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=900&q=85"],
    price: { amount: 1499, currency: "INR" },
    sizes: [{ size: "S", stock: 8 }, { size: "M", stock: 15 }, { size: "L", stock: 10 }, { size: "XL", stock: 6 }],
  },
];

async function seedProducts() {
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI is not configured.");

  await mongoose.connect(process.env.MONGO_URI);
  const seller = await userModel.findOne({ role: "seller" }).select("_id name email").lean();

  if (!seller) {
    throw new Error("No seller account exists. Register a seller before running this seed.");
  }

  // Preserve products created before the schema field was corrected from `tittle`.
  await productModel.collection.updateMany(
    { title: { $exists: false }, tittle: { $type: "string" } },
    [{ $set: { title: "$tittle" } }],
  );

  const operations = products.map((product) => ({
    updateOne: {
      filter: { title: product.title },
      update: { $set: { ...product, seller: seller._id, published: true } },
      upsert: true,
    },
  }));

  const result = await productModel.bulkWrite(operations);
  console.log(`Seed complete for ${seller.email}: ${result.upsertedCount} added, ${result.modifiedCount} updated.`);
}

seedProducts()
  .catch((error) => {
    console.error("Product seeding failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
