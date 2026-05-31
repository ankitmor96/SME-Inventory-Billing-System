import express from "express";
import Customer from "../models/Customer.js";
import customerController from "../controller/customerController.js";

const router = express.Router();


// add
router.post("/add", customerController.add );

// get all
router.get("/getAll", customerController.getAll);

// get By I         d
router.get("/getById/:id", customerController.getById);

// update By Id
router.patch("/updateByid/:id", customerController.updateByid);

// delete By Id 
router.delete("/deleteById/:id", customerController.deleteById);


export default router;