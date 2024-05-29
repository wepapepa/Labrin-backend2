import { Router } from "express";
import { __dirname } from "../path.js";
import ProductManager from "../managers/products.manager.js";

const router = Router();
const productManager = new ProductManager(`${__dirname}/db/products.json`);

router.get('/', async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await productManager.getProducts(limit);
        res.render('vista1', { products });
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
});

router.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts')
});

export default router;