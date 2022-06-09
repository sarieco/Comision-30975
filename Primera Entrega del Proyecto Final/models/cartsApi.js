const path = require(`path`);
const moment = require('moment');
const products = require(`./productsApi`);
const { promises: fs } = require("fs");

class CartsApi {
    constructor() {
        this.url = path.resolve(__dirname, `../data/carts.txt`);
    }

    async data() { // Retorna la ata parseada.
        try {
            const dataFind = await fs.readFile(this.url, "utf-8");
            const dataFound = JSON.parse(dataFind);
            return dataFound;
        } catch (error) {
            throw new Error(`ERROR: ${error.message}`)
        }
    }

    newId(productsResponse) { // Busca el ID maximo existente en el array y le agrega +1.
        const findId = productsResponse.map(item => item.id);
        let newId;
        if (findId.length == 0) newId = 1;
        else newId = Math.max.apply(null, findId) + 1;
        return newId
    }

    async removeProduct(id_prod) { // Filtra los productos que coincidan su ID,  elimina los IDs solicitados y retorna el nuevo array de productos.
        const productsResponse = [...await products.data()];
        let filteredProducts = [];
        for (let i = 0; i < id_prod.length; i++) {
            const requestedProduct = id_prod[i];
            if (isNaN(requestedProduct)) return { success: false, status: 400, error: `Wrong body format` };
            const productIndex = productsResponse.findIndex(product => product.id === +requestedProduct);
            if (productIndex < 0) return { success: false, status: 404, error: `Product ${id_prod[i]} not found` };
            filteredProducts.push(productsResponse[productIndex]);
            productsResponse.splice(productIndex, 1);
        }
        return { success: true, products: productsResponse, filtered: filteredProducts }
    }

    async saveCart(id_prod) {
        const cartsResponse = [...await this.data()];
        const dataProduct = await this.removeProduct(id_prod);
        if (dataProduct.success === false) return dataProduct;
        const newId = this.newId(cartsResponse);
        cartsResponse.push({
            id: newId,
            timestamp: `${moment().format('L')} ${moment().format('LTS')}`,
            products: dataProduct.filtered
        });
        fs.writeFile(products.url, JSON.stringify(dataProduct.products, null, 2));
        fs.writeFile(this.url, JSON.stringify(cartsResponse, null, 2));
        return newId;
    }

    async saveProductInCart(id, id_prod) {
        const cartsResponse = [...await this.data()];
        const dataProduct = await this.removeProduct(id_prod);
        if (dataProduct.success === false) return dataProduct;
        const cartIndex = cartsResponse.findIndex(cart => cart.id === +id);
        if (cartIndex < 0) return { success: false, status: 404, error: `Cart not found` };
        dataProduct.filtered.forEach(product => cartsResponse[cartIndex].products.push(product));
        fs.writeFile(products.url, JSON.stringify(dataProduct.products, null, 2));
        fs.writeFile(this.url, JSON.stringify(cartsResponse, null, 2));
        return { success: true };
    }

    async deleteCart(id) {
        const cartsResponse = [...await this.data()];
        const productsResponse = [...await products.data()];
        const cartIndex = cartsResponse.findIndex(cart => cart.id === +id);
        if (cartIndex < 0) return { success: false, status: 404, error: `Cart not found` };
        cartsResponse[cartIndex].products.forEach(product => productsResponse.push(product));
        cartsResponse.splice(cartIndex, 1);
        fs.writeFile(products.url, JSON.stringify(productsResponse, null, 2));
        fs.writeFile(this.url, JSON.stringify(cartsResponse, null, 2));
        return { success: true };
    }

    async deleteProductInCart(id, id_prod) {
        const cartsResponse = [...await this.data()];
        const productsResponse = [...await products.data()];
        const cartIndex = cartsResponse.findIndex(cart => cart.id === +id);
        if (cartIndex < 0) return { success: false, status: 404, error: `Cart not found` };
        const productIndex = cartsResponse[cartIndex].products.findIndex(product => product.id === +id_prod);
        if (productIndex < 0) return { success: false, status: 404, error: `Product not found` };
        productsResponse.push(cartsResponse[cartIndex].products[productIndex]);
        cartsResponse[cartIndex].products.splice(productIndex, 1);
        fs.writeFile(products.url, JSON.stringify(productsResponse, null, 2));
        fs.writeFile(this.url, JSON.stringify(cartsResponse, null, 2));
        return { success: true };
    }

    async getCart(id) {
        const cartsResponse = [...await this.data()];
        const cart = cartsResponse.find(product => product.id === +id);
        if (!cart) return { success: false, status: 404, error: `Product not found` };
        return cart;
    }
}
const carts = new CartsApi();

module.exports = carts;