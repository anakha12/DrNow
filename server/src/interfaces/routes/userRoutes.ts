import { Request, Response, NextFunction} from "express";
import express from "express";
import { UserController } from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";
import { AuthRequest } from "../middleware/authMiddleware"; 

const router = express.Router();
const userController = new UserController();
router.get("/protected", authMiddleware, (req: AuthRequest, res: Response) =>userController.protectedRoute(req, res));
router.post("/register", (req: Request, res: Response) => userController.register(req, res));
router.post("/send-otp", (req: Request, res: Response) => userController.sendOtp(req, res));
router.post("/login", (req: Request, res: Response) => userController.login(req, res));
export default router;
