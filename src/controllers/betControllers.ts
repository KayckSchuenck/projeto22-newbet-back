import { Request,Response } from "express";
import { serviceCreateBetOptions,serviceCreateBetScores, serviceCreateBetGoalsCorners } from "../services/betService.js";

export async function createBetOptions(req:Request, res:Response){
    const {userId}=res.locals.id
    const {fixtureId,amount,odd,value}=req.body
    const availableMoney=await serviceCreateBetOptions(fixtureId,Number(amount),userId,Number(odd),value)
    res.status(201).send(availableMoney)
}

export async function createBetGoalsCorners(req:Request, res:Response){
    const {goalOrCorner}=req.params
    const {userId}=res.locals.id
    const {fixtureId,amount,odd,value,type}=req.body
    const availableMoney=await serviceCreateBetGoalsCorners(fixtureId,Number(amount),userId,Number(odd),value,type,goalOrCorner)
    res.status(201).send(availableMoney)
}

export async function createBetScores(req:Request, res:Response){
    const {userId}=res.locals.id
    const {fixtureId,amount,odd,scoreHome,scoreAway}=req.body
    const availableMoney=await serviceCreateBetScores(fixtureId,Number(amount),userId,Number(odd),scoreHome,scoreAway)
    res.status(201).send(availableMoney)
}