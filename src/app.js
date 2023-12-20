import express from "express";
import {Server} from "socket.io";
import handlebars from "express-handlebars";

import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.router.js";
import {__dirname} from "./utils.js";
import {ProductManager} from "./classes/ProductManager.js";

const app = express();
const PORT = 8082;
const productManager = new ProductManager("./archivosJson/productos.json");

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/", viewsRouter)

const socketServer = new Server(server);

