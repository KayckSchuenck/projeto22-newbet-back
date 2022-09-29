import sgMail from '@sendgrid/mail'
import { authRepository } from '../repositories/authRepository'

export async function sendEmail(email:string,data:string){
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    try{
        const {email:user}=await authRepository.findByEmail(email)
        const msg = {
            to: user, 
            from: 'ycferreiras@gmail.com',
            subject: 'Activate your account',
            text: data,
            html: `<em>${data}</em>`,
        }
        await sgMail.send(msg)
    } catch(e){
        console.log(e)
    }
}