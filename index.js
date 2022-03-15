const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');
const adminProductsRouter = require('./routes/admin/products');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');
const cors = require('cors')

const app = express();
app.use(cors());
app.options('*', cors());

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(
  cookieSession({
    keys: ['lkasld235j']
  })
);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.use(authRouter);
app.use(adminProductsRouter);
app.use(productsRouter);
app.use(cartsRouter);

app.listen(4000, () => {
  console.log('Listening');
});