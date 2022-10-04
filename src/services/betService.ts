import notFoundError from "../middlewares/notFoundError";
import { betRepository } from "../repositories/betRepository";

export async function serviceCreateBetOptions(fixtureId:number,amount:number,userId:number,odd:number,value:any){
    const user=await betRepository.findById(userId)
    if(!user) throw notFoundError("Usuário")
    if(user.availableMoney<amount) throw {type:"unauthorized",message:"Saldo insuficiente"}

    const newMoney=user.availableMoney-amount

    await betRepository.insertBetOptions({fixtureId,amount,userId,odd,value})
    await betRepository.updateAvailableMoney(userId,newMoney)
}