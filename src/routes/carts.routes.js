import { Router } from "express";
import { __dirname } from "../path.js";
import { CartsManager } from "../managers/carts.manager.js";
// import { ProductsManager } from "../managers/products.manager.js";

const cartRouter = Router();
const cartsManager = new CartsManager(`${__dirname}/db/carts.json`);;


cartRouter.get("/:cartID", async (req, res) => {
    try {
        const {cartID} = req.params;
        const cart = await cartsManager.getCartById(cartID);
        !cart ? req.statusCode(404).json({ error: "Cart no encontrado" }) : res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

cartRouter.post("/", async (req, res) => {
    try {
        const cart = await cartsManager.addNewCart();
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

cartRouter.post("/:cartID/products/:productID", async (req, res) => {
    try {
        const {cartID, productID} = req.params;
        const cart = await cartsManager.addProductToCart(cartID, productID);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default cartRouter;