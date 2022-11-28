import prisma from "../database.js";
import { CreateUsersData } from "../types/types.js";

async function findByEmail(email:string){
    return prisma.user.findUnique({
        where: { email },
    });
}

async function findByCPF(cpf:string){
    return prisma.user.findUnique({
        where: { cpf },
    });
}

async function findByActivationToken(activationToken:string){
    return prisma.user.findUnique({
        where: { activationToken },
    });
}

async function insertUser(createUser:CreateUsersData){
    await prisma.user.create({
        data:createUser
      });
}

async function activateEmail(activationToken:string) {
    await prisma.user.update({
        where:{ activationToken },
        data: {active:true}
    })
}

async function updateActivationToken(email:string,activationToken:string) {
    await prisma.user.update({
        where:{ email },
        data: { activationToken:activationToken }
    })
}

export const authRepository={
    insertUser,
    findByCPF,
    findByEmail,
    findByActivationToken,
    activateEmail,
    updateActivationToken
}
