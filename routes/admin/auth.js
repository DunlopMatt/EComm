const express = require('express');

const { handleErrors } = require('./middlewares');
const usersRepo = require('../../repositories/users');
const {
  requireEmail,
  requirePassword,
  requirePasswordConfirmation,
  requireEmailExists,
  requireValidPasswordForUser
} = require('./validators');

const router = express.Router();

router.get('/signup', (req, res) => {
  res.send(req.body);
});


router.post(
  '/signup',
  [requireEmail, requirePassword, requirePasswordConfirmation],
  handleErrors(),
  async (req, res) => {
    const { email, password } = req.body;
    const user = await usersRepo.create({ email, password });

    req.session.userId = user.id;
    res.send({user})
  }
);

router.get('/signout', (req, res) => {
  req.session = null;
  res.redirect("/signin");
});

router.get('/signin', (req, res) => {
  res.send(req.session.userId);
});

router.post(
  '/signin',
  [requireEmailExists, requireValidPasswordForUser],
  handleErrors(),
  async (req, res) => {
    const { email } = req.body;

    const user = await usersRepo.getOneBy({ email });

    req.session.userId = user.id;

    res.send({user});
  }
);

module.exports = router;
