import { Request, Response } from "express";
import express from "express";
import { UserController } from "../controllers/userController";

const router = express.Router();
const userController = new UserController();

router.post("/register", (req: Request, res: Response) => userController.register(req, res));
router.post("/send-otp", (req: Request, res: Response) => userController.sendOtp(req, res));

export default router;
