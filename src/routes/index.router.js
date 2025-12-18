import express from 'express';

import gameRouter from './game.router.js';
import homeRouter from './home.router.js';

const indexRouter = express.Router();

indexRouter.use('/', homeRouter);

indexRouter.use('/home', homeRouter);

indexRouter.use('/game', gameRouter);

export default indexRouter;
