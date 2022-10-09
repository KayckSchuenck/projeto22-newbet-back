import { Request,Response } from "express";
import { serviceCreateBetScores,serviceCheckBetsScores,serviceCreateBetOptions, serviceCreateBetGoals,serviceCheckBetsOptions,serviceCheckBetsGoals } from "../services/betService.js";

export async function createBetOptions(req:Request, res:Response){
    const {userId}=res.locals.id
    const {fixtureId,amount,odd,value}=req.body
    const availableMoney=await serviceCreateBetOptions(fixtureId,Number(amount),userId,Number(odd),value)
    res.status(201).send(availableMoney)
}

export async function createBetGoals(req:Request, res:Response){
    const {goalOrCorner}=req.params
    const {userId}=res.locals.id
    const {fixtureId,amount,odd,value,type}=req.body
    const availableMoney=await serviceCreateBetGoals(fixtureId,Number(amount),userId,Number(odd),value,type,goalOrCorner)
    res.status(201).send(availableMoney)
}

export async function createBetScores(req:Request, res:Response){
    const {userId}=res.locals.id
    const {fixtureId,amount,odd,scoreHome,scoreAway}=req.body
    const availableMoney=await serviceCreateBetScores(fixtureId,Number(amount),userId,Number(odd),scoreHome,scoreAway)
    res.status(201).send(availableMoney)
}

export async function checkBets(req:Request, res:Response) {
    const {userId}=res.locals.id
    await serviceCheckBetsOptions(userId)
    await serviceCheckBetsGoals(userId)
    await serviceCheckBetsScores(userId)
    res.sendStatus(200)
}