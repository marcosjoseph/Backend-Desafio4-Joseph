const socket = io();

const addProductBtn = document.getElementById("addProductBtn");
const deleteBtn = document.getElementById("deleteProductBtn");

addProductBtn.addEventListener("click", () => {

    const nombre = document.getElementById("nombre");
    const descripcion = document.getElementById("descripcion");
    const img = document.getElementById("img");
    const precio =document.getElementById("precio");
    const stock = document.getElementById("stock");
    const code = document.getElementById("code");

    const product = {nombre, descripcion, img, precio, stock, code};

    socket.emit("addProduct", product);
        nombre.value="";
        descripcion.value="";
        img.value="";
        precio.value="";
        stock.value="";
        code.value="";
})

deleteProductBtn.addEventListener("click", () => {
    const id = document.getElementById("productId");
    socket.emit("deleteProduct", id);
    id.value="";
    alert(`El producto id: ${id}, fue eliminado`)
})

socket.on("updateProducts", (products) => {
    window.location.reload();
})

