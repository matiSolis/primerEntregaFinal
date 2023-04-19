import ProductManager from "../controllers/ProductManager.js";


const socket = io();
const productManager = new ProductManager();


socket.on('productList', async () =>{
    const products = await productManager.getProducts()
    let log = document.getElementById('productList');
    let productListHTML = "";

    products.forEach(producto => {
        productListHTML +=  `${producto.pid}<br/>
        ${producto.title}<br/>
        ${producto.description}<br/>
        ${producto.price}<br/>
        ${producto.thumbnail}<br/>
        ${producto.status}<br/>
        ${producto.code}<br/>
        ${producto.stock}<br/>`
    });
    log.innerHTML = productListHTML;

})

