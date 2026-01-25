import express from "express";
import { body } from "express-validator";
import { loginUser, registerUser } from "../controllers/authController.js";

const router = express.Router();

// Register route
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  registerUser
);

// Login route
router.post("/login", loginUser);

export default router;
