import express from 'express';

import usersRouter from './users.js';

const indexRouter = express.Router();

/* GET home page. */
indexRouter.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

indexRouter.use('/users', usersRouter);

export default indexRouter;
