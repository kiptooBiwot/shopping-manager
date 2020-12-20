const router = require('express').Router()
const authController = require('../controllers/authController')

router.post('/admin/register', authController.createAdmin)

router.post('/login', authController.loginController)

module.exports = router