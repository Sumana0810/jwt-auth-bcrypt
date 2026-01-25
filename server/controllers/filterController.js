// Get unique brands
export const getUniqueBrands = async (req, res) => {
  try {
    const brands = await Car.distinct("brand");
    res.status(200).json({ success: true, brands });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get price    range
export const getPriceRange = async (req, res) => {
  try {
    const minPrice = await Car.findOne().sort({ price: 1 }).select("price");
    const maxPrice = await Car.findOne().sort({ price: -1 }).select("price");
    res.status(200).json({
      sucess: true,
      minPrice: minPrice?.price || 0,
      maxPrice: maxPrice?.price || 100000000,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get  year range

export const getYearRange = async (req, res) => {
  try {
    const minYear = await Car.findOne().sort({ year: 1 }).select("year");
    const maxYear = await Car.findOne().sort({ year: -1 }).select("year");
    res.status(200).json({
      sucess: true,
      minYear: minYear?.year || 2000,
      maxYear: maxYear?.year || new Date().getFullYear(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};