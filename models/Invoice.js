import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  customer:   { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  items: [{
    product:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name:     String,
    qty:      Number,
    price:    Number,
    gstRate:  Number,
    total:    Number
  }],
  subtotal:   Number,
  gstAmount:  Number,
  grandTotal: Number,
  paid:       { type: Boolean, default: false },
  paymentMode:{ 
    type: String, 
    enum: ['cash','upi','credit'] 
  }
}, { timestamps: true });

const Invoice = mongoose.model('Invoice', invoiceSchema);
export default Invoice;