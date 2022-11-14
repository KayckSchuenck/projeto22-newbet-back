import app from '../../src/index'
import supertest from 'supertest';
import prisma from '../../src/database';
import {faker} from '@faker-js/faker'
import {createPostAuthTestBody, createPostAuthTestBodyFail} from '../../factories/bodyFactory'
import { authRepository } from '../../src/repositories/authRepository';
import { betRepository } from '../../src/repositories/betRepository';
import { createBetOptionsArrayTest,createBetGoalsArrayTest,createBetScoresArrayTest } from '../../factories/betFactory';
import tokenTestFactory from '../../factories/tokenFactory';

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users CASCADE`;
  });
  
afterAll(async () => {
    await prisma.$disconnect();
});


describe("POST /sign-up", () => {
    it("given a correct body it should return 201", async () => {
        const body=await createPostAuthTestBody()
        const result = await supertest(app).post("/signup").send(body)
        const status = result.status;
        
        expect(status).toEqual(200);
    })

    it("given a wrong confirm password it should return 422", async () => {
        const body=await createPostAuthTestBodyFail()
        const result = await supertest(app).post("/signup").send(body)
        const status = result.status;
        
        expect(status).toEqual(422);
    })
})  

describe("POST /login", () => {
    it("given a correct body it should return 200", async () => {
        jest.spyOn(betRepository,'findById').mockImplementationOnce(async()=>{
            return {
                id:1,
                email:faker.internet.email(),
                password:faker.random.alphaNumeric(),
                name:faker.name.fullName(),
                cpf:faker.random.numeric(11),
                active:true,
                activationToken:faker.datatype.uuid(),
                availableMoney:faker.datatype.number(),
                createdAt:faker.date.past()
            }
        })
        jest.spyOn(betRepository,'findOptionBetById').mockImplementationOnce(async()=>{
            return createBetOptionsArrayTest()
        })
        jest.spyOn(betRepository,'findGoalBetById').mockImplementationOnce(async()=>{
            return createBetGoalsArrayTest()
        })
        jest.spyOn(betRepository,'findScoreBetById').mockImplementationOnce(async()=>{
            return createBetScoresArrayTest()
        })

        
        const result=await tokenTestFactory()
        expect(result.status).toEqual(200);

        expect(betRepository.findById).toHaveBeenCalled()
        expect(betRepository.findOptionBetById).toHaveBeenCalled()
        expect(betRepository.findGoalBetById).toHaveBeenCalled()
        expect(betRepository.findScoreBetById).toHaveBeenCalled()
    })

    it("given a wrong password it should return 401", async () => {
        const signUpBody = await createPostAuthTestBody()
        const {body}=await supertest(app).post("/signup").send(signUpBody)

        await authRepository.activateEmail(body.activationToken)

        const loginBody={
            email:signUpBody.email,
            password:faker.random.alphaNumeric(10)
        }
        
        const result = await supertest(app).post("/login").send(loginBody)

        expect(result.status).toEqual(401);
    })
    it("not confirming email should return 401", async () => {
        const SignUpBody = await createPostAuthTestBody()
        await supertest(app).post("/signup").send(SignUpBody)

        const loginBody={
            email:SignUpBody.email,
            password:faker.random.alphaNumeric(10)
        }
        const result = await supertest(app).post("/login").send(loginBody)
        
        expect(result.status).toEqual(401);
    })
})  