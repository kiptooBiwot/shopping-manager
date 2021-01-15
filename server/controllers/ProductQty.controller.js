const mongoose = require('mongoose')

const productQtySchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('ProductQty', productQtySchema)