import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import mongoose from "mongoose";
import productRoutes from "./src/routes/productRoutes.js";

dotenv.config();

const app = express();
app.use( "/products", productRoutes );

/* middleware */
app.use( cors( {
    origin: process.env.CLIENT_URL,
    credentials: true
} ) );

app.use( express.json() );
app.use( helmet() );
app.use( morgan( "dev" ) );

/* test route */
app.get( "/", ( req, res ) => {
    res.json( { message: "API is running 🚀" } );
} );

/* DB connect */
async function connectDB () {
    try {
        await mongoose.connect( process.env.MONGO_URI );
        console.log( "MongoDB connected" );
    } catch ( err ) {
        console.error( "DB connection error:", err );
        process.exit( 1 );
    }
}

/* start server */
const PORT = process.env.PORT || 5000;

app.listen( PORT, async () => {
    await connectDB();
    console.log( `Server running on port ${ PORT }` );
} );