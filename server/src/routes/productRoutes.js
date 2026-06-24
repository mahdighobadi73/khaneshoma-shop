import express from "express";
import mongoose from "mongoose";
import Product from "../models/Product.js";
import { PRODUCTS } from "../../../src/data/products.js";

const router = express.Router();

function toModelShape ( p ) {
    return {
        _id: String( p.id ?? p._id ?? Math.random() ),
        name: p.name,
        description: p.description,
        price: p.price,
        category: p.category,
        rating: p.rating,
        stock: p.stock,
        badge: p.badge,
        images: p.images || [],
    };
}

/* GET all products */
router.get( "/", async ( req, res ) => {
    // Try DB first if connected
    try {
        if ( mongoose.connection.readyState === 1 ) {
            const products = await Product.find();
            return res.json( products );
        }
    } catch ( err ) {
        console.warn( "DB read failed, falling back to static products", err );
    }

    // Fallback to static data
    const staticProducts = PRODUCTS.map( toModelShape );
    res.json( staticProducts );
} );

/* GET single product */
router.get( "/:id", async ( req, res ) => {
    const { id } = req.params;

    try {
        if ( mongoose.connection.readyState === 1 ) {
            const product = await Product.findById( id );
            if ( product ) return res.json( product );
        }
    } catch ( err ) {
        console.warn( "DB read failed, falling back to static product lookup", err );
    }

    // fallback: try to find in static data (match by numeric id or string)
    const found = PRODUCTS.find( ( p ) => String( p.id ) === String( id ) || String( p._id ) === String( id ) );
    if ( found ) return res.json( toModelShape( found ) );

    res.status( 404 ).json( { message: "Not found" } );
} );

export default router;