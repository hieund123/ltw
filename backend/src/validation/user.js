import Joi from "joi";

export const signUpValidator = Joi.object({
    first_name: Joi.string().required().min(3).messages({
        "string.empty": "First name is required",
        "any.required": "First name is required",
        "string.min": "First name must be at least 3 characters"
    }),
    last_name: Joi.string().required().min(3).messages({
        "string.empty": "Last name is required",
        "any.required": "Last name is required",
        "string.min": "Last name must be at least 3 characters"
    }),
    location: Joi.string(),
    description: Joi.string(),
    occupation: Joi.string(),
    username: Joi.string().required().messages({
        "string.empty": "Username is required",
        "any.required": "Username is required"
    }),
    password: Joi.string().required().min(6).messages({
        "string.empty": "Password is required",
        "any.required": "Password is required",
        "string.min": "Password must be at least 6 characters",
    }),
    confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
        "any.required": "Confirm password is required",
        "any.only": "Confirm password is not matching",
        "string.empty": "Confirm password is not empty",
    }),
})


export const signInValid = Joi.object({
    username: Joi.string().required().messages({
        "string.empty": "Username is required",
        "any.required": "Username is required"
    }),
    password: Joi.string().required().messages({
        "string.empty": "password is required",
        "any.required": "password is required",
        "string.min": "password must be at least 6 characters",
    }),

});
    