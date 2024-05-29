import express from "express";
import handlebars from 'express-handlebars';
import { Server } from "socket.io";

import { __dirname } from "./src/path.js";

const productManager = newProductsManager(`${__dirname}/db/products.json`)

const app = express()

