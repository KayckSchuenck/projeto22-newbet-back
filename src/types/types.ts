import { User,BetOptions,BetScores,BetGoals } from "@prisma/client";

export type CreateUsersData = Omit<User, 'id'|'createdAt'|'active'|'availableMoney'>;
export type CreateBetOptions= Omit<BetOptions, 'id'|'createdAt'|'finished'>
export type CreateBetScores= Omit<BetScores, 'id'|'createdAt'|'finished'>
export type CreateBetGoalsCorners= Omit<BetGoals, 'id'|'createdAt'|'finished'>