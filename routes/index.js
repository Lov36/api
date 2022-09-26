const express = require('express');
const productsRouter = require('./productsRouter');
const usersRouter = require('./usersRouter');
const categoriesRouter = require('./categoriesRouter');
const ordenesRouter = require('./ordenesRouter');

function routerApi(app){
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
  router.use('/ordenes', ordenesRouter);
  router.use('/categories', productsRouter);
  router.use('/users', ordenesRouter);
}

module.exports = routerApi;
