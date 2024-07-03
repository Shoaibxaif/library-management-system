const methodOverride = require('method-override');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes');

const app = express();
app.use(express.static('public'));

// Middleware to handle method override
app.use(methodOverride('_method'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Set the directory where your views are located
app.set('views', path.join(__dirname, 'views'));

// Use the routes
app.use('/api', routes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}/api/`);
});
