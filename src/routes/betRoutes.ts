import {Router} from 'express'
import schemaValidateMiddleware from "../middlewares/schemaMiddleware";
import { validateToken } from '../middlewares/tokenValidation';
import { schemaPostBetOptions,schemaPostBetGoals,schemaPostBetScores } from '../schemas/betSchemas';
import { createBetOptions,createBetScores,createBetGoals,getHistory } from '../controllers/betControllers';

const betRouter=Router();

betRouter.post('/bets/options',validateToken,schemaValidateMiddleware(schemaPostBetOptions),createBetOptions)
betRouter.post('/bets/goals',validateToken,schemaValidateMiddleware(schemaPostBetGoals),createBetGoals)
betRouter.post('/bets/scores',validateToken,schemaValidateMiddleware(schemaPostBetScores),createBetScores)
betRouter.get('/bets/history',validateToken,getHistory)

export default betRouter