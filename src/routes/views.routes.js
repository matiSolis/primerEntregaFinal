import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";

const router = Router();
const productManager = new ProductManager();
const path ='./src/models/products.json';


router.get('/realTimeProducts', async (req, res) => {
try {
    res.render('realTimeProducts',{path});
} catch (error) {
    res.status(400).send({
    status: "Error",
    msg: `Los productos solicitados no se pueden visualizar.`
    });
}
});

router.get("/", async (req, res) => {
    let allProducts = await productManager.getProducts()
    res.render('home', {
        products: allProducts
    })
})

export default router;