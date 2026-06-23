import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: String,
        price: { type: Number, required: true },
        category: String,
        rating: { type: Number, default: 0 },
        stock: { type: Number, default: 0 },
        badge: String,
        images: [ String ],
    },
    { timestamps: true }
);

export default mongoose.model( "Product", productSchema );