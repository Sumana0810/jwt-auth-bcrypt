import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ConnectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
dotenv.config();

ConnectDB(process.env.MONGO_URl);
app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);

app.get("/", (req, res) => res.send("Api is running on the Port Number 4000"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on the Port ${PORT}`));
