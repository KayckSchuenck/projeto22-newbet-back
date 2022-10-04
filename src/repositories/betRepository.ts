import prisma from "../database.js"
import {CreateBetOptions} from '../types/types.js'

async function insertBetOptions(insertBet:CreateBetOptions){
    await prisma.betOptions.create({
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
    findById,
    updateAvailableMoney
}