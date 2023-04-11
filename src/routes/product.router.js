import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";

const router = Router();
const productManager = new ProductManager();

router.get('/', async (req, res)=>{
    try{
        const products = await productManager.getProducts();
        const limit = parseInt(req.query.limit);
        if (limit){
            const productNumber = products.slice(0, limit);
            return res.status(200).send(productNumber);
        }else{
            return res.status(200).send(products);
        }
    }catch (error) {
        res.status(400).send({
            status: "Error",
            msg: `Los productos solicitados no se pueden visualizar.`
        });
    }
});
router.get('/:pid', async (req, res)=>{
    try{
        const pid = req.params.pid;
        const product = await productManager.getProductById(pid);
        res.status(200).send(product);
    }catch (error) {
        res.status(400).send({
            status: "Error",
            msg: `El producto con ID: ${pid} no existe o no se pudo encontrar.`
        });
    }
});
router.post('/' , async (req, res)=>{
    try{
        const { title, description, price, thumbnail, code, stock } = req.body;
        const product = await productManager.addProduct({ title, description, price, thumbnail, code, stock });
        return res.status(200).send(product);
    }catch (error){
        res.status(400).send({
            status: "Error",
            msg: error.message
        });
    }
});
router.delete('/:pid', async (req, res) => {
    try {
    const pid = req.params.pid;
    const product = await productManager.getProductById(pid);
    if (product.length === 0) {
        return res.status(400).send({
        status: "Error",
        msg: `El producto con ID: ${pid} no existe o no se pudo encontrar.`
        });
    }
    const updatedProductList = await productManager.deleteProduct(pid);
    return res.status(200).send(updatedProductList);
    } catch (error) {
    res.status(400).send({
        status: "Error",
        msg: `El producto con ID: ${pid} no se ha podido eliminar.`
    });
    }
});
router.put('/:pid', async (req, res)=>{
    try{
        const pid = req.params.pid;
        const updates = req.body;
        const product = await productManager.updateProduct(pid, updates);
        res.status(200).send(product);
    }catch (error){
        res.status(400).send({
            status: "Error",
            msg: `El producto con ID: ${pid} no se ha podido actualizar.`
        });
    }
});
export default router;