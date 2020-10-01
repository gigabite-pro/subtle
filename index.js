const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts');
const port = 3000

app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));


app.get('/', (req,res) => {
    res.render('home')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })