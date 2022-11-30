const express = require('express');
require('express-async-errors');
const { loginController, userController } = require('./controllers');
const { errorHandling, validateToken, validateLogin, validateUser } = require('./middlewares');

const app = express();

app.use(express.json());

app.get('/user', validateToken, userController.getUsers);
app.get('/user/:id', validateToken, userController.getUserById);

app.post('/login', validateLogin, loginController);
app.post('/user', validateUser, userController.createUser);

app.use(errorHandling);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
