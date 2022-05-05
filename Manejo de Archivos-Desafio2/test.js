
const Productos = require('./index');

const crud = async () => {
    const products = new Contenedor('./productos.txt');

    const getId = await products.save(
        {
            id: 1,
            title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
            price: 109.95,
            image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'
        });

    await products.save(
        {
            id: 2,
            title: 'Mens Casual Premium Slim Fit T-Shirts',
            price: 22.3,
            image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg'
        });

    await products.save(
        {
            id: 3,
            title: 'Mens Cotton Jacket',
            price: 55.99,
            image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg'
        });

    const buscar = await products.getById();

    const objects = await products.getAll();

    await products.deleteById();
    await products.deleteAll();
};

crud();