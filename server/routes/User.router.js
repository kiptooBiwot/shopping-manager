const router = require('express').Router()
const userController = require('../controllers/userController')
const updateUserValidator = require('../middleware/editUserValidator')
const userValidator = require('../controllers/loginValidator')

/**
 * ADMIN should be able to CREATE accounts
 * EDIT accounts or change passwords and DELETE accounts
 * Also get a list of all accounts when required
 */

router.get('/', userController.getUsers)

router.post('/create', userValidator, userController.createUser)

router.put('/edit/:username', updateUserValidator, userController.editUser)

router.delete('/delete/:username', userController.deleteUser)

module.exports = router