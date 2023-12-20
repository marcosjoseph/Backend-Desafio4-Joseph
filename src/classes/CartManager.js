import utils from "../utils.js";
import crypto from "crypto"; 

export class CartManager { 
    constructor (path) {
        this.path = path;
        this.cart = [];
    }

    async addCart () {
            try {
            let data = await utils.readfile(this.path);
            this.cart = data?.length>0 ? data : [];

            const nuevoCart = {id: crypto.randomUUID(), products: []};

            this.cart.push(nuevoCart);
            await utils.writefile(this.path, this.cart);
            console.log("Cart Agregado");
            console.log(`Hay ${this.cart.length} carrito/s guardados`);
            // return nuevoCart;
        } catch (error) {console.error("Error al agregar el Cart", error)}

            return nuevoCart;
        }

    async addProductToCart (cid,pid) {
            try {
                const cart = await this.getCartById(cid);
                console.log(cart);

                const {products} = cart;
                const productIndex = products.findIndex((product) => product.products === pid);

                if(productIndex !== -1) {
                    products[productIndex].quantity++;
                } else {
                    products.push({product:pid, quantity:1})}

                await this.editCart(cart);
                return cart;
            } catch (error) {console.error("Error al agregar producto a el Cart", error)}
    }

    async getCarts () {
        try {
            let data = await utils.readfile(this.path);
            this.cart = data;
            return data?.length>0 ? data : "No hay Carritos guardados";
        } catch (error) {console.error(error)};}

    async getCartById (idCart) {
        try {
            let data = await utils.readfile(this.path);
            this.cart = data?.length>0 ? data : [];

            const elCartExiste = this.cart.find((cart) => cart.id === idCart);

            if(elCartExiste !== undefined) {return elCartExiste;
            } else {return `El Carrito id: ${idCart} no existe`}
        } catch (error) {console.error(error)}
    }

    async editCart(cart) {

        const {id} = cart;
        const AllCarts = await this.getCarts();
        const CartAEditar = this.cart.findIndex((carrito)=>carrito.id === id);

        AllCarts.splice(CartAEditar, 1, cart);

        const respuesta = await utils.writefile(this.path, AllCarts);
        return respuesta;}
    

    //     try {
    //         let data = await utils.readfile(this.path)
    //         this.cart = data?.length>0 ? data : [];

    //         const CartAEditar = this.cart.findIndex((item)=>item.id === cid);

    //         if(CartAEditar !== -1) {
    //             this.cart[CartAEditar] = {...this.cart[CartAEditar], ...nuevoCart};
    //             await utils.writefile(this.path, data);

    //             return {
    //                 message:`El Cart ${idCart} ha sido modificado`,
    //                 data: this.cart[CartAEditar],
    //             }} else { return {message:"No existe el Cart solicitado"}}
    //     } catch (error) {console.error(`No se ha encontrado el Cart con id: ${idCart}`)}
    // }

    async deleteCartById(idCart) {
        try {
            let data = await utils.readfile(this.path);
            this.cart = data?.length>0 ? data : [];
    
            let CartAEliminar = this.cart.findIndex((item)=>item.id === idCart);

            if(CartAEliminar !== -1) {
                let cart = this.cart[CartAEliminar];
                this.cart.splice(CartAEliminar, 1);
                
                await utils.writefile(this.path, data);

                return {
                    message:`El Cart ${idCart} ha sido eliminado`,
                    Cart: cart,
                }} else { return {message:"No existe el Cart solicitado"}}
        } catch (error) {console.error(`No se ha encontrado el Cart con id: ${idCart}`)}
    }
}

export default CartManager;