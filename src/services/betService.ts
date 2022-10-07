import notFoundError from "../middlewares/notFoundError.js";
import { betRepository } from "../repositories/betRepository.js";

export async function serviceCreateBetOptions(fixtureId:number,amount:number,userId:number,odd:number,value:any){
    const user=await betRepository.findById(userId)
    if(!user) throw notFoundError("Usuário")
    if(user.availableMoney<amount) throw {type:"unauthorized",message:"Saldo insuficiente"}

    const newMoney=user.availableMoney-amount

    await betRepository.insertBetOptions({fixtureId,amount,userId,odd,value})
    
    await betRepository.updateAvailableMoney(userId,newMoney)
    return newMoney
}

export async function serviceCreateBetGoalsCorners(fixtureId:number,amount:number,userId:number,odd:number,value:number,type:any,goalOrCorner:string){
    const user=await betRepository.findById(userId)
    if(!user) throw notFoundError("Usuário")
    if(user.availableMoney<amount) throw {type:"unauthorized",message:"Saldo insuficiente"}

    const newMoney=user.availableMoney-amount
    
    if(goalOrCorner==='goal') await betRepository.insertBetGoals({fixtureId,amount,userId,odd,value,type})
    if(goalOrCorner==='corner') await betRepository.insertBetCorners({fixtureId,amount,userId,odd,value,type})
    
    await betRepository.updateAvailableMoney(userId,newMoney)
    return newMoney

}

export async function serviceCreateBetScores(fixtureId:number,amount:number,userId:number,odd:number,scoreHome:number,scoreAway:number){
    const user=await betRepository.findById(userId)
    if(!user) throw notFoundError("Usuário")
    if(user.availableMoney<amount) throw {type:"unauthorized",message:"Saldo insuficiente"}

    const newMoney=user.availableMoney-amount

    await betRepository.insertBetScores({fixtureId,amount,userId,odd,scoreHome,scoreAway})

    await betRepository.updateAvailableMoney(userId,newMoney)
    return newMoney

}