
const express = require('express');
const productsRoutes = require('./products/products.routes');
const filesRoutes = require('./files/files.routes');

const router = express.Router();

//Middlewares

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//Routes

router.use('/products', productsRoutes);
router.use('/files', filesRoutes);

module.exports = router;