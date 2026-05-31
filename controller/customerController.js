import Customer from "../models/Customer.js";
import HttpError from "../middleware/HttpError.js";


const add = async (req, res, next) => {
    try {
        const { name, phone, address, udhar } = req.body;

        const newCustomer = new Customer({
            name,
            phone,
            address,
            udhar
        });

        await newCustomer.save();

        res.status(201).json({
            success: true,
            message: "new customer added",
            data: newCustomer
        });
    } catch (error) {
        return next(new HttpError("route not found", 500));
    }
}

const getAll = async (req, res, next) => {
    try {
        const customers = await Customer.find();

        if (customers.length === 0) {
            res.status(404).json({
                success: true,
                message: "all customer has not defined"
            });
        }
        res.status(200).json({
            success: true,
            message: "all customer has defined",
            data: customers
        });
    } catch (error) {
        return next(new HttpError("route not found", 500));
    }
}

const getById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const customers = await Customer.findById(id);

        if (!customers) {
            res.status(404).json({
                success: true,
                message: "customer id not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "customer id is defined",
            data: customers
        });
    } catch (error) {
        return next(new HttpError("route not found", 500));
    }
}

const updateByid = async (req, res, next) => {
    try {
        const { id } = req.params;

        const updateCustomer = await Customer.findByIdAndUpdate(
            id,
            req.body,
            {new:true}
        );

        if (!updateCustomer) {
            res.status(404).json({
                success: true,
                message: "customer id not updated"
            });
        }
        res.status(200).json({
            success: true,
            message: "customer id is updated",
            data: updateCustomer
        });

    }catch(errpr){
        return next (new HttpError("route not found", 500))
    }
}

const deleteById = async(req,res,next)=>{
    try{
       const { id } = req.params;

        const deleteCustomer = await Customer.findByIdAndDelete(id);

        if (!deleteCustomer) {
            res.status(404).json({
                success: true,
                message: "customer id not deleted"
            });
        }
        res.status(200).json({
            success: true,
            message: "customer id is deleted",
            data: deleteCustomer
        });

    }catch(errpr){
        return next (new HttpError("route not found", 500))
    }
}

export default { add, getAll, getById , updateByid , deleteById};