import prisma from "../database.js"
import {CreateBetOptions,CreateBetGoalsCorners, CreateBetScores} from '../types/types.js'

async function insertBetOptions(insertBet:CreateBetOptions){
    await prisma.betOptions.create({
        data:insertBet
    })
}

async function insertBetGoals(insertBet:CreateBetGoalsCorners){
    await prisma.betGoals.create({
        data:insertBet
    })
}

async function insertBetCorners(insertBet:CreateBetGoalsCorners){
    await prisma.betCorners.create({
        data:insertBet
    })
}

async function insertBetScores(insertBet:CreateBetScores){
    await prisma.betGoals.create({
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
    return prisma.user.findUnique({
        where:{id}
    })
}

export const betRepository={
    insertBetOptions,
    insertBetGoals,
    insertBetCorners,
    insertBetScores,
    findById,
    updateAvailableMoney
}