import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';
import __dirname from "./utils.js";
import viewsRouter from "./routes/views.routes.js";

const PORT = process.env.PORT || 8080;
const app = express();
const server = app.listen(PORT, ()=>{
    console.log('Servidor funcionando en el puerto: '+PORT);
})
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));


app.use('/',viewsRouter)
app.use('/realTimeProducts',viewsRouter)
app.use('/api/products/', productRouter);
app.use('/api/carts/', cartRouter);

const io = new Server(server);


io.on('connection', Socket => {
    console.log('socket connected');
    
    Socket.on("message", data => {
        io.emit('log', data)
    })
    Socket.on('productList', data =>{
        path.forEach(data);
        io.emit('productList', path);
    })
});