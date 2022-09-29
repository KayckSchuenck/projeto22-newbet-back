import { Request,Response,NextFunction } from "express";

const ERRORS = {
  unauthorized: 401,
  conflict: 409,
  notFound: 404,
  incorrectData:422
};

export default function errorHandlerMiddleware(error:any,req: Request,res: Response,next: NextFunction) {
  
  const {type,message} = error

  let statusCode = ERRORS[type];
  if (!statusCode) statusCode = 500; // any other types

  console.log(error);
  return res.status(statusCode).send(message); // internal server error
}