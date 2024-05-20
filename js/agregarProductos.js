document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('productForm');
    const limpiarBtn = document.getElementById('my-form-button-reset');
    const productList = document.querySelector('[data-list]');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nombre = form.nombre.value.trim();
        const precio = parseFloat(form.precio.value);
        const imagen = form.imagen.value.trim();

        if (!nombre || isNaN(precio) || !imagen) {
            alert('Todos los campos son obligatorios y deben ser válidos.');
            return;
        }

        const newProduct = { nombre, precio, imagen };

        try {
            await fetch('http://localhost:3000/productos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            });

            form.reset();
            loadProducts();
        } catch (error) {
            console.error('Error al agregar el producto:', error);
        }
    });

    limpiarBtn.addEventListener('click', () => {
        form.reset();
    });

    async function loadProducts() {
        try {
            const response = await fetch('http://localhost:3000/productos');
            const products = await response.json();
            renderProductList(products);
        } catch (error) {
            console.error('Error al cargar los productos:', error);
        }
    }

    function renderProductList(products) {
        productList.innerHTML = '';

        products.forEach(product => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <img src="${product.imagen}" alt="${product.nombre}">
                <h2>${product.nombre}</h2>
                <p>Precio: $${product.precio.toFixed(2)}</p>
                <button class="delete-btn" data-id="${product.id}"><img src="./icons/MdiTrashCan.svg" alt=""></button>
            `;

            const deleteBtn = listItem.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', async () => {
                try {
                    await fetch(`http://localhost:3000/productos/${product.id}`, {
                        method: 'DELETE'
                    });
                    loadProducts();
                } catch (error) {
                    console.error('Error al eliminar el producto:', error);
                }
            });

            productList.appendChild(listItem);
        });
    }

    loadProducts();
});
