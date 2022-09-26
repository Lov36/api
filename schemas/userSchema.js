const Joi = require('joi');

const usersId = Joi.string().uuid();
const name = Joi.string().min(5).max(50);
const email = Joi.string().email({minDomainSegments: 2, tlds: { allow: ['com', 'net']}});
const password = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(5).max(25);


const createUserSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
});

const updateUserSchema = Joi.object({
  name: name,
  email: email,
  password: password,
});

const getUserSchema = Joi.object({
  usersId: usersId.required(),
});


module.exports = { createUserSchema, updateUserSchema, getUserSchema };
