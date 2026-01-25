    // src/middlewares/authMiddleware.js
    import jwt from "jsonwebtoken";
    import { User } from "../models/User.js";

    // Protect routes middleware
    export const protect = async (req, res, next) => {
    let token;

    // Check if Authorization header exists and starts with 'Bearer'
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
        // Get token from header
        token = req.headers.authorization.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user to request object (without password)
        req.user = await User.findById(decoded.id).select("-password");

        next(); // Continue to next middleware/controller
        } catch (error) {
        console.error("Token verification failed:", error.message);
        return res
            .status(401)
            .json({ message: "Not authorized, token failed" });
        }
    }

    // If no token found
    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
    };
