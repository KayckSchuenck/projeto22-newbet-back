import prisma from "../database.js"
import {CreateBetOptions,CreateBetGoals, CreateBetScores} from '../types/types.js'

async function insertBetOptions(insertBet:CreateBetOptions){
    await prisma.betOptions.create({
        data:insertBet
    })
}

async function insertBetGoals(insertBet:CreateBetGoals){
    await prisma.betGoals.create({
        data:insertBet
    })
}

async function insertBetScores(insertBet:CreateBetScores){
    await prisma.betScores.create({
        data:insertBet
    })
}

async function updateAvailableMoney(id:number,newMoney:number){
    await prisma.user.update({
        where:{id},
        data:{ availableMoney:newMoney }
    })
}

async function findById(id:number) {
    return await prisma.user.findUnique({
        where:{id}
    })
}

async function findOptionBetById(userId:number) {
    return await prisma.betOptions.findMany({
        where:{userId}
    })
}
async function findGoalBetById(userId:number) {
    return await prisma.betGoals.findMany({
        where:{userId}
    })
}

async function findScoreBetById(userId:number) {
    return await prisma.betScores.findMany({
        where:{userId}
    })
}

async function updateOptionBetToFinished(id:number,won:boolean){
    await prisma.betOptions.update({
        where:{ id },
        data:{
            finished:true,
            won
        }
    })
}

async function updateGoalBetToFinished(id:number,won:boolean){
    await prisma.betGoals.update({
        where:{ id },
        data:{
            finished:true,
            won
        }
    })
}

async function updateScoreBetToFinished(id:number,won:boolean){
    await prisma.betScores.update({
        where:{ id },
        data:{
            finished:true,
            won
        }
    })
}

export const betRepository={
    insertBetOptions,
    insertBetGoals,
    insertBetScores,
    findById,
    updateAvailableMoney,
    findGoalBetById,
    findOptionBetById,
    findScoreBetById,
    updateOptionBetToFinished,
    updateGoalBetToFinished,
    updateScoreBetToFinished
}