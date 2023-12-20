import {Router} from "express";
import {ProductManager} from "../classes/ProductManager.js";

const router = Router();

const productManager = new ProductManager ("./archivosJson/productos.json");

router.get("/", async (req, res) => {
    const {limit} = req.query;
    try {
    let temporalProducts = await productManager.getProducts();    

    if (limit) {
            let temporalArray  = temporalProducts.slice(0, +limit)

            res.json({
            data: temporalArray,
            limit: limit,
            cant: temporalArray.length,})
        } else {
            res.json({
                data: temporalProducts,
                limit: false,
                cant: temporalProducts.length,})
        } 
    } catch (error){console.log("error app.get", error)}} )

router.get("/:pid", async (req, res) => {
    const {pid} = req.params;

    let product = await productManager.getProductById(pid);

    if (product) {
        res.json({ message: "success", data: product });
        } else {
        res.json({
            message: "el producto solicitado no existe",
        })
        }
    });

router.post("/", (req, res) => {
    const {categoria, nombre, descripcion, img, precio, stock, code} = req.body;

    try {
        const data = productManager.addProduct(categoria, nombre, descripcion, img, precio, stock, code);
        res.json({message: "success", data: data})
    } catch (error) {
        console.error("No se hay podido agregar el producto", error)
        res.status(500).json({message: "error", data: error})}
})

router.put("/:pid", async (req, res) => {
    const {pid} = req.params;
    const {categoria, nombre, descripcion, img, precio, stock, code} = req.body;

    try {
        let product = await productManager.getProductById(pid);

        if(product) { 
            let newProduct = {
                categoria: categoria || product.categoria,
                nombre: nombre || product.nombre,
                descripcion: descripcion || product.descripcion,
                img: img || product.img,
                precio: precio || product.precio,
                stock: stock || product.stock,
                code: code || product.code
            };

            const modification = await productManager.editProduct(pid, newProduct);

            res.json({message: "success", data: modification})
        } else { res.json({message:"El producto solicitado no existe"})}
    } catch (error) {
            console.error("No se hay podido modificar el producto", error);
            res.status(500).json({message: "error", data: error})}    
})

router.delete("/:pid", async (req, res) => {
    const {pid} = req.params;

    try {
        let product = await productManager.getProductById(pid);

        if (product) {
        const deleteProduct = await productManager.deleteProductById(pid);

            res.json({message: "success. El Producto fue eliminado", data: deleteProduct})
        } else { res.json({message:"El producto solicitado no existe"})}
    } catch (error) {
            console.error("No se hay podido eliminar el producto", error);
            res.status(500).json({message: "error", data: error})}    
})


export default router;