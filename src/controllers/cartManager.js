import fs from 'fs';
import ProductManager from "../controllers/ProductManager.js";

const path ='./src/models/carts.json';
const productManager = new ProductManager();
export default class CartManager {
    getCarts = async ()=>{
        if(fs.existsSync(path)){
            const data = await fs.promises.readFile(path, 'utf-8');
            const carts = JSON.parse(data);
            return carts;
        }else{
            return [];
        };
    };
    addCart = async ()=>{
        const carts = await this.getCarts();
        const newCart = {
            cid: "CART" + (carts.length + 1),
            products: []
        };
        carts.push(newCart);
        await fs.promises.writeFile(path, JSON.stringify(carts, null, '\t'));
        return newCart;
    };
    getCartById = async (cid)=>{
        const carts = await this.getCarts();
        const cart = carts.filter((cart)=>{
            return cart.cid == cid;
        });
        return cart;
    };
    addProductToCart = async (cid, pid)=>{
        const cart = await this.getCartById(cid);
        const product = await productManager.getProductById(pid);
        if(!cart || !product){
            return console.error(`El cart con id: ${cid} o el producto con id: ${product} no existe.`);
        };
        const productIndex = cart[0].products.findIndex((p) => p.pid === pid);
        if (productIndex !== -1) {
            cart[0].products[productIndex].quantity++;
        }else{
            cart[0].products.push({ pid, quantity: 1 });
        };
        await fs.promises.writeFile(path, JSON.stringify(cart, null, '\t'));
        return cart;
    };
};




