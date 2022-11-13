import { Router } from "express";
import authRouter from "./authRoutes";
import betRouter from "./betRoutes";

const router = Router();
router.use(authRouter)
router.use(betRouter)


export default router;
