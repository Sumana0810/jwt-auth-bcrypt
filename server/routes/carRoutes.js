    import express from "express";
    import {
    createCar,
    deleteCar,
    getAllCars,
    getCarById,
    markCarAsSold,
    updateCar,
    } from "../controllers/carController.js";

    import { protect } from "../middlewares/authMiddleware.js";

    const router = express.Router();

    // GET all cars (public)
    router.get("/", getAllCars);

    // CREATE a new car (protected)
    router.post("/", protect, createCar);

    // GET single car by ID
    router.get("/:id", getCarById);

    // UPDATE car (protected)
    router.put("/:id", protect, updateCar);

    // DELETE car (protected)
    router.delete("/:id", protect, deleteCar);

    // MARK car as sold (protected)
    router.patch("/:id/sold", protect, markCarAsSold);

    export default router;
