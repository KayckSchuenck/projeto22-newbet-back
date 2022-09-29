import { Request,Response,NextFunction } from "express";


export function  schemaValidateMiddleware(schema) {
    return (req:Request, res:Response, next:NextFunction) => { 
      const {error} = schema.validate(req.body, {abortEarly: false});
      if (error) {
        console.log(error)
        throw {type:"incorrectData", message:"Dados inválidos"}
      }
      next();
    }
  }
export default schemaValidateMiddleware;