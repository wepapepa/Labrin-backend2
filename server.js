import express from "express";
import handlebars from 'express-handlebars';
import { Server } from "socket.io";

import { __dirname } from "./src/path.js";

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
