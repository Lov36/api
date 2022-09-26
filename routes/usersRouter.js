const express = require('express');
const router = express.Router();

const UsersService = require('../services/usersService');
const service = new UsersService();

const validatorHandler = require('./../middlewares/validatorHandler');
const {createUserSchema, updateUserSchema, getUserSchema} = require('./../schemas/userSchema');

router.get('/', async (req, res, next)=>{
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:usersId',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next)=>{
    try {
      const { usersId } = req.params;
      const users = await service.findOne(usersId);
      res.json(users)
    } catch (error) {
      next(error);
    }
});




router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next)=>{
    try {
      const body = req.body;
      const newUsers = await service.create(body);
      res.status(201).json(newUsers);
    } catch (error) {
      next(error)
    }
})




router.patch('/:usersId',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res,next)=>{
    try {
      const { userId } = req.params;
      const body = req.body;
      const users = await service.update(userId, body);
      res.json(users);
    } catch (error) {
      next(error);
    }
});




router.delete('/:usersId', async (req, res, next)=>{
  try {
    const { usersId } = req.params;
    const rta = await service.delete(usersId);
    res.json(rta);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
