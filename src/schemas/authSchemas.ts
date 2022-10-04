import joi from 'joi'

export const schemaSignUp=joi.object({
    email:joi.string().email().required(),
    password:joi.string().min(5).required(),
    confirmPassword:joi.ref('password'),
    cpf:joi.string().length(11).required(),
    name:joi.string().required()
})

export const schemaLogin=joi.object({
    email:joi.string().email().required(),
    password:joi.string().required()
})

export const schemaResendEmail=joi.object({
    email:joi.string().email().required(),
})

