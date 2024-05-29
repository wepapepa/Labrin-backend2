import { Router } from "express";
import { __dirname } from "../path.js";
import { productValidation } from "../middlewares/productValidation.js";
import { idValidation } from "../middlewares/idValidation.js";
import ProductManager from "../managers/products.manager.js";

const productRouter = Router();
const productManager = new ProductManager(`${__dirname}/db/products.json`);

productRouter.get("/", async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await productManager.getProducts(limit);
        !products ? res.status(404).json({ error: "productos no encontrados"}) : res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

productRouter.get("/:productId", async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await productManager.getProductById(productId);
        !product ? res.status(404).json({ error: "producto no encontrado"}) : res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

productRouter.post("/", productValidation, async (req, res) => {
    try {
        const productObj = req.body;
        const newProduct = await productManager.addNewProduct(productObj);
        res.status(201).json(newProduct);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

productRouter.put("/:productId", idValidation, async (req, res) => {
    try {
        const { productId } = req.params;
        const productObj = req.body;
        const productsUpdated = await productManager.modifyProduct(productId, productObj);
        !productUpdated ? res.status(404).json({ error: "producto no encontrado"}) : req.status(200).json(productUpdated);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

productRouter.delete("/:productId", async (req, res) => {
    try {
        const { productId } = req.params;
        const prodToDelete = await productManager.deleteProduct(productId);
        !prodToDelete ? res.status(404).json({ error: "producto no encontrado"}) : res.status(200).json(`producto ${productId} eliminado`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default productRouter;
    
