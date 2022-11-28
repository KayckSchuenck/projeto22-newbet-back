import { Request,Response } from "express";
import { serviceActivation, serviceLogin,serviceResendEmail,serviceSignUp } from "../services/authService.js";
import { serviceCheckBetsGoals,serviceCheckBetsOptions,serviceCheckBetsScores,serviceGetAvailableAmount } from "../services/checkService.js";

export async function signUp(req:Request, res:Response) {
    const {  email, password, confirmPassword, cpf ,name} = req.body;
    const activationToken=await serviceSignUp(name,email,password,confirmPassword,cpf)
    res.send({activationToken}).status(201);
}

export async function login(req:Request, res:Response) {
    const { email, password } = req.body;
    const {id:userId,token,name}=await serviceLogin(email,password)

    await serviceCheckBetsOptions(userId)
    await serviceCheckBetsGoals(userId)
    await serviceCheckBetsScores(userId)

    const checkedAmount=await serviceGetAvailableAmount(userId)

    res.status(200).send({
        token,
        name,
        availableMoney:checkedAmount
    });
}

export async function activation(req:Request, res:Response){
    const {activationToken}=req.params
    await serviceActivation(activationToken)
    res.status(200).send("Seu E-mail foi confirmado com sucesso")
}

export async function resendEmail(req:Request, res:Response){
    const {email}=req.body
    await serviceResendEmail(email)
    res.sendStatus(200)
}