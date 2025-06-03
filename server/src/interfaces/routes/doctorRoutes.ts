import express from "express";
import { DoctorController,MulterRequest } from "../controllers/doctorController";
import multer from 'multer';
import { upload } from "../../interfaces/middleware/multerConfig";


const router = express.Router();
const doctorController = new DoctorController();


router.post(
  "/send-otp",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "medicalLicense", maxCount: 1 },
    { name: "idProof", maxCount: 1 },
  ]),
  (req, res) => doctorController.sendOtp(req as MulterRequest, res)
);

router.post("/verify-otp", (req, res) => doctorController.verifyOtp(req, res));
router.post("/login", (req, res) => doctorController.login(req, res));



export default router;