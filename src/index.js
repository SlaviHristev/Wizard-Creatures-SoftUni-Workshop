const express = require('express');
const port = 5000;

const expressConfig = require('./config/expressConfig');
const handlebarsConfig = require('./config/handlebarsConfig');
const dbConfig = require('./config/dbConfig');

const routes = require('./routes');

const app = express();
dbConfig()
.then(console.log('Db connected succesfully...'))

expressConfig(app);
handlebarsConfig(app);
app.use(routes)

app.listen(port, () => console.log('Server is running and listening on port 5000...'));

