const express = require('express');
const app = new express();

const path = require('path');
app.use(express.static('public'));

const ejs = require('ejs');
app.set('view engine', 'ejs');

app.listen(3000, () => {
    console.log('running');

    app.get('/', (req, res) => {
        res.render('index');
        console.log(fetch('http://192.168.50.157:4000/api/thoughts/')
        .then(response => response.json()));
    })
    
});
