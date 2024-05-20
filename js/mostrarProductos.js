document.addEventListener('DOMContentLoaded', () => {
    const productList = document.querySelector('[data-list]');

    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            const productos = data.productos;
            productos.forEach(producto => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <h2>${producto.nombre}</h2>
                    <p>Precio: $${producto.precio.toFixed(2)}</p>
                `;
                productList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });
});
