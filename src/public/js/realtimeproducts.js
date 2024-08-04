document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    const importStockButton = document.getElementById('importStockButton');
    const importStockContainer = document.getElementById('importStockContainer');
    const contenedorProductos = document.getElementById('contenedorProductos');

    socket.on('productos', (data) => {
        renderProductos(data);
    });

    const renderProductos = (productos) => {
        contenedorProductos.innerHTML = "";
        importStockContainer.style.display = productos.length === 0 ? 'block' : 'none';

        productos.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card'); // Agregar clase 'card' para aplicar estilos
            card.innerHTML = `
                <img src="${item.imagen}" alt="${item.nombre}" class="productImage">
                <p>Type: ${item.nombre}</p>
                <p class="product-description">Description: ${item.descripcion}</p>
                <p>Price: $${item.precio}</p>
                <button class="delete-button" data-id="${item.id}">Delete</button>
            `;

            contenedorProductos.appendChild(card);

            card.querySelector('button').addEventListener('click', () => {
                socket.emit('eliminarProducto', item.id);
            });
        });
    };

    if (importStockButton) {
        importStockButton.addEventListener('click', async () => {
            try {
                const response = await fetch('/api/products/import-stock', {
                    method: 'POST'
                });

                if (response.ok) {
                    const data = await response.json();
                    socket.emit('productos', data); // Emitir los nuevos productos
                    importStockContainer.style.display = 'none'; // Ocultar el botón después de la importación
                } else {
                    console.error('Error importing stock');
                }
            } catch (error) {
                console.error('Request Error', error);
            }
        });
    }
});
