import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import mongoose from "mongoose";
import productRoutes from "./src/routes/productRoutes.js";

dotenv.config();

const app = express();

/* middleware */
const allowedOrigins = [ process.env.CLIENT_URL ].filter( Boolean );

app.use(
    cors( {
        origin ( origin, callback ) {
            if ( !origin ) {
                return callback( null, true );
            }

            const isLocalhost = /^https?:\/\/localhost(:\d+)?$/i.test( origin );
            if ( allowedOrigins.includes( origin ) || isLocalhost ) {
                return callback( null, true );
            }

            return callback(
                new Error( `CORS policy does not allow access from ${ origin }` ),
                false
            );
        },
        credentials: true,
    } )
);

app.use( express.json() );
app.use( helmet() );
app.use( morgan( "dev" ) );

/* routes */
app.use( "/api/products", productRoutes );

app.post( "/api/payment/request", ( req, res ) => {
    const { amount, customer } = req.body;

    if ( typeof amount !== "number" || amount <= 0 ) {
        return res.status( 400 ).json( {
            message: "مبلغ پرداخت نامعتبر است",
        } );
    }

    const authority = `mock_${ Date.now() }`;
    return res.json( {
        url: `http://localhost:5173/verify-payment?Status=OK&Authority=${ authority }`,
    } );
} );

app.post( "/api/payment/verify", ( req, res ) => {
    const { status, authority } = req.body;
    const success = status === "OK" && typeof authority === "string";

    return res.json( {
        success,
        authority,
    } );
} );

/* test route */
app.get( "/", ( req, res ) => {
    res.json( { message: "API is running 🚀" } );
} );

/* DB connect */
async function connectDB () {
    if ( !process.env.MONGO_URI ) {
        console.warn( "No MONGO_URI provided — skipping MongoDB connection. Using static fallback data." );
        return;
    }

    try {
        await mongoose.connect( process.env.MONGO_URI );
        console.log( "MongoDB connected" );
    } catch ( err ) {
        console.error( "DB connection error:", err );
        console.warn( "Continuing without DB — API will use static fallback data." );
    }
}

/* start server */
const PORT = process.env.PORT || 5000;

app.listen( PORT, async () => {
    await connectDB();
    console.log( `Server running on port ${ PORT }` );
} );