import express from "express";
import { AdminController } from "../controllers/adminController";
import { verifyAdmin } from "../middleware/adminMiddleware";

const router = express.Router();
const adminController = new AdminController();

router.post("/login", (req, res) => adminController.adminLogin(req, res));
router.get("/protected", verifyAdmin, (req, res) => res.json({ message: "Admin only!" }));
router.get("/unverified-doctors", verifyAdmin, (req, res) => adminController.getUnverifiedDoctors(req, res));
router.post("/verify-doctor/:id", verifyAdmin, (req, res) => adminController.verifyDoctor(req, res));
router.post("/reject-doctor/:id", verifyAdmin, (req, res) => adminController.rejectDoctor(req, res));


export default router;