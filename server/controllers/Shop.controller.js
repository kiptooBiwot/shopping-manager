const createError = require('http-errors')
const Shop = require('../models/Shop')

module.exports.getShops = async (req, res, next) => {
    try {
        const shops = await Shop.find()
        if (shop.length < 1) throw createError.NotFound('No data in the database!')

        res.send({
            Shops: shops
        })
    } catch (error) {
        next(createError(error))
    }
}

module.exports.createShop = async (req, res, next) => {
    try {
        const newShop = new Shop({
            ...req.body
        })

        const addedShop = await newShop.save()

        if (!addedShop) throw createError.NotImplemented('Creation failed')

        res.send({
            message: 'Shop added successfully',
            shop: addedShop
        })
    } catch (error) {
        next(createError(error))
    }
}

module.exports.editShop = async (req, res, next) => {
    try {
        const updatedShop = await Shop.findByIdAndUpdate(
            { id: req.params.id },
            { ...req.body },
            { new: true }
        )

        if (!updatedShop) throw createError.NotImplemented('Shop not edited')

        res.send({
            message: 'Shop has beed successfully updated',
            shop: updatedShop
        })
    } catch (error) {
        next(createError(error))
    }
}

module.exports.deleteShop = async (req, res, next) => {
    try {
        const deletedShop = await Shop.findOneAndDelete(
            { id: req.params.id }
        )
        
        res.send({
            message: 'Shop deleted successfully!',
            ShopDeleted: deletedShop
        })
        
    } catch (error) {
        next(createError(error))      
    }
}