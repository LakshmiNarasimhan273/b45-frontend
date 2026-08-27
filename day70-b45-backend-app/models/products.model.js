const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    // collections keys
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
});

const Products = mongoose.model("products", productSchema);
module.exports = Products;