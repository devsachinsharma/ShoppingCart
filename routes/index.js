const express = require('express');
const router = express.Router();

const passport = require('passport');
const Product = require('../models/product');
const {
  ensureAuthenticated
} = require('../config/auth');
const Cart = require('../models/cart');
const Order = require('../models/order');

/* GET home page. */
router.get('/', function (req, res, next) {
  var successMsg = req.flash('success')[0];
  var products = Product.find((err, docs) => {
    var productChunks = [];
    var chunkSize = 3;
    for (var i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize))
    }
    res.render('shop/index', {
      title: 'Shopping Cart',
      products: productChunks,
      successMsg: successMsg,
      noMessages: !successMsg
    });
  }); // this is also asynchronous so call render when you get all results back
});

router.get('/user/profile', ensureAuthenticated, (req, res) => {
  res.render('user/profile', {
    name: req.user.name
  })
});

router.get('/add/:id', ensureAuthenticated, (req, res, next) => {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  Product.findById(productId, (err, product) => {
    if (err) {
      return res.redirect('/');
    }
    cart.add(product, product.id);
    req.session.cart = cart; // session will save this no need to save manualy
    res.redirect('/');
  })
})

router.get('/cart', ensureAuthenticated, (req, res, next) => {
  if (!req.session.cart) {
    return res.render('shop/shopping-cart', {
      products: null
    });
  }
  var cart = new Cart(req.session.cart)
  res.render('shop/shopping-cart', {
    products: cart.generateArray(),
    totalPrice: cart.totalPrice
  })
})

router.get('/checkout', (req, res) => {
  if (!req.session.cart) {
    return res.redirect('/cart');
  }
  var cart = new Cart(req.session.cart)
  var errMsg = req.flash('error')[0];
  res.render('shop/checkout', {
    total: cart.totalPrice,
    errMsg: errMsg,
    noError: !errMsg
  })
})

router.post('/checkout', (req, res) => {
  if (!req.session.cart) {
    return res.redirect('/cart')
  }
  var cart = new Cart(req.session.cart);
  var stripe = require("stripe")("sk_test_dXUEvkIpSYspvOqkZjYZh5yz006yHH0S1g");

  stripe.charges.create({
    amount: cart.totalPrice * 100,
    currency: "inr",
    source: "tok_mastercard", // obtained with Stripe.js
    description: "Test Charge"
  }, function (err, charge) {
    // asynchronously called
    if (err) {
      // console.log(err)
      req.flash('error', err.message);
      return res.redirect('/checkout');
    }
    var order = new Order({
      user: req.user,
      cart: cart,
      address: req.body.address,
      name: req.body.name,
      paymentId: charge.id
    })
    order.save((err, result) => {
      if(err){
        return res.redirect('/cart')
      }
      console.log(result);
      req.flash('success', 'Successfully bought product!');
      req.session.cart = null;
      res.redirect('/');
    })
  });
})

module.exports = router;