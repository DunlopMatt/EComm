const express = require("express");
const cartsRepo = require("../repositories/carts");
const productsRepo = require("../repositories/products");

const router = express.Router();

router.post("/api/cart/products", async (req, res) => {
  let cart;

  if (!req.body.cookies.cart) {
    cart = await cartsRepo.create({ items: [] });
    req.body.cookies.cart = cart.id;
  } else {
    cart = await cartsRepo.getOne(req.body.cookies.cart);
  }
  const existingItem = cart.items.find(
    (item) => item.id === req.body.productId
  );
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.items.push({ id: req.body.productId, quantity: 1 });
  }
  await cartsRepo.update(cart.id, {
    items: cart.items,
  });

  res.send(cart);
});

router.post("/api/cart", async (req, res) => {
  const cart = await cartsRepo.getOne(req.body.cookies.cart);

  for (let item of cart.items) {
    const product = await productsRepo.getOne(item.id);

    item.product = product;
  }

  res.send({ items: cart.items });
});

router.post("/api/cart/products/delete", async (req, res) => {
  const { itemId } = req.body;
  const cart = await cartsRepo.getOne(req.body.cookies.cart);

  const items = cart.items.filter((item) => item.id !== itemId);

  await cartsRepo.update(req.body.cookies.cart, { items });

  res.send(cart);
});

module.exports = router;
