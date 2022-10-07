import { Router } from "express";
import authRouter from "./authRoutes.js";
import betRouter from "./betRoutes.js";

const router = Router();
router.use(authRouter)
router.use(betRouter)


export default router;
