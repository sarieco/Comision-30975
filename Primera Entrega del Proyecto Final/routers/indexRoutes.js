const express = require(`express`);
const productsRoutes = require(`./products/products.routes`);
const cartRoutes = require(`./cart/cart.routes`);
const authorizer = require(`../middlewares/authorizer`);

const router = express.Router();

// Middlewares
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Routes
router.use(`/products`, authorizer, productsRoutes);
router.use(`/carts`, cartRoutes);

module.exports = router;