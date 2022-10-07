import {Router} from 'express'
import schemaValidateMiddleware from "../middlewares/schemaMiddleware.js";
import { validateToken } from '../middlewares/tokenValidation.js';
import { schemaPostBetOptions,schemaPostBetGoalsCorners,schemaPostBetScores } from '../schemas/betSchemas.js';
import { createBetOptions,createBetScores,createBetGoalsCorners } from '../controllers/betControllers.js';

const betRouter=Router();

betRouter.post('/bets/options',validateToken,schemaValidateMiddleware(schemaPostBetOptions),createBetOptions)
betRouter.post('/bets/:goalOrCorner',validateToken,schemaValidateMiddleware(schemaPostBetGoalsCorners),createBetGoalsCorners)
betRouter.post('/bets/scores',validateToken,schemaValidateMiddleware(schemaPostBetScores),createBetScores)

export default betRouter