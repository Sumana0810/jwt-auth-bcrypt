        import Car from "../models/Car.js";

        // create a new Car listing
        export const createCar = async (req, res) => {
        try {
            const carData = {
            ...req.body,
            owner: req.user._id,
            };
            const car = await Car.create(carData);
            res.status(201).json({
            Sucess: true,
            message: "Car listed successfully",
            car,
            });
        } catch (error) {
            res.status(400).json({
            Success: false,
            message: "Failed to create car listing",
            });
        }
        };

        // get all car listings
        export const getAllCars = async (req, res) => {
        try {
            const {
            brand,
            fuelType,
            transmission,
            minPrice,
            maxPrice,
            minYear,
            maxYear,
            search,
            } = req.query;

            let query = { sold: false };

            if (brand) query.brand = brand;
            if (fuelType) query.fuelType = fuelType;
            if (transmission) query.transmission = transmission;
            if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
            }
            if (minYear || maxYear) {
            query.year = {};
            if (minYear) query.year.$gte = Number(minYear);
            if (maxYear) query.year.$lte = Number(maxYear);
            }
            if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { brand: { $regex: search, $options: "i" } },
                { model: { $regex: search, $options: "i" } },
            ];
            }

            const cars = await Car.find(query)
            .populate("owner", "name email")
            .sort({ createdAt: -1 });

            res.status(200).json({
            success: true,
            count: cars.length,
            cars,
            });
        } catch (error) {
            res.status(500).json({
            success: false,
            message: error.message,
            });
        }
        };

        // get car by ID
    export const getCarById = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id).populate("owner", "name email"); // <-- fix here
        if (!car) {
        return res.status(404).json({ success: false, message: "Car not found" });
        }
        res.status(200).json({ success: true, car });
    } catch (error) {
        res.status(500).json({
        success: false,
        message: error.message,
        });
    }
    };


        // update car listing
        export const updateCar = async (req, res) => {
        try {
            const car = await Car.findById(req.params.id);
            if (!car) {
            return res.status(404).json({ success: false, message: "Car not found" });
            }
            if (car.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: "Unauthorized" });
            }
            const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            });
            res.status(200).json({
            success: true,
            message: "Car listing updated successfully",
            car: updatedCar,
            });
        } catch (error) {
            res.status(400).json({
            success: false,
            message: "Failed to update car listing",
            });
        }
        };

        // delete car listing
        export const deleteCar = async (req, res) => {
        try {
            const car = await Car.findById(req.params.id);
            if (!car) {
            return res.status(404).json({ success: false, message: "Car not found" });
            }
            if (car.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: "Unauthorized" });
            }
            await Car.findByIdAndDelete(req.params.id);
            res.status(200).json({
            success: true,
            message: "Car listing deleted successfully",
            });
        } catch (error) {
            res.status(500).json({
            success: false,
            message: "Failed to delete car listing",
            });
        }
        };

        // Get user's own  listings
        export const getUserCars = async (req, res) => {
        try {
            const cars = await Car.find({ owner: req.user._id }).sort({
            createdAt: -1,
            });
            res.status(200).json({
            success: true,
            count: cars.length,
            cars,
            });
        } catch (error) {
            res.status(500).json({
            success: false,
            message: error.message,
            });
        }
        };

        // Mark car as sold

        export const markCarAsSold = async (req, res) => {
        try {
            const car = await Car.findById(req.params.id);
            if (!car) {
            return res.status(404).json({ success: false, message: "Car not found" });
            }
            if (car.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: "Unauthorized" });
            }
            car.sold = true;
            await car.save();
            res.status(200).json({
            success: true,
            message: "Car marked as sold",
            car,
            });
        } catch (error) {
            res.status(500).json({
            success: false,
            message: "Failed to mark car as sold",
            });
        }
        };