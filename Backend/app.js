const express = require('express');
const db = require('./config/database');
const cors = require('cors');
const path = require('path')

// Test DB
db.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.log('Error: ' + err));

const app = express();

// Middleware
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())


// Routes
app.use('/properties', require('./routes/properties'));
app.use('/addresses', require('./routes/addresses'));

const PORT = 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
 