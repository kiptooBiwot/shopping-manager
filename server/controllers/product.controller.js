const createError = require("http-errors");
const Product = require("../models/Product");
const Shop = require('../models/Shop')
const { validatedProduct } = require('../middleware/Product.validator');


module.exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    if (products.length < 1) throw createError.NotFound("No data in the database");

    res.json({
      message: 'Success!',
      totalProducts: products.length,
      products: products
    });
  } catch (error) {
    next(createError.NotFound(error));
  }
};

module.exports.createProduct = async (req, res, next) => {
  try {
    const addedProduct = new Product({
      ...req.body
    })
    
    const savedProduct = await addedProduct.save()

    if (!savedProduct) throw createError.NotImplemented('Product creation failed')
    
    res.json({
      message: 'successfully added product',
      savedProduct
    })
  } catch (error) {
    next(createError())
  }
}

module.exports.editProduct = async (req, res, next) => {
  try {

    console.log(req.body)
    // const  id = req.params.id,
    // const productUpdate = req.body,
    // const options = { new: true }
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true }
    )

    if (!updatedProduct) throw next(createError('Update failed'))

    res.send({
      message: 'Update successful',
      updatedProduct: updatedProduct
    })
  } catch (error) {
    next(createError(error))
  }
}

module.exports.deleteProduct = async (req, res, next) => {
  try {
    const deletedProduct = await Product.findOneAndDelete({ _id: req.params.id })

    if (!deletedProduct) throw createError('Prodcut not deleted')

    res.send({
      message: 'Product deleted',
      deletedProduct: deletedProduct
    })
  } catch (error) {
    next(createError(error))
  }
}