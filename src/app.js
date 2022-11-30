const express = require('express');
require('express-async-errors');

const { loginRoute, userRoute } = require('./routes');
const { errorHandling } = require('./middlewares');

const app = express();

app.use(express.json());

app.use('/login', loginRoute);
app.use('/user', userRoute);

app.use(errorHandling);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
