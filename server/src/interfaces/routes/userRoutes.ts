import express from "express";
import { userRegister,userSendOtp } from "../controllers/userController";

const router = express.Router();

router.post("/register", userRegister);
router.post("/send-otp", userSendOtp);

export default router;
