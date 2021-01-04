const createError = require('http-errors');
const Joi = require('joi');

const loginValidator = async (req, res, next) => {
  const schema = Joi.object({
  username: Joi.string()
    .trim()
    .alphanum()
    .min(3)
    .max(15)
    .required()
    .pattern(new RegExp("(^[a-zA-Z0-9_]{3,15}$)")),

  password: Joi.string()
    .trim()
    .alphanum()
    .min(6)
    .max(30)
    .required()
    .pattern(new RegExp("(^[a-zA-Z0-9_&^%$!]{6,30}$)")),
});
const result = await schema.validate(req.body);

if (result.error) {
  // res.status(422);
  next(createError(result.error))
  return;
} else {
  next()
}
}

module.exports = loginValidator
