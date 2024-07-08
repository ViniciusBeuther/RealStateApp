const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");

// Database
const db = require("./config/database");

// test DB
db.authenticate()
.then(() => console.log("Database connected"))
.catch(err => console.log("Error: " + err))

const app = express();

app.get('/', (req, res) => res.send("INDEX"));

// Property routes
app.use('/properties', require('./routes/properties'));

// Address routes
app.use('/addresses', require('./routes/addresses'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port: ${PORT}`));