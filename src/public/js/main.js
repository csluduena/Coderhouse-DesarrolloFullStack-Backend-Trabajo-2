document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('productForm')) {
        const form = document.getElementById('productForm');

        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const id = document.getElementById('id').value;
            const nombre = document.getElementById('nombre').value;
            const precio = document.getElementById('precio').value;
            const imagen = document.getElementById('imagen').value;
            const descripcion = document.getElementById('descripcion').value;
            const categoriaId = document.getElementById('categoriaId').value;
            const categoriaNombre = document.getElementById('categoriaNombre').value;

            const producto = {
                id,
                nombre,
                precio,
                imagen,
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
                    console.log('Product Added');
                } else {
                    console.error('Error, try again.');
                }
            } catch (error) {
                console.error('Error, try again', error);
            }
        });
    }
});
