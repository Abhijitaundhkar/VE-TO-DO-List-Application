const Joi = require("joi");

//task validation
const taskValidationSchema = Joi.object({
  title: Joi.string().min(3).max(20).required().messages({
    "string.base": "Title must be a string",
  }),
  description: Joi.string().max(200).optional().messages({
    "string.base": "Title must be a string",
  }),
  completed: Joi.boolean().default(false),
});

//user validation
const userValidationSchema = Joi.object({
  username: Joi.string().min(3).max(20).required().messages({
    "string.base": "Username must be a string",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email address",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters long",
  }),
});
module.exports = { taskValidationSchema, userValidationSchema };
