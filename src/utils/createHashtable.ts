import { BetGoals, BetOptions,BetScores } from "@prisma/client"

export async function getHashtableOptions(bets:BetOptions[]) {
    const hashtable={}
    bets.forEach((bet:BetOptions)=>{
        if(!bet.finished){
            if(hashtable[bet.fixtureId]){
                hashtable[bet.fixtureId].push({value:bet.value,reward:bet.odd*bet.amount,id:bet.id})
            } else {
                hashtable[bet.fixtureId]=[{value:bet.value,reward:bet.odd*bet.amount,id:bet.id}]
            }
        }
    })
    return hashtable
}

export async function getHashtableGoals(bets:BetGoals[]) {
    
    const hashtable={}
    bets.forEach((bet:BetGoals)=>{
        if(!bet.finished){
            if(hashtable[bet.fixtureId]){
                hashtable[bet.fixtureId].push({value:bet.value,reward:bet.odd*bet.amount,id:bet.id,type:bet.type})
            } else {
                hashtable[bet.fixtureId]=[{value:bet.value,reward:bet.odd*bet.amount,id:bet.id,type:bet.type}]
            }
        }
    })
    return hashtable
}

export async function getHashtableScores(bets:BetScores[]) {
    
    const hashtable={}
    bets.forEach((bet:BetScores)=>{
        if(!bet.finished){
            if(hashtable[bet.fixtureId]){
                hashtable[bet.fixtureId].push({valueHome:bet.scoreHome,valueAway:bet.scoreAway,reward:bet.odd*bet.amount,id:bet.id})
            } else {
                hashtable[bet.fixtureId]=[{valueHome:bet.scoreHome,valueAway:bet.scoreAway,reward:bet.odd*bet.amount,id:bet.id}]
            }
        }
    })
    return hashtable
}