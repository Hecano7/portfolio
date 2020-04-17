var PORT = process.env.PORT || 5000;
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const axios = require('axios');

app.listen(PORT, () => {
    console.log("listening at http://localhost:8080")
});
app.use(express.static('Public'));

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.set('views' , './views');

app.set('view engine' , 'ejs');

app.get('/',(req, res) => {
    res.sendFile('index.html', {root: __dirname })
});

app.get('/contact', (req, res) => {
res.render('contact');
});

app.post('/thanks', (req, res) => {
res.render('thanks', { contact: req.body })
});


