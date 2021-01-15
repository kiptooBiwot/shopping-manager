const Joi = require('joi')
const { schema } = require('../models/Shop')

module.exports.shopValidator = async (req, res, next) => {
  const schma = Joi.object({
    name: Joi.string().trim().required(),
  });

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
      
    // on success replace req.body with validated value and trigger the next middleware function
    req.body = value;
    next();
  }
}

