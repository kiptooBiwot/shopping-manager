const router = require('express').Router()
const authController = require('../controllers/authController')
const loginValidator = require('../controllers/loginValidator')

router.post('/admin/register', authController.createAdmin)

router.post('/login', loginValidator, authController.loginController)

module.exports = router