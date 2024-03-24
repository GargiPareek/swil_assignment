const joi = require('joi');

const signupValidation = async (req, res, next) => {
    try {
        const signupSchema = joi.object({
            username: joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required()
                .messages({
                    'string.alphanum': 'Username must only contain alphanumeric characters',
                    'string.min': 'Username must be at least {#limit} characters long',
                    'string.max': 'Username cannot be longer than {#limit} characters',
                    'any.required': 'Username is required',
                }),
            emailid: joi.string().email().required().messages({
                'string.email': 'Please add a valid email.',
            }),
               
                phonenumber: joi.number().min(10 ** 9).max(10 ** 10 - 1).required().messages({
                    'number.min': 'Mobile number should be 10 digit.',
                    'number.max': 'Mobile number should be 10 digit'
                }),
            
            password: joi.string()
                .pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'))
                .required()
                .messages({
                    "string.pattern.base":
                        "New password Must have at least 8 characters and one Uppercase one lowercase and a special character and number",
                }),
           // confirmpassword: joi.string().required().valid(joi.ref('password')).options({ allowUnknown: true })
        })

        const data = req.body;
        await signupSchema.validateAsync(data, { allowUnknown: true, errors: { wrap: { label: '' } } })
    } catch (error) {
        return res.status(422).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
    next();
}

const loginValidation = async (req, res, next) => {
    try {
        const loginSchema = joi.object({
            username: joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required()
                .messages({
                    'string.alphanum': 'Username must only contain alphanumeric characters',
                    'string.min': 'Username must be at least {#limit} characters long',
                    'string.max': 'Username cannot be longer than {#limit} characters',
                    'any.required': 'Username is required',
                }),
            password: joi.string()
                .pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'))
                .required()
                .messages({
                    "string.pattern.base":
                        "Password Must have at least 8 characters and one Uppercase one lowercase and a special character and number",
                })
        })
        const data = req.body;
        await loginSchema.validateAsync(data, { allowUnknown: true, errors: { wrap: { label: '' } } })
    } catch (error) {
        return res.status(422).json({
            success: false,
            message: error.message,
            data: []
        })
    }
    next()
}
module.exports = {signupValidation,loginValidation}