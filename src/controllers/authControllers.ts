import { Request,Response } from "express";
import { serviceActivation, serviceLogin,serviceResendEmail,serviceSignUp } from "../services/authService.js";

export async function signUp(req:Request, res:Response) {
    const {  email, password, confirmPassword, cpf ,name} = req.body;
    await serviceSignUp(name,email,password,confirmPassword,cpf)
    res.sendStatus(201);
}
  

export async function login(req:Request, res:Response) {
    const { email, password } = req.body;
    const response=await serviceLogin(email,password)
    res.status(200).send(response);
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