import app from '../../src/index'
import supertest from 'supertest';
import prisma from '../../src/database';
import {createPostAuthTestBody, createPostAuthTestBodyFail} from '../../factories/bodyFactory'
import { authRepository } from '../../src/repositories/authRepository';
import { faker } from '@faker-js/faker';

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
  });
  
afterAll(async () => {
    await prisma.$disconnect();
});


describe("POST /sign-up", () => {
    it("given a correct body it should return 201", async () => {
        const body=await createPostAuthTestBody()
        const result = await supertest(app).post("/signup").send(body)
        const status = result.status;
        
        expect(status).toEqual(201);
    })

    it("given a wrong confirm password it should return 409", async () => {
        const body=await createPostAuthTestBodyFail()
        const result = await supertest(app).post("/signup").send(body)
        const status = result.status;
        
        expect(status).toEqual(409);
    })
})  

describe("POST /login", () => {
    it("given a correct body it should return 200", async () => {
        const signUpBody = await createPostAuthTestBody()
        const {body}=await supertest(app).post("/signup").send(signUpBody)
        await authRepository.activateEmail(body.activationToken)
        const loginBody={
            email:signUpBody.email,
            password:signUpBody.password
        }
        const result = await supertest(app).post("/login").send(loginBody)
        expect(result.status).toEqual(200);
    })

    it("given a wrong password it should return 401", async () => {
        const signUpBody = await createPostAuthTestBody()
        const {body}=await supertest(app).post("/signup").send(signUpBody)
        await authRepository.activateEmail(body.activationToken)
        const loginBody={
            email:signUpBody.email,
            password:faker.random
        }
        const result = await supertest(app).post("/login").send(loginBody)
        expect(result.status).toEqual(401);
    })
    it("not confirming email should return 401", async () => {
        const SignUpBody = await createPostAuthTestBody()
        await supertest(app).post("/signup").send(SignUpBody)
        const loginBody={
            email:SignUpBody.email,
            password:faker.random
        }
        const result = await supertest(app).post("/login").send(loginBody)
        expect(result.status).toEqual(401);
    })
})  