import mongoose from "mongoose";

// Defining the data in the Schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  // Stores the date and time when the document was createAt, updateAt
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
