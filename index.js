const express = require('express');
const app = new express();

const path = require('path');
app.use(express.static('public'));

const ejs = require('ejs');
app.set('view engine', 'ejs');

const mongoose = require('mongoose');
const Project = require('./models/project');
mongoose.connect('mongodb://localhost/brandonaldred', { useNewUrlParser: true });

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

app.listen(3000, () => {
    console.log('running');

    app.get('/', async (req, res) => {
        const projects = await Project.find({ });
        res.render('index', {
            projects, months
        });
    });

    app.get('/compose', (req,res) => {
        res.render('writePost');
    });

    app.post('/compose/store',(req,res) => {
        Project.create(req.body, (error, project) => {
            res.redirect('/');
        })
    });
    
});
