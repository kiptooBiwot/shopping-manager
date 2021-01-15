const router = require('express').Router()
const shopController = require('../controllers/Shop.controller')
const shopValidator = require('../middleware/ShopValidator')

router.get('/', shopController.getShops)

router.post('/', shopValidator.shopValidator, shopController.createShop)

router.put('/:id', shopValidator.shopValidator, shopController.editShop)

module.exports = router