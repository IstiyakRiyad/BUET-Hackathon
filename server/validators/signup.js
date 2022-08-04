const Joi = require('joi');


const signUpSchema = Joi.object({
    name: Joi
        .string()
        .min(2)
        .max(100)
        .required(),
    
    email: Joi
        .string()
        .email()
        .required(),

    password: Joi
        .string()
        .min(6)
        .max(127)
        .required()
});

module.exports = signUpSchema;