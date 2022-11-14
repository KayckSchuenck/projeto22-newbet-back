import {faker} from '@faker-js/faker'

export async function createPostAuthTestBody(){
    const password=faker.random.alphaNumeric(10)
    const body={
        cpf:faker.random.numeric(11),
        name:faker.name.fullName(),
        email:faker.internet.email(),
        password,
        confirmPassword:password
    }
    return body;
}

export async function createPostAuthTestBodyFail(){
    const body={
        cpf:faker.random.numeric(11),
        name:faker.name.fullName(),
        email:faker.internet.email(),
        password:faker.random.alphaNumeric(10),
        confirmPassword:faker.random.alphaNumeric(10)
    }
    return body;
}



