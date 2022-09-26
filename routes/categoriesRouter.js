const express = require('express');
const CategoriesService = require('./../services/categorieService')

const validatorHandler = require('./../middlewares/validatorHandler');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('./../schemas/categorySchema')

const router = express.Router();
const service = new CategoriesService();

router.get('/', async (req, res, next)=>{
  try {
    const categories = await service.find();
    res.json(categories)
  } catch (error) {
    next(error)
  }
});

router.get('/:categoryId',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next)=>{
    try {
      const { categoryId } = req.params
      const categories = await service.findOne(categoryId);
      res.json(categories);
    } catch (error) {
      next(error)
    }
});




router.post('/',
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next)=>{
    try {
      const body = req.body;
      const newCategories = await service.create(body);
      res.status(201).json(newCategories);
    } catch (error) {
      next(error)
    }
})




router.patch('/:categoryId',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next)=>{
    try {
      const { categoryId } = req.params;
      const body = req.body;
      const categorie = await service.update(categoryId, body);
      res.json(categorie);
    } catch (error) {
      next(error);
    }
});




router.delete('/:categoryId', async (req, res,next)=>{
  try {
    const { categoryId } = req.params;
    const rta = await service.delete(categoryId);
    res.json(rta);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
