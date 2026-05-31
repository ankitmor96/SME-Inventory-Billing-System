import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  price:    { type: Number, required: true },
  stock:    { type: Number, default: 0 },
  gstRate:  { type: Number, default: 18 }, // GST % — 5, 12, 18, 28
  unit:     { type: String, default: 'pcs' } // kg, litre, pcs
}, { timestamps: true })

const Product =  mongoose.model('Product', productSchema);

export default Product;