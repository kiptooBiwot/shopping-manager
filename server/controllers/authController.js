const User = require("../models/User")
const crateError = require("http-errors")
const bcrypt = require('bcrypt')
const hashFunction = require('./hashFunction')

module.exports.createAdmin = async (req, res, next) => {
  try {
    const adminUser = await User.findOne({ username: "admin" }).exec()
    if (adminUser) {
      console.log(`Admin account exists! Skipping the "Admin Creation Step"`)
    } else {
      await hashFunction.hashPassword(process.env.ADMIN_PASSWORD)
        .then(async (hashedPassword) => {
          const newAdminUser = await new User({
            username: process.env.ADMIN_USERNAME,
            password: hashedPassword
          })
          newAdminUser.save()
            .then(() => {
            console.log('Admin saved successfully!')
            })
            .catch((err) => {
              console.log(`ERROR in creating admin account ${err}`)
              process.exit(1)
            }) 
          }
        )
    }
  } catch (err) {
    next(err)
  }
}

module.exports.loginController = async (req, res, next) => {
  try {
    // Find admin
  } catch (err) {
    next();
  }
};
