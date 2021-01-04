const User = require("../models/User");
const createError = require("http-errors");
const hashFunction = require("./hashFunction");
// const jwt = require("./jwt");
const { verifyAccessToken, signAccessToken } = require('./jwt')

module.exports.createAdmin = async (req, res, next) => {
  try {
    const adminUser = await User.findOne({ username: "admin" }).exec();
    if (adminUser) {
      console.log(`Admin account exists! Skipping the "Admin Creation Step"`);
      res.send("Admin account exists");
    } else {
      hashFunction
        .hashPassword(process.env.ADMIN_PASSWORD)
        .then(async (hashedPassword) => {
          const newAdminUser = await new User({
            username: process.env.ADMIN_USERNAME,
            password: hashedPassword,
          });
          newAdminUser
            .save()
            .then(() => {
              console.log("Admin saved successfully!");
              res.send('Admin saved Successfully')
            })
            .catch((err) => {
              console.log(`ERROR in creating admin account ${err}`);
              process.exit(1);
            });
        });
    }
  } catch (err) {
    console.log(err);
    next();
  }
};

module.exports.loginController = async (req, res, next) => {
  try {
    const reqUser = {
      username: req.body.username.toString().trim(),
      password: req.body.password.toString().trim()
    }
    
    const user = await User.findOne({ username: reqUser.username })

    if (!user) throw createError.NotFound('User not registered')

    console.log(`Entered pass: ${reqUser.password} pass from db: ${user.password}`)

    const isMatch = await hashFunction.comparePassword(reqUser.password, user.password)

    // const isMatch = hashFunction.comparePassword(reqUser.password, user.password)

    if (!isMatch) throw createError.Unauthorized('Username and/or password invalid. Try again')
    console.log('Password matched!')

    // If passwords matched - Generate token

    const token = await signAccessToken(user)

    // const token = await jwt.signAccessToken(user)

    res.json({
      username: user.username,
      token: `Bearer ${token}`,
      message: 'You have successfully logged in!'
     })

  } catch (error) {
    next(createError.BadRequest('Username and/or password invalid.'))
    next(error)
  }


};
