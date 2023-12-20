import {Router} from "express";
import {CartManager} from "../classes/CartManager.js";

const router = Router();
const cartManager = new CartManager("./archivosJson/carts.json");

router.get("/", async (req, res) => {
    try {
        let cartProducts = await cartManager.getCarts();
        res.json({data:cartProducts});
    } catch (error) {console.log(error)}
})

router.get("/:cid", async (req, res) => {
    const {cid} = req.params;

    let cart = await cartManager.getCartById(cid);

    if (cart) {
        res.json({ message: "success", data: cart });
        } else {
        res.json({
            message: "El carrito solicitado no existe",
        })
        }
    });

router.post("/", async (req, res) => {
    try {
        let createCart = await cartManager.addCart();
        res.json({message:"Carrito Creado", data:createCart});
    } catch (error) {
        res.status(500).json({message:"Error al crear el Carrito", data:error})
    }
})

router.post("/:cid/products/:pid", async (req, res) => {
    const {cid, pid} = req.params;

    try {
        const response = await cartManager.addProductToCart(cid, pid);
        res.json({message:`Producto Agregado Correctamente al Carrito ${cid}`, data:response})
    } catch (error) {
        res.status(500).json({message:"Error al agregar producto", data:error})
    }

}
)

export default router;