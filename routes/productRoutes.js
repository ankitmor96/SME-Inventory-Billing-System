import express from "express";
import Product from "../models/Product.js";
import productController from "../controller/productController.js";

const router = express.Router();


// add
router.post("/add", productController.add );

// get all
router.get("getAll", productController.getAll);

// get By I         d
router.get("/getById/:id", productController.getById);

// update By Id
router.patch("/updateByid/:id", productController.updateById);

// delete By Id 
router.delete("/deleteById/:id", productController.deleteById);


export default router;