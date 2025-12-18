import createError from 'http-errors';
import express from 'express';
import path from 'path';

import indexRouter from './routes/index.router.js';
import applyMiddlewares from './middlewares.js';

const app = express();

/* view engine setup */

app.set('views', path.join(path.resolve(), 'src/views'));
app.set('view engine', 'ejs');

/* middlewares */

applyMiddlewares(app);

/* routes */

app.use('/', indexRouter);

/* catch 404 and forward to error handler */

app.use((req, res, next) => next(createError(404)));

/* error handler */

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
