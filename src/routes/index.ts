import { Router } from "express";
import authRouter from "./authRoutes.js";
import testRouter from "./testRoutes.js";

const router = Router();
router.use(authRouter)
router.use(testRouter)


export default router;
