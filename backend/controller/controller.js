import Product from "../model/products.js";

export const createProducts = async (req, res) => {
  try {
    const { name, price, image } = req.body;
    if (!name || !price || !image) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const newProduct = new Product({ name, price, image });
    await newProduct.save();

    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const deleteProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = await Product.findByIdAndDelete(id); // Mongoose method to find a document by its MongoDB objectId
    if (!deleteProduct) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found" });
    } else {
      res
        .status(200)
        .json({ success: true, message: "Product deleted successfully" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", success: false, error: error.message });
  }
};
export const getProducts = async (req, res) => {
  try {
    const fetchData = await Product.find(); // getting all products from database

    res.status(200).json({ success: true, data: fetchData });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
export const getProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const fetchData = await Product.findById(id); // fetch all products from database

    if (!fetchData) {
      return res.status(400).json({ success: false, message: "not found" });
    } else {
      res.status(200).json({ success: true, fetchData });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
export const updateProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, image } = req.body;

    const updateProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, image }, // Fields to update

      { new: true, runValidators: true } // Ensure it returns updated doc & validates data
    );

    if (!updateProduct) {
      return res.status(404).send({ message: "Product not found" }); // Return to stop further execution
    } else {
      res.status(200).json({ success: true, productUpdated: updateProduct });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
