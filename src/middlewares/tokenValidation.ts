import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import notFoundError from "./notFoundError.js";

export function validateToken(req : Request, res: Response, next: NextFunction){
    const { authorization } = req.headers;

    const token = authorization?.replace('Bearer ', '').trim() as string;
    if (!token) throw notFoundError('token')

    const secretKey = process.env.JWT_SECRET as string

    jwt.verify(token, secretKey,(err,result)=>{
        if(err) return res.status(401).send(err.message)
        if(result) {
            res.locals.id =result
            next();
        }
    })    
};

