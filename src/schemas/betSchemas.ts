import joi from 'joi'

export const schemaPostBetOptions=joi.object({
    fixtureId:joi.number().required(),
    odd:joi.number().required(),
    value:joi.string().valid('home','away').required(),
    amount:joi.number().required()
})

export const schemaPostBetScores=joi.object({
    fixtureId:joi.number().required(),
    odd:joi.number().required(),
    scoreHome:joi.string().required(),
    scoreAway:joi.string().required(),
    amount:joi.number().required()
})

export const schemaPostBetGoalsCorners=joi.object({
    fixtureId:joi.number().required(),
    odd:joi.number().required(),
    type:joi.string().valid("over","under").required(),
    amount:joi.number().required(),
    value:joi.number().required()
})
