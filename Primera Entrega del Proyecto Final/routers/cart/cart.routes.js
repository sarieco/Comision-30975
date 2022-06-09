const express = require(`express`);
const cartController = require(`../../controllers/cart.controller`);

const router = express.Router();

router.post(`/`, cartController.postController); // Crea un carrito y devuelve su id.

router.delete(`/:id`, cartController.deleteCartController); // Vacía un carrito y lo elimina.

router.get(`/:id/products`, cartController.getController); // Me permite listar todos los productos guardados en el carrito.

router.post(`/:id/products`, cartController.postProductInCartController); // Para incorporar productos al carrito por su id de producto.

router.delete(`/:id/products/:id_prod`, cartController.deleteProductInCartController); // Eliminar un producto del carrito por su id de carrito y de producto.

module.exports = router;