const products = require(`../models/productsApi`);

class ProductController {
    async getControllerQuery(req, res) {
        const { id } = req.query;
        if (id && isNaN(+id)) return res.status(400).json({ success: false, error: `The ID must be a valid number` });
        const productsResponse = await products.getAllProducts(id); // Lista todos los productos disponibles ó un producto por su id.
        if (!productsResponse) return res.status(404).json({ success: false, error: `Product not found` });
        res.status(200).json({ success: true, result: productsResponse });
    }

    async getControllerParams(req, res) {
        const { id } = req.params;
        if (id && isNaN(+id)) return res.status(400).json({ success: false, error: `The ID must be a valid number` });
        const productsResponse = await products.getProduct(id); // // Lista todos los productos disponibles por su id.
        if (!productsResponse) return res.status(404).json({ success: false, error: `Product not found` });
        res.status(200).json({ success: true, result: productsResponse });
    }

    async postController(req, res) {
        const { name, description, code, image, price, stock } = req.body;
        if (!name || !description || !code || !image || !price || !stock) return res.status(400).json({ success: false, error: `Wrong body format` });
        const newProduct = await products.saveProduct({ name, description, code, image, price, stock }); // Incorpora productos al listado.
        return res.status(200).json({ success: true, result: `Product ${newProduct} correctly stored` });
    }

    async putController(req, res) {
        const { params: { id }, body: { name, description, code, image, price, stock } } = req;
        if (isNaN(+id)) return res.status(400).json({ success: false, error: `The ID must be a valid number` });
        if (!name || !description || !code || !image || !price || !stock) return res.status(400).json({ success: false, error: `Wrong body format` });
        const updatedProduct = await products.updateProduct(id, { name, description, code, image, price, stock }); // Actualiza un producto por su id.
        if (updatedProduct) return res.status(200).json({ success: true, result: "Product updated successfully" });
        else return res.status(404).json({ success: false, error: `Product not found` });
    }

    async deleteController(req, res) {
        const { id } = req.params;
        if (isNaN(+id)) return res.status(400).json({ success: false, error: `The ID must be a valid number` });
        const deletedProduct = await products.deleteProduct(id); // Borra un producto por su id.
        if (deletedProduct) return res.status(200).json({ success: true, result: `Product correctly eliminated` });
        else return res.status(404).json({ success: false, result: `Product not found` });
    }
}
const productController = new ProductController();

module.exports = productController;