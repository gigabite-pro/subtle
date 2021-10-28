const express = require('express');
const app = express();
const mongoose = require('mongoose')
const shortid = require('shortid')
const path = require('path');
const ShortUrls = require('./models/shorturls')
require('dotenv').config();

const PORT = process.env.PORT || 8000;


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req,res) => {
    res.render('home')
})

let mainId = "";
let mainUrl = "";
app.get("/link", async (req,res)=>{
    res.render('link.ejs', {shorturls : mainId, url: mainUrl})
    mainId = "";
    mainUrl = "";
})

app.post("/shortUrls", async(req,res)=>{
    let id = await shortid.generate()
    mainId = id
    mainUrl = req.body.fullurl
    await ShortUrls.create({
        full : mainUrl,
        short: id,
    });
    res.redirect("/link")
})

app.get('/:shortUrl', async(req,res)=>{
    const shortUrl = await ShortUrls.findOne({short: req.params.shortUrl})
    if(shortUrl == null) return res.sendStatus(404)

    shortUrl.save();

    res.redirect(shortUrl.full)
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })