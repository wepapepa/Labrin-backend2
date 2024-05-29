import express from "express";
import handlebars from 'express-handlebars';
import { Server } from "socket.io";

import { __dirname } from "./src/path";

const productManager = newProductsManager(`${__dirname}/db/products.json`)

const app = express()

app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/carts', cartRouter)
app.use('/api/products', productsRouter)

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

app.use('/', viewsRouter)

const PORT = 8080;

const httpServer = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket) => {
    console.log(`New client connected - client ID: ${socket.id}`);

    socket.emit('products', await productManager.getProducts());
    console.log("Products sent to client");

    socket.on('disconnect', () => console.log(`CLient disconnected`));

    socket.on('newProduct', async (newProduct) => {
        productManager.addNewProduct(newProduct);
        const products = await productManager.getProducts();
        socketServer.emit('products', products)
    });

    socket.on('deleteProduct', async (id) => {
        await productManager.deleteProduct(id)
        console.log("product deleted")
        const products = await productManager.getProducts();
        socketServer.emit('products', products);
    });
})