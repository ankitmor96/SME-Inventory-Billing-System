import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name:{
     type: String, 
     required: true },
  phone:{ type: String },
  address: { type: String },
  udhar:{
     type: Number,
     default: 0 
    } // ઉધાર amount
}, 
{ timestamps: true });

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;