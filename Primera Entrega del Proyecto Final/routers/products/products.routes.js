const express = require(`express`);
const productController = require(`../../controllers/product.controller`);

const router = express.Router();

router.get(`/`, productController.getControllerQuery); // Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores).

router.get(`/:id`, productController.getControllerParams); // Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores).

router.post(`/`, productController.postController); // Para incorporar productos al listado (disponible para administradores).

router.put(`/:id`, productController.putController); // Actualiza un producto por su id (disponible para administradores).

router.delete(`/:id`, productController.deleteController); // Borra un producto por su id (disponible para administradores).

module.exports = router;