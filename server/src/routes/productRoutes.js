import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

/* GET all products */
router.get( "/", async ( req, res ) => {
    try {
        const products = await Product.find();
        res.json( products );
    } catch ( err ) {
        res.status( 500 ).json( { message: "Server error" } );
    }
} );

/* GET single product */
router.get( "/:id", async ( req, res ) => {
    try {
        const product = await Product.findById( req.params.id );
        if ( !product ) {
            return res.status( 404 ).json( { message: "Not found" } );
        }
        res.json( product );
    } catch ( err ) {
        res.status( 500 ).json( { message: "Server error" } );
    }
} );

export default router;