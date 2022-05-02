//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Requirements~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

// const db = require('./db.js');

const app = express();
mongoose.connect('mongodb://localhost:27017/webResume');

//Use the route '/' in order to call use the public folder with any path that begins with /
app.use('/', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Variable declarations~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`

const portID = 3000;

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Schema declarations~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`

const year = new Date().getFullYear();

const quoteSchema = new mongoose.Schema({
    author: { type: String, required: true },
    content: { type: String, required: true },
    cite: { type: String, required: false }
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Model declarations~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`


const Quote = mongoose.model('Quote', quoteSchema);



//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Routing~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`

app.route("/")
    .get(function(req, res) {
        let ranQuote = "";
        Quote.find({}, function(err, foundObj) {
            if (err) {
                console.log(err);
            } else {
                let ran = Math.random();
                let index = Math.floor(ran * foundObj.length);
                ranQuote = foundObj[index];

                res.render('home', {
                    page: "home",
                    curYear: year,
                    quoteContent: ranQuote.content,
                    quoteAuthor: ranQuote.author,
                    quoteCite: ranQuote.cite,
                });
            }
        })
    })

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~app.listen~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`


app.listen(portID, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Server running on port " + portID);
    }
})