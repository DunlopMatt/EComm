const express = require('express');
const multer = require('multer');

const { handleErrors, requireAuth } = require('./middlewares');
const productsRepo = require('../../repositories/products');
const { requireTitle, requirePrice } = require('./validators');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/admin/products', requireAuth, async (req, res) => {
  const products = await productsRepo.getAll();
  res.send({ products });
});

router.get('/admin/products/new', requireAuth, (req, res) => {
  res.send(req.body);
});

router.post(
  '/admin/products/new',
  requireAuth,
  upload.single('image'),
  [requireTitle, requirePrice],
  handleErrors(), 
  async (req, res) => {
    console.log(req.body)
    const image = req.file.buffer.toString('base64');
    const { title, price } = req.body;
    await productsRepo.create({ title, price, image });
    res.send(req.body)
  }
);

router.get('/admin/products/:id/edit', async (req, res) => {
    const product = await productsRepo.getOne(req.params.id);
  if(!product) {
    return res.send('Product not found');
  }
  res.send({ product });
});

router.post('/admin/products/:id/edit', 
  requireAuth, 
  upload.single('image'), 
  [requireTitle, requirePrice], 
  handleErrors( async (req) => {
    const product = await productsRepo.getOne(req.params.id);
    return { product };
  }), 
  async (req, res) => {

    const changes = req.body;
    if (req.file) {
      changes.image = req.file.buffer.toString('base64');
    }
    try{ 
      await productsRepo.update(req.params.id, changes)
    } catch (err) {
      return res.send('Could not find item');
    }
    // res.redirect('/admin/products');
    res.send(req.body)
  } 
);

router.post('/admin/products/:id/delete', requireAuth, async (req, res) => {
  // Auth 

  await productsRepo.delete(req.params.id);
  res.send(req.body)
  // res.redirect('/admin/products');
});

module.exports = router;
