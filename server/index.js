import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ConnectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import carRoutes from "./routes/carRoutes.js";

dotenv.config();
const app = express();

// Connect to MongoDB
ConnectDB(process.env.MONGO_URL);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", authRoutes);
app.use("/api/cars", carRoutes);

app.get("/", (req, res) => res.send("API is running on port 4000"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
