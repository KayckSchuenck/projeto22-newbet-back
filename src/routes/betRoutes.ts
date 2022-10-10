import {Router} from 'express'
import schemaValidateMiddleware from "../middlewares/schemaMiddleware.js";
import { validateToken } from '../middlewares/tokenValidation.js';
import { schemaPostBetOptions,schemaPostBetGoals,schemaPostBetScores } from '../schemas/betSchemas.js';
import { createBetOptions,createBetScores,createBetGoals, checkBets, getHistory } from '../controllers/betControllers.js';

const betRouter=Router();

betRouter.post('/bets/options',validateToken,schemaValidateMiddleware(schemaPostBetOptions),createBetOptions)
betRouter.post('/bets/goals',validateToken,schemaValidateMiddleware(schemaPostBetGoals),createBetGoals)
betRouter.post('/bets/scores',validateToken,schemaValidateMiddleware(schemaPostBetScores),createBetScores)
betRouter.get('/bets',validateToken,checkBets)
betRouter.get('/bets/history',validateToken,getHistory)

export default betRouter