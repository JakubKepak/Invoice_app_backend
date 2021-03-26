import { model, Schema } from "mongoose";

const invoiceSchema = new Schema({
  id: String,
  createdAt: String,
  description: String,
});

export default model("Invoice", invoiceSchema);
