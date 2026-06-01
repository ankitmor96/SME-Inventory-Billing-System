<img width="1919" height="990" alt="Screenshot 2026-05-31 130418" src="https://github.com/user-attachments/assets/8784ce4d-66ed-4364-bd1c-229ab0097870" />
<img width="1900" height="997" alt="Screenshot 2026-05-31 130443" src="https://github.com/user-attachments/assets/aee3e56c-e440-463e-883e-cf640f68fae8" />
<img width="1912" height="994" alt="Screenshot 2026-05-31 130527" src="https://github.com/user-attachments/assets/36188d7b-a6d5-442e-b8ea-dbde10c489b3" />
﻿# 🧾 SME Inventory & Billing System (Node.js + MongoDB)

A complete backend system for managing **customers, products, and invoices with GST billing support** using Node.js, Express, and MongoDB.

---

## 🚀 Features

- 👤 Customer Management (Create, Read)
- 📦 Product Management (Stock tracking)
- 🧾 Invoice Generation with GST calculation
- 💰 Auto subtotal, GST & grand total calculation
- 📉 Auto stock deduction on purchase
- 💳 Payment modes (cash, upi, credit)
- 📊 Udhar (credit) tracking system
- 🔗 MongoDB relations (populate customer & products)
- ⚠️ Global error handling middleware

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- nodemon

---

## 📁 Project Structure

Backend/
│
├── config/
│ └── db.js
│
├── controllers/
│ ├── customerController.js
│ ├── productController.js
│ └── invoiceController.js
│
├── middleware/
│ └── HttpError.js
│
├── models/
│ ├── Customer.js
│ ├── Product.js
│ └── Invoice.js
│
├── routes/
│ ├── customerRoutes.js
│ ├── productRoutes.js
│ └── invoiceRoutes.js
│
├── server.js
└── .env


---

## ⚙️ Installation

### 1. Clone project
```bash
git clone https://github.com/ankitmor96/SME-Inventory-Billing-System/edit.git
