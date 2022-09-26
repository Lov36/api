const Joi = require('joi');

const ordenId = Joi.string().uuid();
const userId = Joi.string().uuid();
const number = Joi.number().integer().min(1);
const name = Joi.string().min(5).max(50);

const createOrdenSchema = Joi.object({
  number: number.required(),
  name: name.required(),
});

const updateOrdenSchema = Joi.object({
  number: number,
  name: name
});

const updateOrdenUSchema = Joi.object({
  number: number,
  name: name
});

const getOrdenSchema = Joi.object({
  ordenId: ordenId.required(),
});

const getOrdenUSchema = Joi.object({
  ordenId: ordenId.required(),
  userId: userId.required()
});



module.exports = { createOrdenSchema, updateOrdenSchema, updateOrdenUSchema, getOrdenSchema, getOrdenUSchema }
