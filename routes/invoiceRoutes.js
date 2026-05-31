import express from "express";
import invoiceController from "../controller/invoiceController.js";

const router = express.Router();

// add 
router.post("/add", invoiceController.add);

// Get All 
router.get("/getAll", invoiceController.getAll);

// Get By Id
router.get("/getById/:id", invoiceController.getById);

// Delete 
router.delete("/deleteById/:id", invoiceController.deleteById);

export default router;