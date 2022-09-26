const express = require('express');
const router = express.Router();
const OrdenesService = require('./../services/ordenesService');

const validatorHandler = require('./../middlewares/validatorHandler');
const { createOrdenSchema, updateOrdenSchema, updateOrdenUSchema, getOrdenSchema, getOrdenUSchema} = require('./../schemas/ordenSchema');

const service = new OrdenesService();

router.get('/', async (req, res, next)=>{
  try {
    const ordenes = await service.find();
    res.json(ordenes);
  } catch (error) {
    next(error);
  }
})


router.get('/:ordenId',
  validatorHandler(getOrdenSchema, 'params'),
  async (req, res, next)=>{
    try {
      const { ordenId } = req.params;
      const ordenes = await service.findOne(ordenId);
      res.json(ordenes)
    } catch (error) {
      next(error);
    }
});


router.get('/:ordenId/:userId',
  validatorHandler(getOrdenUSchema, 'params'),
  async (req, res, next)=>{
    try {
      const { ordenId, userId } = req.params;
      const ordenes = await service.findTwo(ordenId, userId);
      res.json(ordenes)
    } catch (error) {
      next(error);
    }
});



router.post('/',
  validatorHandler(createOrdenSchema, 'body'),
  async (req, res, next)=>{
    try {
      const body = req.body;
      const newOrdenes = await service.create(body);
      res.status(201).json(newOrdenes);
    } catch (error) {
      next(error)
    }
})



router.patch('/:ordenId',
  validatorHandler(getOrdenSchema, 'params'),
  validatorHandler(updateOrdenSchema, 'body'),
  async (req, res, next)=>{
    try {
      const { ordenId } = req.params;
      const body = req.body;
      const ordenes = await service.updateTwo(ordenId, body);
      res.json(ordenes);
    } catch (error) {
      next(error)
    }
});



router.patch('/:ordenId/:userId',
  validatorHandler(getOrdenUSchema, 'params'),
  validatorHandler(updateOrdenUSchema, 'body'),
  async (req, res, next)=>{
    try {
      const { ordenId, userId } = req.params;
      const body = req.body;
      const ordenes = await service.updateThree(ordenId, userId, body);
      res.json(ordenes);
    } catch (error) {
      next(error)
    }
});




router.delete('/:ordenId', async (req, res, next)=>{
  try {
    const { ordenId } = req.params;
    const rta = await service.delete(ordenId);
    res.json(rta);
  } catch (error) {
    next(error)
  }
});

module.exports = router;
