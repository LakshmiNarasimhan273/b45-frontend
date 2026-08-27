const productModel = require("../models/products.model");

// GET
const allProducts = async (req, res) => {
  try {
    const products = await productModel.find();

    if (products.length === 0) {
      return res.status(404).json({ message: "Products collection empty" });
    }
    res.status(200).json({ success: true, products });
  } catch (err) {
    res.status(500).json({ message: "Products fetching failed" });
  }
};

// POST
const addProduct = async (req, res) => {
  try {
    const { title, description, price } = req.body;

    // basic validation
    if (!title || !description || !price) {
      return res.status(400).json({ message: "All the fields are required" });
    }

    const product = await productModel.create({ title, description, price, userId: req.userId });
    
    res.status(201).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ message: "Product Creation failed" });
  }
};

// PUT
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.status(200).json({ success: true, updatedProduct });
  } catch (err) {
    res.status(500).json({ message: "Product updation failed" });
  }
};

// DELETE
const deleteProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Product removed" });
  } catch (err) {
    res.status(500).json({ message: "Product deletion failed" });
  }
};

module.exports = { allProducts, addProduct, updateProduct, deleteProduct };
