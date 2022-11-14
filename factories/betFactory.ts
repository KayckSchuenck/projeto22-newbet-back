import {faker} from '@faker-js/faker'
import { BetOptions,BetGoals,BetScores } from '@prisma/client'



export async function createBetOptionsArrayTest(){
    return [{
        id:1,
        userId:1,
        createdAt:faker.date.past(),
        finished:faker.datatype.boolean(),
        amount:faker.datatype.float(),
        fixtureId:faker.datatype.number(),
        value:'home',
        odd:faker.datatype.float(),
        won:faker.datatype.boolean(),
    }] as BetOptions[]
}

export async function createBetGoalsArrayTest(){
    return [{
        id:1,
        userId:1,
        createdAt:faker.date.past(),
        finished:faker.datatype.boolean(),
        amount:faker.datatype.float(),
        fixtureId:faker.datatype.number(),
        value:faker.datatype.float(),
        type:'over',
        odd:faker.datatype.float(),
        won:faker.datatype.boolean(),
    }] as BetGoals[]
}

export async function createBetScoresArrayTest(){
    return [{
        id:1,
        userId:1,
        createdAt:faker.date.past(),
        finished:faker.datatype.boolean(),
        amount:faker.datatype.float(),
        fixtureId:faker.datatype.number(),
        scoreAway:1,
        scoreHome:2,
        odd:faker.datatype.float(),
        won:faker.datatype.boolean(),
    }] as BetScores[]
}

export async function createBetOptionsTest(availableMoney:number){
    return {
        fixtureId:faker.datatype.number(),
        odd:faker.datatype.float(),
        value:'away',
        amount:availableMoney/2
    }
}

export async function createBetGoalsTest(availableMoney:number){
    return {
        fixtureId:faker.datatype.number(),
        odd:faker.datatype.float(),
        value:faker.datatype.float(),
        amount:availableMoney/4,
        type:"under"
    }
}

export async function createBetScoresTest(availableMoney:number){
    return {
        fixtureId:faker.datatype.number(),
        odd:faker.datatype.float(),
        scoreHome:faker.random.numeric(1),
        scoreAway:faker.random.numeric(1),
        amount:availableMoney/4
    }
}