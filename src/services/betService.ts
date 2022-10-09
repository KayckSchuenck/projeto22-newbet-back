import notFoundError from "../middlewares/notFoundError.js";
import { betRepository } from "../repositories/betRepository.js";
import { CheckBet } from "../types/types.js";
import { fetchData } from "../utils/fetchData.js";
import { getFixturesIds } from "../utils/getFixturesIds.js";
import { getHashtableOptions,getHashtableGoals,getHashtableScores } from "../utils/createHashtable.js";

export async function serviceCreateBetOptions(fixtureId:number,amount:number,userId:number,odd:number,value:any){
    const user=await betRepository.findById(userId)
    if(!user) throw notFoundError("Usuário")
    if(user.availableMoney<amount) throw {type:"unauthorized",message:"Saldo insuficiente"}

    const newMoney=user.availableMoney-amount

    await betRepository.insertBetOptions({fixtureId,amount,userId,odd,value})
    
    await betRepository.updateAvailableMoney(userId,newMoney)
    return newMoney
}

export async function serviceCreateBetGoals(fixtureId:number,amount:number,userId:number,odd:number,value:number,type:any,goalOrCorner:string){
    const user=await betRepository.findById(userId)
    if(!user) throw notFoundError("Usuário")
    if(user.availableMoney<amount) throw {type:"unauthorized",message:"Saldo insuficiente"}

    const newMoney=user.availableMoney-amount
    
    await betRepository.insertBetGoals({fixtureId,amount,userId,odd,value,type}) 

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


export async function serviceCheckBetsOptions(userId:number) {
    const {availableMoney}=await betRepository.findById(userId)

    const checkOptionBets=await betRepository.findOptionBetById(userId)
    const hashtableOptions=await getHashtableOptions(checkOptionBets)

    const idsOptions=await getFixturesIds(hashtableOptions)
    const matches=await fetchData(idsOptions)

    matches.forEach(async (match)=>{
        await Promise.all(hashtableOptions[match.fixture.id].forEach(async (bet:CheckBet)=>{
            const value=bet.value
            const newMoney=bet.reward+availableMoney
            const id=bet.id
            if(value==='home'&&match.teams.home.winner){
                await betRepository.updateAvailableMoney(newMoney,userId)
            }
            if(value==='away'&&match.teams.away.winner){
                await betRepository.updateAvailableMoney(newMoney,userId)
            }
            if(value==='draw'&&!match.teams.away.winner&&!match.teams.home.winner){
                await betRepository.updateAvailableMoney(newMoney,userId)
            }
            await betRepository.updateOptionBetToFinished(id)
        }))
    })
}

export async function serviceCheckBetsGoals(userId:number){
    const {availableMoney}=await betRepository.findById(userId)

    const checkGoalBets=await betRepository.findGoalBetById(userId)
    const hashtableGoals=await getHashtableGoals(checkGoalBets)

    const idsGoals=await getFixturesIds(hashtableGoals)
    const matches=await fetchData(idsGoals)

    matches.forEach(async (match)=>{
        await Promise.all(hashtableGoals[match.fixture.id].forEach(async (bet:CheckBet)=>{
            const value=bet.value
            const newMoney=bet.reward+availableMoney
            const id=bet.id
            const type=bet.type
            const goalsTotal=match.goals.home+match.goals.away

            if(value<goalsTotal&&type==='over'){
                await betRepository.updateAvailableMoney(newMoney,userId)
            }

            if(value>goalsTotal&&type==='under'){
                await betRepository.updateAvailableMoney(newMoney,userId)
            }
            await betRepository.updateGoalBetToFinished(id)
        }))
    })
}

export async function serviceCheckBetsScores(userId:number){
    const {availableMoney}=await betRepository.findById(userId)

    const checkScoreBets=await betRepository.findScoreBetById(userId)
    const hashtableScores=await getHashtableScores(checkScoreBets)

    const idsScores=await getFixturesIds(hashtableScores)
    const matches=await fetchData(idsScores)

    matches.forEach(async (match)=>{
        await Promise.all(hashtableScores[match.fixture.id].forEach(async (bet:CheckBet)=>{
            const valueHome=bet.valueHome
            const valueAway=bet.valueAway
            const newMoney=bet.reward+availableMoney
            const id=bet.id

            if(valueHome===match.score.fulltime.home&&valueAway===match.score.fulltime.away){
                await betRepository.updateAvailableMoney(newMoney,userId)
            }
            await betRepository.updateOptionBetToFinished(id)
        }))
    })
}