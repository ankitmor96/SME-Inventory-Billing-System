import express from "express";
import HttpError from "./middleware/HttpError.js";

import dotenv from "dotenv";
import connectDB from "./config/db.js";

import customerRoutes from "./routes/customerRoutes.js";
import productRoutes from "./routes/productRoutes.js"
import invoiceRoutes from "./routes/invoiceRoutes.js";


dotenv.config({ path: "./.env" });

const app = express();

const port = 5000;

app.use(express.json());

//customer routes

app.use("/api/Customer", customerRoutes);
app.use("/api/Invoice", invoiceRoutes);
app.use("/api/Product", productRoutes);

app.get("/", (req, res, next) => {
    res.json("hello from server");
});

app.use((req, res, next) => {
    return next(new HttpError("route not found", 404));
});

app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }

    res.status(error.statusCode || 500).json({
        message: error.message || "internal server error"
    });
});

async function StartServer() {

    try {
        await connectDB();


        app.listen(port, (error) => {
            if (error) {
                console.log(error);
            }

            console.log(`server has runing on port ${port}`);
        });
    } catch (error) {
        console.log(error.message);
    }

}

StartServer();
