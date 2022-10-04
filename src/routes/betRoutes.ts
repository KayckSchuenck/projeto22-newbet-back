import {Router} from 'express'
import schemaValidateMiddleware from "../middlewares/schemaMiddleware.js";
import { schemaPostBetOptions } from '../schemas/betSchemas.js';
import { createBetOptions } from '../controllers/betControllers.js';

const betRouter=Router();

betRouter.post('/bets/options',schemaValidateMiddleware(schemaPostBetOptions),createBetOptions)

export default betRouter