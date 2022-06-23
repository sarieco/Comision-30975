const config = require("../db/config");
const ContainerApi = require(`../models/api`);

const containerProducts = new ContainerApi(config.mariaDB, "products")

class ProductController {
    async getControllerQuery(req, res) {
        const productsResponse = await containerProducts.getAll(); // Lista todos los productos disponibles.
        if (!productsResponse.success) return res.status(404).json({ success: false, error: `Product not found` });
        else res.status(200).json({ success: true, result: productsResponse.result });
    }

    async getControllerParams(req, res) {
        const { id } = req.params;
        if (id && isNaN(+id)) return res.status(400).json({ success: false, error: `The ID must be a valid number` });
        const productsResponse = await containerProducts.getById(id); // Lista todos los productos disponibles por su id.
        if (!productsResponse.success) return res.status(404).json({ success: false, error: `Product not found` });
        else res.status(200).json({ success: true, result: productsResponse.result });
    }

    async postController(req, res) {
        const { nameProduct, priceProduct, imageProduct } = req.body;
        if (!nameProduct || !priceProduct || !imageProduct) return res.status(400).json({ success: false, error: `Wrong body format` });
        const newProduct = await containerProducts.save({ nameProduct, priceProduct, imageProduct }); // Incorpora productos al listado.
        return res.status(200).json({ success: true, result: `Product ${newProduct} correctly stored` });
    }

    async putController(req, res) {
        const { params: { id }, body: { nameProduct, priceProduct, imageProduct } } = req;
        if (isNaN(+id)) return res.status(400).json({ success: false, error: `The ID must be a valid number` });
        if (!nameProduct || !priceProduct || !imageProduct) return res.status(400).json({ success: false, error: `Wrong body format` });
        const updatedProduct = await containerProducts.update(id, { nameProduct, priceProduct, imageProduct }); // Actualiza un producto por su id.
        if (updatedProduct) return res.status(200).json({ success: true, result: "Product updated successfully" });
        else return res.status(404).json({ success: false, error: `Product not found` });
    }

    async deleteController(req, res) {
        const { id } = req.params;
        if (isNaN(+id)) return res.status(400).json({ success: false, error: `The ID must be a valid number` });
        const deletedProduct = await containerProducts.delete(id); // Borra un producto por su id.
        if (deletedProduct) return res.status(200).json({ success: true, result: `Product correctly eliminated` });
        else return res.status(404).json({ success: false, result: `Product not found` });
    }
}

const productController = new ProductController();

module.exports = productController;