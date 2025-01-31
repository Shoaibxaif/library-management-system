const express = require('express');
const app = express();
const db = require('./db'); 
const apiRoutes = require('./routes'); 
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use('/api', apiRoutes);

const port = process.env.PORT || 3000;
app.listen(port,
console.log(`http://localhost:${port}/api/`)
);
