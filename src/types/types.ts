import { User,BetOptions } from "@prisma/client";

export type CreateUsersData = Omit<User, 'id'|'createdAt'|'active'|'availableMoney'>;
export type CreateBetOptions= Omit<BetOptions, 'id'|'createdAt'|'finished'>