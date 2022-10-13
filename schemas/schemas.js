import joi from 'joi';

const signupSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required()
});

const signinSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().required()
});

const urlSchema = joi.object({
    url: joi.string().required()
});

export {signinSchema, signupSchema, urlSchema};