import { Request,Response } from "express";
import { serviceCreateBetOptions,serviceCreateBetGoals,serviceCreateBetCorners,serviceCreateBetScores } from "../services/betService.js";

export async function createBetOptions(req:Request, res:Response){
    const {userId}=res.locals.id
    const {fixtureId,amount,odd,value}=req.body
    await serviceCreateBetOptions(fixtureId,Number(amount),userId,Number(odd),value)
    res.sendStatus(201)
}

export async function createBetGoals(req:Request, res:Response){
    const {userId}=res.locals.id
    const {fixtureId,amount,odd,value,type}=req.body
    await serviceCreateBetGoals(fixtureId,Number(amount),userId,Number(odd),value,type)
    res.sendStatus(201)
}

export async function createBetCorners(req:Request, res:Response){
    const {userId}=res.locals.id
    const {fixtureId,amount,odd,value,type}=req.body
    await serviceCreateBetCorners(fixtureId,Number(amount),userId,Number(odd),value,type)
    res.sendStatus(201)
}

export async function createBetScores(req:Request, res:Response){
    const {userId}=res.locals.id
    const {fixtureId,amount,odd,scoreHome,scoreAway}=req.body
    await serviceCreateBetScores(fixtureId,Number(amount),userId,Number(odd),scoreHome,scoreAway)
    res.sendStatus(201)
}