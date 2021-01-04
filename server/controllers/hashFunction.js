const bcrypt = require('bcrypt')

const salt = 10
// const password = process.env.ADMIN_PASSWORD

const hashPassword = (password) => {
  return bcrypt.hash( password, Number(process.env.HASH_SALT) || salt )
}

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword)
}
// console.log(comparePassword)

module.exports = {
  hashPassword,
  comparePassword,
}