import app from '../src/index'
import supertest from 'supertest';
import { createPostAuthTestBody } from "./bodyFactory"
import { authRepository } from '../src/repositories/authRepository';

export default async function tokenTestFactory() {
    const signUpBody=await createPostAuthTestBody()
    const {body} = await supertest(app).post("/signup").send(signUpBody)

    await authRepository.activateEmail(body.activationToken)

    const loginBody={
        email:signUpBody.email,
        password:signUpBody.password
    }
    
    const result = await supertest(app).post("/login").send(loginBody)
    return result
}