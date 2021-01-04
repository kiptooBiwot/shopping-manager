const joi = require("joi");
const createError = require("http-errors");
const Shop = require('../models/Shop')

module.exports.productValidator = (req, res, next) => {

  // Create schema object
  const schema = joi.object({
    name: joi.string().trim().required(),
    price: joi.number().precision(2).min(0).required(),
    image: joi.string().required(),
    shops: joi.array().items(joi.string())
  });

  // Schema options
  const options = {
    abortEarly: false, //include all errors
    allUnknown: true, //ignore unknown props
    stripUnknown: true //remove unknown props
  }

  // validate request body against the schema
  const { error, value } = schema.validate(req.body, options)

  if (error) {
    // On fail, return comma separated errors
    next(createError(`Validation errors: ${error.details.map(x => x.message).join(', ')}`))
  } else {
    // Check if the shops being entered exist in the database
      Shop.find({ _id: { $in: req.body.shops } })
      .exec().catch(() => {
        next(createError('Shop IDs are invalid'))
      })

    // on success replace req.body with validated value and trigger the next middleware function
    req.body = value
    next()
  }
}

module.exports.editProductValidation = async (req, res, next) => {
  // Create schema object
  const schema = joi.object({
    name: joi.string().trim(),
    price: joi.number().precision(2).min(0),
    image: joi.string(),
    shops: joi.array().items(joi.string()),
  });

  // Schema options
  const options = {
    abortEarly: false, //include all errors
    allUnknown: true, //ignore unknown props
    stripUnknown: true, //remove unknown props
  };

  // validate request body against the schema
  const { error, value } = schema.validate(req.body, options);

  if (error) {
    // On fail, return comma separated errors
    next(
      createError(
        `Validation errors: ${error.details.map((x) => x.message).join(", ")}`
      )
    );
  } else {
    // Check if the shops being entered exist in the database
    Shop.find({ _id: { $in: req.body.shops } })
      .exec()
      .catch(() => {
        next(createError("Shop IDs are invalid"));
      });

    // on success replace req.body with validated value and trigger the next middleware function
    req.body = value;
    next();
  }
}