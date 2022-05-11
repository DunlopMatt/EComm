const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');
const adminProductsRouter = require('./routes/admin/products');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');
const cors = require('cors');
const path = require('path');

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

app.use(express.static(path.join(__dirname, 'app/build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'app/build', 'index.html'));
});

app.use(authRouter);
app.use(adminProductsRouter);
app.use(productsRouter);
app.use(cartsRouter);

port = process.env.PORT || 4000

app.listen(port, () => {
  console.log('Listening');
});