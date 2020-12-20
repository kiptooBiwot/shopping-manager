const bcrypt = require('bcrypt')

const salt = 10
// const password = process.env.ADMIN_PASSWORD

const hashPassword = async (password) => {
  return await bcrypt.hash( password, Number(process.env.HASH_SALT) || salt )
}

module.exports = {
  hashPassword,
}