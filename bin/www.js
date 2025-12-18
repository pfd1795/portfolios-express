/* Module dependencies. */

import http from 'http';
import dotenv from 'dotenv';
import debugLib from 'debug';
import app from '../src/app.js';
import { normalizePort, onError, onListening } from './server-utils.js';
import { conectarBBDD } from "./db.config.js";

dotenv.config();
const debug = debugLib('portfolios-express:server');

/* Get port from environment and store in Express. */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/* Create HTTP server. */

const server = http.createServer(app);

/* Connect DB and start server */

conectarBBDD().then(() => {
  /* Listen on provided port, on all network interfaces. */
  server.listen(port);
  server.on('error', error => onError(error, port));
  server.on('listening', () => onListening(server, debug));
});

/* Graceful shutdown. */

process.on('SIGINT', () => {
  console.log('Cerrando servidor...');
  server.close(() => process.exit(0));
});

process.on('SIGTERM', () => {
  console.log('Servidor detenido por señal SIGTERM');
  server.close(() => process.exit(0));
});
