const express = require("express");
const router = express.Router();

const productController = require("../controllers/products.controller");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware(), productController.allProducts);
router.post("/add", authMiddleware("admin"), productController.addProduct);
router.put("/:id", authMiddleware("admin"), productController.updateProduct);
router.delete("/:id", authMiddleware("admin"), productController.deleteProduct);

module.exports = router;