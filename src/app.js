const express = require('express');
require('express-async-errors');
const controllers = require('./controllers');
const errorHandling = require('./middlewares/errorHandling');

const app = express();

app.use(express.json());

app.post('/login', controllers.login);

app.use(errorHandling);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
