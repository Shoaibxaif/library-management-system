const express = require('express');
const app = express();
const db = require('./db'); 
const apiRoutes = require('./routes'); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use('/api', apiRoutes);


app.listen(5000, () => {
  console.log(`Server is running on port http://localhost:5000/api`);
});
