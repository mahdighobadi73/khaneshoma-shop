import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

await mongoose.connect( process.env.MONGO_URI );

await Product.insertMany( [
    {
        name: "Test Product",
        price: 100,
        category: "test",
        images: [],
        stock: 10
    }
] );

console.log( "Seed done" );
process.exit();
