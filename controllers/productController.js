const Product = require("../models/Product");

// ============================
// CREATE PRODUCT
// ============================

exports.createProduct = async (req, res) => {
  try {
    const exists = await Product.findOne({
      productCode: req.body.productCode,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Product Code already exists",
      });
    }

    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      message: "Product Added Successfully",
      data: product,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ============================
// GET PRODUCTS
// ============================

exports.getProducts = async (req, res) => {
  try {

    const search = req.query.search || "";

    const products = await Product.find({
      name: {
        $regex: search,
        $options: "i",
      },
    }).sort({ name: 1 });

    res.json({
      success: true,
      count: products.length,
      data: products,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ============================
// GET SINGLE PRODUCT
// ============================

exports.getProduct = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    res.json({
      success: true,
      data: product,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ============================
// UPDATE PRODUCT
// ============================

exports.updateProduct = async (req, res) => {
  try {

    const duplicate = await Product.findOne({
      _id: { $ne: req.params.id },
      productCode: req.body.productCode,
    });

    if (duplicate) {
      return res.status(400).json({
        success: false,
        message: "Product Code already exists",
      });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      message: "Product Updated Successfully",
      data: product,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ============================
// ACTIVATE / DEACTIVATE
// ============================

exports.toggleProduct = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    product.status = !product.status;

    await product.save();

    res.json({
      success: true,
      message: product.status
        ? "Product Activated"
        : "Product Deactivated",
      data: product,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ============================
// DELETE PRODUCT
// ============================

exports.deleteProduct = async (req, res) => {
  try {

    await Product.findByIdAndUpdate(
      req.params.id,
      {
        status: false,
      }
    );

    res.json({
      success: true,
      message: "Product Deleted Successfully",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};