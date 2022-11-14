import app from '../../src/index'
import supertest from 'supertest';
import prisma from '../../src/database';
import {faker} from '@faker-js/faker'
import {createPostAuthTestBody, createPostAuthTestBodyFail} from '../../factories/bodyFactory'
import { authRepository } from '../../src/repositories/authRepository';
import { betRepository } from '../../src/repositories/betRepository';
import { createBetOptionsTest,createBetGoalsTest, createBetScoresTest } from '../../factories/betFactory';
import tokenTestFactory from '../../factories/tokenFactory';

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users CASCADE`;
  });
  
afterAll(async () => {
    await prisma.$disconnect();
});

describe("POST /bets/:type", () => {
    it("given a valid amount it should return 201", async () => {
        const result=await tokenTestFactory()
        const token=result.body.token
        
        const bodyOptions=await createBetOptionsTest(result.body.availableMoney)
        const resultOptions = await supertest(app).post("/bets/options").send(bodyOptions).set("Authorization",`Bearer ${token}`)

        const bodyGoals=await createBetGoalsTest(result.body.availableMoney)
        const resultGoals = await supertest(app).post("/bets/goals").send(bodyGoals).set("Authorization",`Bearer ${token}`)

        const bodyScores=await createBetScoresTest(result.body.availableMoney)
        const resultScores = await supertest(app).post("/bets/scores").send(bodyScores).set("Authorization",`Bearer ${token}`)
        
        expect(resultOptions.status).toEqual(201);
        expect(resultGoals.status).toEqual(201);
        expect(resultScores.status).toEqual(201);
    })
    it("given an invalid amount it should return 401", async () => {
        const result=await tokenTestFactory()
        const token=result.body.token

        const bodyOptions=await createBetOptionsTest(result.body.availableMoney)
        const bodyOptionsWithInvalidAmount={...bodyOptions,amount:result.body.availableMoney+2}
        const resultOptions= await supertest(app).post("/bets/options").send(bodyOptionsWithInvalidAmount).set("Authorization",`Bearer ${token}`)

        expect(resultOptions.status).toEqual(401)
        
    })
})

describe("GET /bets/history", () => {
    it('given a valid user, should return 200 and the history', async () => {
        const result=await tokenTestFactory()
        const token=result.body.token

        const history=await supertest(app).get("/bets/history").set("Authorization",`Bearer ${token}`)

        expect(history.status).toEqual(200)
        expect(history.body).toBeInstanceOf(Array)
    })
})