import { ProductManager } from "./classes/ProductManager.js";

let productsContainer = new ProductManager ("./productos.json");

// (nombre, descripcion, img, precio, stock, code)

productsContainer.addProduct("Mesa", "Mesa Quebracho", "img", 100, 2, "101A");

productsContainer.addProduct("Banco", "Quebracho", "img", 101, 5, "101F");

// productsContainer.addProduct("Espejo", "Espejo Quebracho", "img", 102, 1, "101G");