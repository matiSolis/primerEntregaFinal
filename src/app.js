import express from "express";
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';
import __dirname from "./utils.js";

const PORT = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));

app.listen(PORT, ()=>{
    console.log('Servidor funcionando en el puerto: '+PORT);
})

app.use('/api/products/', productRouter);
app.use('/api/carts/', cartRouter);
