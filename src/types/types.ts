import { User,BetOptions,BetGoals, overUnder, homeAwayDraw, BetScores } from "@prisma/client";

export type CreateUsersData = Omit<User, 'id'|'createdAt'|'active'|'availableMoney'>;
export type CreateBetOptions= Omit<BetOptions, 'id'|'createdAt'|'finished'>
export type CreateBetGoals= Omit<BetGoals, 'id'|'createdAt'|'finished'>
export type CreateBetScores=Omit<BetScores, 'id'|'createdAt'|'finished'>

export type CheckBet = {
    value:homeAwayDraw|number
    reward:number
    id:number
    type?:overUnder
    valueHome?:number
    valueAway?:number
};