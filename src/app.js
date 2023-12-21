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

socketServer.on ("connection", (socket) => {
    console.log("Nuevo Cliente Conectado");
    
    socket.on("addProduct", async (product)=>{
        const nombre= product.nombre;
        const descripcion = product.descripcion;
        const img = product.img;
        const precio = product.precio;
        const stock = product.stock;
        const code = product.code;

        try {
            const agregarProducto = await productManager.addProduct(nombre, descripcion, img, precio, stock, code);
            const allProducts = await productManager.getProducts();

            agregarProducto && socketServer.emit("updateProducts", allProducts)
        } catch (error) {console.log("Error al agregar Producto," + error)};
        })

    socket.on("deleteProduct", async (id) => {
        try {
            const borrarProducto = await productManager.deleteProductById(id);
            const allProducts = await productManager.getProducts();

            borrarProducto && socketServer.emit("updateProducts", allProducts)
    } catch (error) {console.log("Error al eliminar el producto," + error)}})
})

