const express = require('express');
const app = express();
const db = require('./src/db'); 
const apiRoutes = require('./src/routes'); 
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use('/api', apiRoutes);

const port = process.env.PORT;
app.listen(port,
console.log(`http://localhost:${port}/api`)
);
