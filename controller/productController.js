import Product from "../models/Product.js";
import HttpError from "../middleware/HttpError.js";


const add = async (req, res, next) => {
  try {
    const { name, price, stock, gstRate , unit } = req.body;

    const newProduct = new Product({
      name,
      price,
      stock,
      gstRate,
      unit
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "new product added",
      data: newProduct
    });
  } catch (error) {
    return next(new HttpError("route not found", 500));
  }
}

const getAll = async (req, res, next) => {
  try {
    const products = await Product.find();

    if (products.length === 0) {
      res.status(404).json({
        success: true,
        message: "all product has not defined"
      });
    }
    res.status(200).json({
      success: true,
      message: "all product has defined",
      data: products
    });
  } catch (error) {
    return next(new HttpError("route not found", 500));
  }
}

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const products = await Product.findById(id);

    if (!products) {
      res.status(404).json({
        success: true,
        message: "product id not found"
      });
    }
    res.status(200).json({
      success: true,
      message: "product id is defined",
      data: products
    });
  } catch (error) {
    return next(new HttpError("route not found", 500));
  }
}

const updateById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updateProduct = await Product.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updateProduct) {
      res.status(404).json({
        success: true,
        message: " product id not updated"
      });
    }
    res.status(200).json({
      success: true,
      message: "product id is updated",
      data: updateProduct
    });

  } catch (errpr) {
    return next(new HttpError("route not found", 500))
  }
}

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleteProduct = await Product.findByIdAndDelete(id);

    if (!deleteProduct) {
      res.status(404).json({
        success: true,
        message: "Product id not deleted"
      });
    }
    res.status(200).json({
      success: true,
      message: "Product id is deleted",
      data: deleteProduct
    });

  } catch (errpr) {
    return next(new HttpError("route not found", 500))
  }
}

export default { add, getAll, getById, updateById, deleteById };