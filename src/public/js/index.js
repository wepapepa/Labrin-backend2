const socket = io(); //levanta la conexión con el socket del cliente

socket.on("products", (products) => {

    try{
        console.log("evento products get");
        const productCards = products.map((product) => {

            return `
                <div class="card">
                    <h3 class="card-title">${product.title}</h3>
                    <p class="card-text">${product.description}</p>
                    <p class="card-price">${product.price}</p>
                    <p class="card-text">${product.id}</p>
                    <p class="card-text">${product.stock}</p>
                    <button class="eliminar-btn" data-id="${product.id}">Eliminar producto</button>
                </div>
            `;
        }).join(" ");

    document.getElementById("products-container").innerHTML = productCards;

    document.querySelectorAll('.eliminar-btn').forEach((button) => {
        button.addEventListener('click', (event) => {
            const productId = event.target.getAttribute('data-id');
            eliminarProducto(productId);
        });
    });
    } catch (error) {
        console.error(error);
    }
})

document.getElementById('form').addEventListener('submit', (event) => {
    event.preventDefault();

    const newProduct = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        price: parseFloat(document.getElementById('price').value), //document.getElementById('price').value,
        code: document.getElementById('id').value,
        stock:parseInt(document.getElementById('stock').value, 20)
    }

    socket.emit('newProduct', newProduct);
    document.getElementById('form').reset();
});

const eliminarProducto = (id) => {
    socket.emit('deleteProduct', id);
    console.log("evento eliminado sent")
}