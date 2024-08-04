const form = document.getElementById('addProductForm');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const id = document.getElementById('id').value;  // id es un campo único en tu JSON
    const nombre = document.getElementById('nombre').value;
    const precio = parseFloat(document.getElementById('precio').value);
    const descripcion = document.getElementById('descripcion').value;
    const categoriaId = document.getElementById('categoria-id').value;
    const categoriaNombre = document.getElementById('categoria-nombre').value;

    const producto = {
        id,
        nombre,
        precio,
        descripcion,
        categoria: {
            id: categoriaId,
            nombre: categoriaNombre
        }
    };

    try {
        const response = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        });

        if (response.ok) {
            alert('Product added');
            form.reset();
        } else {
            alert('Error, try again.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
