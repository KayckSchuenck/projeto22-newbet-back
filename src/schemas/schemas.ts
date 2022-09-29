import joi from 'joi'

export const schemaSignUp=joi.object({
    email:joi.string().email().required(),
    password:joi.string().required(),
    confirmPassword:joi.ref('password')
})

export const schemaLogin=joi.object({
    email:joi.string().email().required(),
    password:joi.string().required()
})

export const schemaResendEmail=joi.object({
    email:joi.string().email().required(),
})

