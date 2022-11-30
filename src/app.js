const express = require('express');
require('express-async-errors');
const controllers = require('./controllers');
const { errorHandling, validateToken } = require('./middlewares');

const app = express();

app.use(express.json());

app.get('/user', validateToken, controllers.getUsers);

app.post('/login', controllers.login);
app.post('/user', controllers.createUser);

app.use(errorHandling);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
