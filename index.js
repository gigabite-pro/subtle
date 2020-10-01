const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts');
const port = 3000
const mongoose = require('mongoose');
const session = require('express-session');

require('dotenv').config()

const db = process.env.DB_URL;

mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));

app.get('/', (req,res) => {
    res.render('home')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })