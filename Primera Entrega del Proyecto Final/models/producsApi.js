const path = require(`path`);
const moment = require('moment');
const { promises: fs } = require("fs");

class ProductsApi {
    constructor() {
        this.url = path.resolve(__dirname, `../data/products.txt`);
    }

    async data() { // Retorna la ata parseada.
        try {
            const dataFind = await fs.readFile(this.url, "utf-8");
            const dataFound = JSON.parse(dataFind);
            return dataFound;
        } catch (error) {
            throw new Error(`ERROR: ${error.message}`);
        }
    }

    newId(productsResponse) { // Busca el ID maximo existente en el array y le agrega +1.
        const findId = productsResponse.map(item => item.id);
        let newId;
        if (findId.length == 0) newId = 1;
        else newId = Math.max.apply(null, findId) + 1;
        return newId;
    }

    async getAllProducts(id) {
        let productsResponse = [...await this.data()];
        if (id) return this.getProduct(id);
        return productsResponse;
    }

    async getProduct(id) {
        let productsResponse = [...await this.data()];
        productsResponse = productsResponse.find(product => product.id === +id);
        return productsResponse;
    }

    async saveProduct(product) {
        const productsResponse = [...await this.data()];
        const newId = this.newId(productsResponse);
        productsResponse.push({ id: newId, timestamp: `${moment().format('L')} ${moment().format('LTS')}`, ...product });
        fs.writeFile(this.url, JSON.stringify(productsResponse, null, 2));
        return newId;
    }

    async updateProduct(id, product) {
        const productsResponse = [...await this.data()];
        const productIndex = productsResponse.findIndex(product => product.id === +id);
        if (productIndex < 0) return false;
        productsResponse[productIndex] = {
            ...productsResponse[productIndex],
            timestamp: `${moment().format('L')} ${moment().format('LTS')}`,
            ...product
        };
        fs.writeFile(this.url, JSON.stringify(productsResponse, null, 2));
        return true;
    }

    async deleteProduct(id) {
        const productsResponse = [...await this.data()];
        const productIndex = productsResponse.findIndex(product => product.id === +id);
        if (productIndex < 0) return false;
        productsResponse.splice(productIndex, 1);
        fs.writeFile(this.url, JSON.stringify(productsResponse, null, 2));
        return true;
    }
}
const products = new ProductsApi();

module.exports = products;