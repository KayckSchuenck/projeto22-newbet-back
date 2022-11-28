import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import Cryptr from "cryptr"
import { v4 as uuid } from 'uuid';
import notFoundError from "../middlewares/notFoundError.js";
import {authRepository} from "../repositories/authRepository.js";
import { sendEmail } from '../utils/sendEmail.js';


const cryptr=new Cryptr(process.env.CRYPTR_KEY)

export async function serviceSignUp(name:string,email:string,password:string,confirmPassword:string,cpf:string){
    const checkEmail = await authRepository.findByEmail(email);
    if (checkEmail) throw {type:"conflict",message:"E-mail já cadastrado"}

    const cryptedCPF=cryptr.encrypt(cpf)
    const checkCPF = await authRepository.findByCPF(cryptedCPF);
    if (checkCPF) throw {type:"conflict",message:"CPF já cadastrado"}
    
    if(password!==confirmPassword) throw {type:"unauthorized",message:"Senhas incompatíveis"}

    const activationToken=uuid()
    const hashPassword = bcrypt.hashSync(password, 10);

    await authRepository.insertUser({email,password:hashPassword,cpf:cryptedCPF,name,activationToken});

    await sendEmail(email,activationToken)
    return activationToken
}

export async function serviceLogin(email:string,password:string) {
    const checkEmail = await authRepository.findByEmail(email);
    if (!checkEmail) throw notFoundError('E-mail')
    if(!checkEmail.active) throw {type:"unauthorized",message:"E-mail não confirmado"}

    if (bcrypt.compareSync(password, checkEmail.password)) {
      const data = { userId: checkEmail.id };
      const secretKey = process.env.JWT_SECRET;
      const config = { expiresIn: 60 * 60 * 24 };
      const token = jwt.sign(data, secretKey, config);
      return {token,name:checkEmail.name,id:checkEmail.id}
    } 
    else throw {type:"unauthorized",message:"Senha incorreta"}
}

export async function serviceActivation(activationToken:string) {
  const checkActivationToken = await authRepository.findByActivationToken(activationToken);
  if (!checkActivationToken) throw notFoundError('E-mail')
  if(checkActivationToken.active) throw {type:"unauthorized",message:"E-mail já confirmado"}

  await authRepository.activateEmail(activationToken)
}

export async function serviceResendEmail(email:string) {
  const checkEmail = await authRepository.findByEmail(email);
  if (!checkEmail) throw notFoundError('E-mail')
  if(checkEmail.active) throw {type:"unauthorized",message:"E-mail já confirmado"}

  const activationToken=uuid()
  await authRepository.updateActivationToken(email,activationToken)

  await sendEmail(email,activationToken)
}