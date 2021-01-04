const router = require('express').Router()
const productController = require('../controllers/product.controller')
const AuthMiddleware = require("../middleware/Auth.middleware");
const validate = require('../middleware/Product.validator')

router.get('/', productController.getProducts)

router.post('/create', AuthMiddleware.userIsAdmin, validate.productValidator, productController.createProduct)

router.put('/:id', AuthMiddleware.userIsAdmin, validate.editProductValidation, productController.editProduct)

router.delete('/:id', AuthMiddleware.userIsAdmin, productController.deleteProduct)

module.exports = router