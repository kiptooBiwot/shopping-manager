const User = require("../models/User");
const createError = require("http-errors");
const hashFunction = require('./hashFunction');
const updateUserValidator = require("../middleware/editUserValidator");

module.exports.getUsers = async (req, res, next) => {
  res.json({
    message: "You have hit the get user's route",
  });
};

module.exports.createUser = async (req, res, next) => {
  try {
    const userExists = await User.findOne({ username: req.body.username })

    if (userExists) {
      throw createError.Conflict(`${req.body.username} exists in the database`)
    } else {
      console.log(`Password before hashing: ${req.body.password}`)
      const hashedPassword = await hashFunction.hashPassword(req.body.password);
      console.log(hashedPassword)
      const newUser = {
        username: req.body.username,
        password: hashedPassword
      }
      const user = new User(newUser)
      const savedUser = await user.save()
      res.json({
        user: savedUser.username,
        message: `User added successfully to the database!`,
      });
    }

  } catch (error) {
    next(createError(error))
  }

  // const passwordHashed = hashFunction.hashPassword(req.body.password)
  // const user = await User.create({
  //   username: req.body.username,
  //   password: passwordHashed,
  // });

  // user
  //   .save()
  //   .then((savedUser) => {
  //     res.json({
  //       user: savedUser.username,
  //       message: `User added successfully to the database!`,
  //     });
    
  //   })
  //   .catch((dbErr) => {
  //     if (dbErr.name === 'MongoError' && dbErr.code === 11000) {
  //       next(createError.Conflict("User already exists in the DB!"));
  //       return;
  //     }
  //     next(createError());
  // })
  
};

module.exports.editUser = async (req, res, next) => {
  try {
    /**
     * CAn only update password for now
     * TODO: Ensure an admin can edit either username or password
     */

    console.log(req.body)
    // const id = req.params.id
    const password = await hashFunction.hashPassword(req.body.password)
    console.log('Password: ' + password)
    req.body.password = password

    console.log(req.body) 
    const userUpdate = req.body
    // const options = { new: true }

    const updatedUser = await User.findOneAndUpdate(
      {username: req.params.username.toString().trim()},
      { ...userUpdate },
      { new : true }
    );

    console.log(updatedUser)

    if (!updatedUser) throw createError.InternalServerError('User details not updated')

    res.json({
      message: 'Success!',
      updatedUser: updatedUser
    })
  } catch (err) {
    next(createError(err))
  }

}

module.exports.deleteUser = async (req, res, next) => {
  try {
    const deleteUser = await User.deleteOne({
      username: req.params.username //_id: req.params.username
    })

    if(!deleteUser) throw createError('User does not exist')

    res.json({
      message: 'User deleted!'
    })
  } catch (error) {
    next(createError('User deletion failed!'))
  }
}
