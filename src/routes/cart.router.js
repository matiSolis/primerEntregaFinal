import { Router } from "express";
import CartManager from "../controllers/cartManager.js";

const router = Router();
const cartManager = new CartManager();

router.get('/', async (req, res) => {
    try {
        return res.status(200).send(await cartManager.getCarts());
    }catch(error){
        res.status(400).send({
            status: "Error",
            msg: `El total de carritos no se puede visualizar.`
        });
    }
});
router.get('/:cid', async (req, res) => {
    try{
        const cid = req.params.cid;
        return res.status(200).send(await cartManager.getCartById(cid));
    }catch (error) {
        res.status(400).send({
            status: "Error",
            msg: `El carro solicitado no se pueden visualizar.`
        });
    }
});
router.post('/', async (req, res) => {
    try{
        return res.status(200).send(await cartManager.addCart());
    }catch (error) {
        res.status(400).send({
            status: "Error",
            msg: `El carrito solicitado no se puede visualizar.`
        });
    }
});
router.post('/:cid/product/:pid', async (req, res) => {
    try{
        const idCart = req.params.cid;
        const idProduct = req.params.pid;
        return res.status(200).send(await cartManager.addProductToCart(idCart, idProduct));
    }catch(error) {
        res.status(400).send({
            status: "Error",
            msg: `El producto solicitado no se puede agregar en el carro indicado.`
        });
    }
});
export default router;