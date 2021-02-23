import express, { Request } from 'express';
import path from 'path';
import { createHash } from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Joi from 'joi';

import isAuthenticatedMiddleware from './isAuthenticatedMiddleware';

require('dotenv').config();

const server = express();

server.use(express.json());

server.use('/file', express.static(path.resolve('.', 'tmp', 'teste.txt')));
server.post('/hash', (request, response) => {
  try {
    const { myString } = request.body;
    const hash = createHash('sha256').update(myString).digest('base64');
    //  const hashBcrypt = await bcrypt.hash(myString, 10);
    return response.json({ myString, hash });
  } catch (err) {
    return response.status(500).json({ message: 'Internal error', debug: err.message });
  }
});
server.post('/auth/signin', async (request, response) => {
  const { username, password } = request.body;
  const credentials = { username, password };

  const schema = Joi.object({
    username: Joi.string()
      .alphanum()
      .required(),
    password: Joi.string()
      .required(),
  });

  try {
    await schema.validateAsync(credentials, {
      abortEarly: false,
    });
  } catch (err) {
    return response.status(400).json({ message: 'Validation failed', validation: err.message });
  }

  const validCredentials = {
    username: 'admin',
    password: '$2b$10$cPnuQfrgJn8S44ctGhz5yOZI8FSL5NwXkpe8qCmUx/M5x9SBTxdFy', // 123 bcrypt
  };

  if (username !== validCredentials.username) {
    return response.status(500).json({ message: 'Username not found' });
  }

  const isValidPassword = await bcrypt.compare(password, validCredentials.password);

  if (!isValidPassword) {
    return response.status(400).json({ message: 'Invalid password' });
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    return response.status(500).json({ message: 'Internal error. JWT secret not defined' });
  }

  const token = jwt.sign({ username }, jwtSecret, {
    expiresIn: '7d',
  });

  return response.json({
    type: 'Bearer',
    token,
  });
});

server.use(isAuthenticatedMiddleware);

server.get('/protected', (request, response) => {
  const { username: autenticatedUser } = request;
  response.json({
    autenticatedUser,
  });
});

server.listen(3333, () => console.log('Iniciado na porta 3333'));
