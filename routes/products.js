const express = require("express");
const productsRepo = require("../repositories/products");

const router = express.Router();

router.get("/api", async (req, res) => {
  const products = await productsRepo.getAll();
  res.send({ products });
});

module.exports = router;
