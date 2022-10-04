import joi from 'joi'

export const schemaPostBetOptions=joi.object({
    amount:joi.number().required,
    fixtureId:joi.number().required(),
    odd:joi.number().required(),
    userId:joi.number().required(),
    value:joi.string().valid('home','away')
})
