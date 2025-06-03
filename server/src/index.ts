import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./interfaces/routes/userRoutes";
import adminRoutes from "./interfaces/routes/adminRoutes";
import doctorRoutes from "./interfaces/routes/doctorRoutes";  
import cors from "cors";


dotenv.config();
const app = express();  
app.use(cors());
app.use(express.json());

// Connect to DB
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/drnow")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Error", err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/doctor", doctorRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running...");
});
