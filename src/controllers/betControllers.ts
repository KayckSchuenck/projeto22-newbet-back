import { Request,Response } from "express";
import { serviceCreateBetScores,serviceCreateBetOptions, serviceCreateBetGoals, serviceGetHistory } from "../services/betService";

export async function createBetOptions(req:Request, res:Response){
    const {userId}=res.locals.id
    const {fixtureId,amount,odd,value}=req.body
    const availableMoney=await serviceCreateBetOptions(fixtureId,Number(amount),userId,Number(odd),value)
    res.status(201).send({availableMoney})
}

export async function createBetGoals(req:Request, res:Response){
    const {goalOrCorner}=req.params
    const {userId}=res.locals.id
    const {fixtureId,amount,odd,value,type}=req.body
    const availableMoney=await serviceCreateBetGoals(fixtureId,Number(amount),userId,Number(odd),value,type,goalOrCorner)
    res.status(201).send({availableMoney})
}

export async function createBetScores(req:Request, res:Response){
    const {userId}=res.locals.id
    const {fixtureId,amount,odd,scoreHome,scoreAway}=req.body
    const availableMoney=await serviceCreateBetScores(fixtureId,amount,Number(userId),odd,Number(scoreHome),Number(scoreAway))
    res.status(201).send({availableMoney})
}

export async function getHistory(req:Request, res:Response){
    const {userId}=res.locals.id
    const response=await serviceGetHistory(userId)
    res.status(200).send(response)
}