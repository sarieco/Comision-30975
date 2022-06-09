const carts = require(`../models/cartsApi`);

class CartController {
    async postController(req, res) {
        const { id_prod } = req.body;
        if (!id_prod || id_prod.length === 0 || !Array.isArray(id_prod)) return res.status(400).json({ success: false, error: `Wrong body format` });
        const cartsResponse = await carts.saveCart(id_prod); // Crea un carrito
        if (cartsResponse.success === false) return res.status(cartsResponse.status).json({ success: cartsResponse.success, error: cartsResponse.error });
        return res.status(200).json({ success: true, result: `Cart ${cartsResponse} correctly stored` }); // Devuelve su id.
    }

    async deleteCartController(req, res) {
        const { id } = req.params;
        if (isNaN(+id)) return res.status(400).json({ success: false, error: `Wrong param format` });
        const cartsResponse = await carts.deleteCart(id); // Vacía un carrito y lo elimina.
        if (cartsResponse.success === false) return res.status(cartsResponse.status).json({ success: cartsResponse.success, error: cartsResponse.error });
        else return res.status(200).json({ success: true, result: `Product correctly eliminated` });
    }

    async getController(req, res) {
        const { id } = req.params;
        if (isNaN(+id)) return res.status(400).json({ success: false, error: `The ID must be a valid number` });
        const cartsResponse = await carts.getCart(id); // Lista todos los productos guardados en el carrito.
        if (cartsResponse.success === false) return res.status(cartsResponse.status).json({ success: cartsResponse.success, error: cartsResponse.error });
        return res.status(200).json({ success: true, result: cartsResponse });
    }

    async postProductInCartController(req, res) {
        const { params: { id }, body: { id_prod } } = req;
        if (!id_prod || id_prod.length === 0 || !Array.isArray(id_prod)) return res.status(400).json({ success: false, error: `Wrong body format` });
        if (isNaN(+id)) return res.status(400).json({ success: false, error: `Wrong param format` });
        const cartsResponse = await carts.saveProductInCart(id, id_prod); // Incorpora productos al carrito por su id de producto.
        if (cartsResponse.success === false) return res.status(cartsResponse.status).json({ success: cartsResponse.success, error: cartsResponse.error });
        else return res.status(200).json({ success: true, result: `Product ${id_prod} correctly stored in the cart` }); // Devuelve su id.
    }

    async deleteProductInCartController(req, res) {
        const { id, id_prod } = req.params;
        if (isNaN(+id) || isNaN(+id_prod)) return res.status(400).json({ success: false, error: `Wrong param format` });
        const cartsResponse = await carts.deleteProductInCart(id, id_prod); // Elimina un producto del carrito por su id de carrito y de producto.
        if (cartsResponse.success === false) return res.status(cartsResponse.status).json({ success: cartsResponse.success, error: cartsResponse.error });
        else return res.status(200).json({ success: true, result: `Product correctly eliminated` });
    }
}
const cartController = new CartController();

module.exports = cartController;