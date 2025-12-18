import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';

const __dirname = path.resolve();

export default app => {
  // app.use(logger('dev'));
  // Configuración de Logging con Morgan
  // 'dev': Coloreado y conciso (desarrollo)
  // 'combined': Estándar Apache, incluye User-Agent, IP, fecha (producción)
  const logFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
  app.use(logger(logFormat));

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
};
