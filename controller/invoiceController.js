import Invoice from "../models/Invoice.js";
import Product from "../models/Product.js";
import Customer from "../models/Customer.js";
import HttpError from "../middleware/HttpError.js";

const add = async (req, res, next) => {
  try {
    const { customerId, items, paymentMode } = req.body;   // invoice check kare ke aa vastu aapde levani che customer ni 

    const customer = await Customer.findById(customerId); // check kare che ke invoice ma customer id cheke

    if (!customer) {  // jo no hoy to 
      return res.status(404).json({
        success: true,
        message: "Customer not found"
      });
    }

    let subtotal = 0; // jo hoy to 
    let gstAmount = 0;
    let invoiceItems = [];

    for (const item of items) { // customer ae jet la product lidha che ae badh ne id thi for loop ma lay ne check kare che 
      const product = await Product.findById(item.productId);

      if (!product) {   // jo product na hoy to 
        return res.status(404).json({
          success: true,
          message: `Product not found: ${item.productId}`
        });
      }

      if (product.stock < item.qty) {  // stock che kare che  jo hase to yes baki not available
        return res.status(400).json({
          success: true,
          message: `${product.name} stock not available`
        });
      }

      const itemTotal = product.price * item.qty;  // jo product hase to aeni price ane qty no total 
      const itemGST = (itemTotal * product.gstRate) / 100;  // product no gst ketlo thase te check kare che 

      subtotal += itemTotal;  // item no total subtotal j hovo joye aem 
      gstAmount += itemGST;  // item gst no total gstAmount j hovu joye aem

      invoiceItems.push({  // final bill ma aa badhu add thavu joye
        product: product._id,
        name: product.name,
        qty: item.qty,
        price: product.price,
        gstRate: product.gstRate,
        total: itemTotal + itemGST
      });

      await Product.findByIdAndUpdate(product._id, {  // pela jetlo stock hato aemathi (-) kare  id goti ne 
        $inc: { stock: -item.qty }    // stock increement (+) // stock ma decreement(-) thay che 
      });
    }

    const grandTotal = subtotal + gstAmount;  // grand total ma banne nu (+) thay

    const newInvoice = new Invoice({  // new bill banave to aema su su hovu joye
      customer: customerId,
      items: invoiceItems,
      subtotal,
      gstAmount,
      grandTotal,
      paymentMode,
      paid: paymentMode !== "credit"
    });

    await newInvoice.save();   // bill save thavu joye

    if (paymentMode === "credit") {    // jo bill nu payment baki rakhe to udharma grandTotal vayo jay
      customer.udhar += grandTotal;
      await customer.save();  // udhar save thay jay customer nu 
    }

    res.status(201).json({ // jo aem no thay to payment thay jay
      success: true,
      message: "Invoice created successfully",
      data: newInvoice
    });

  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const getAll = async (req, res, next) => {
  try {
    const invoices = await Invoice.find() // badha bill layave che 
      .populate("customer") // customer ni id 
      .populate("items.product");  // product ni id

    if (!invoices) { // jo no hoy to 
      return res.status(404).json({
        success: true,
        message: "Invoice not found"
      });
    }

    res.status(200).json({
      success: true,
      data: invoices
    });

  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const invoice = await Invoice.findById(id)  // badha bill mathi  lave che customer ni id and product ni id je jotu hoy te 
      .populate("customer")  // customer ni id 
      .populate("items.product"); // product ni id 

    if (!invoice) { // jo no hoy to 
      return res.status(404).json({
        success: true,
        message: "Invoice not found"
      });
    }

    res.status(200).json({ // jo hoy to 
      success: true,
      data: invoice
    });

  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const invoice = await Invoice.findById(id);   // bill ni id gote che 

    if (!invoice) { // jo no hoy to
      return res.status(404).json({
        success: true,
        message: "Invoice not found"
      });
    }

    await Invoice.findByIdAndDelete(id);  //jo id mali jay to 

    res.status(200).json({
      success: true,
      message: "Invoice deleted successfully"
    });

  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

export default {
  add,
  getAll,
  getById,
  deleteById
};