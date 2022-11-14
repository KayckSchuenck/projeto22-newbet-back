import notFoundError from "../middlewares/notFoundError";
import { betRepository } from "../repositories/betRepository";
import { CheckBet } from "../types/types";
import { fetchData } from "../utils/fetchData";
import { getFixturesIds } from "../utils/getFixturesIds";
import { getHashtableOptions,getHashtableGoals,getHashtableScores } from "../utils/createHashtable";


export async function serviceCheckBetsOptions(userId:number) {
    const user=await betRepository.findById(userId)
    if(!user) throw notFoundError('Usuário')

    let availableMoney=user.availableMoney

    const checkOptionBets=await betRepository.findOptionBetById(userId)
    if(!checkOptionBets) return

    const hashtableOptions=await getHashtableOptions(checkOptionBets)

    const idsOptions=await getFixturesIds(hashtableOptions)
    const matches=await fetchData(idsOptions)

    await Promise.all(matches.map(async (match:any)=>{
        
        await (hashtableOptions[match.fixture.id].forEach(async (bet:CheckBet)=>{
            const value=bet.value
            const newMoney=bet.reward+availableMoney
            const id=bet.id
            let won=false
            
            if(value==='home'&&match.teams.home.winner){
                await betRepository.updateAvailableMoney(userId,newMoney)
                availableMoney=newMoney
                won=true
            }
            if(value==='away'&&match.teams.away.winner){
                await betRepository.updateAvailableMoney(userId,newMoney)
                availableMoney=newMoney
                won=true
            }
            if(value==='draw'&&!match.teams.away.winner&&!match.teams.home.winner){
                await betRepository.updateAvailableMoney(userId,newMoney)
                availableMoney=newMoney
                won=true
            }
            
            await betRepository.updateOptionBetToFinished(id,won)
        }))
    }))
}

export async function serviceCheckBetsGoals(userId:number){
    const user=await betRepository.findById(userId)
    if(!user) throw notFoundError('Usuário')
    
    let availableMoney=user.availableMoney

    const checkGoalBets=await betRepository.findGoalBetById(userId)
    if(!checkGoalBets) return

    const hashtableGoals=await getHashtableGoals(checkGoalBets)

    const idsGoals=await getFixturesIds(hashtableGoals)
    const matches=await fetchData(idsGoals)

    await Promise.all(matches.map(async (match:any)=>{
        await Promise.all(hashtableGoals[match.fixture.id].map(async (bet:CheckBet)=>{
            const value=bet.value
            const newMoney=bet.reward+availableMoney
            const id=bet.id
            const type=bet.type
            const goalsTotal=match.goals.home+match.goals.away
            let won=false
            if((
                value<goalsTotal&&type==='over')
                ||(
                value>goalsTotal&&type==='under')
              ){
                await betRepository.updateAvailableMoney(userId,newMoney)
                availableMoney=newMoney
                won=true
            }
            

            await betRepository.updateGoalBetToFinished(id,won)
        }))
    }))
}

export async function serviceCheckBetsScores(userId:number){
    const user=await betRepository.findById(userId)
    if(!user) throw notFoundError('Usuário')

    let availableMoney=user.availableMoney

    const checkScoreBets=await betRepository.findScoreBetById(userId)
    if(!checkScoreBets) return

    const hashtableScores=await getHashtableScores(checkScoreBets)

    const idsScores=await getFixturesIds(hashtableScores)
    const matches=await fetchData(idsScores)

    matches.forEach(async (match:any)=>{
        await Promise.all(hashtableScores[match.fixture.id].map(async (bet:CheckBet)=>{
            const valueHome=bet.valueHome
            const valueAway=bet.valueAway
            const newMoney=bet.reward+availableMoney
            const id=bet.id
            let won=false
            if(valueHome===match.score.fulltime.home&&valueAway===match.score.fulltime.away){
                await betRepository.updateAvailableMoney(userId,newMoney)
                availableMoney=newMoney
                won=true
            }

            await betRepository.updateScoreBetToFinished(id,won)
        }))
    })
}

export async function serviceGetAvailableAmount(userId:number){
    const user=await betRepository.findById(userId)
    if(!user) throw notFoundError('Usuário')
    
    return user.availableMoney   
}