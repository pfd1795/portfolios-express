import express from 'express';
import { renderHome } from '../controllers/home.controller.js';

const homeRouter = express.Router();

homeRouter.get('/', renderHome);

export default homeRouter;
