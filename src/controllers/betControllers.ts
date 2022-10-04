import { Request,Response } from "express";
import { serviceCreateBetOptions } from "../services/betService";

export async function createBetOptions(req:Request, res:Response){
    const {fixtureId,amount,userId,odd,type,value}=req.body
    await serviceCreateBetOptions(fixtureId,amount,userId,odd,value)
    res.sendStatus(201)
}