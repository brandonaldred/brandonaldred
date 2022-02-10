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
const User = require('./models/user');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const bcrypt = require('bcrypt');

const expressSession = require('express-session');
app.use(expressSession({ secret: 'keyboard cat' }));

const customMiddleWare = (req,res,next) => {
    console.log('custom middleware called');
    next();
}

global.loggedIn = false;
app.use('*', (req, res, next) => {
    loggedIn = req.session.userId;
    next();
})


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
        const projects = await Project.find({  });
        res.render('index', {
            projects, months
        });
    });

    app.get('/:type', async (req, res) => {
        const projects = await Project.find({
            type: req.params.type
        });
        res.render('index', { projects, months })
    });

    app.get('/compose/write', (req,res) => {
        let login = false;
        if (req.session.userId) {
            res.render('writePost');
        } else {
            res.redirect('/users/login');
        }
    });

    app.post('/compose/store',(req,res) => {
        Project.create(req.body, (error, project) => {
            res.redirect('/');
        })
    });

    app.get('/project/:id', async (req,res) => {
        const project = await Project.findById(req.params.id);
        console.log(req.session);
        res.render('project', { project, months });
    });

    app.get('/users/register', async (req, res) => {
        res.render('register');
    });

    app.post('/users/register', (req, res) => {
        User.create(req.body, (error, user) => {
            if (error) {return res.redirect('/users/register'); }
            res.redirect('/');
        })
    });

    app.get('/users/login', async (req, res) => {
       res.render('login'); 
    });

    app.post('/users/login', (req, res) => {
        const { username, password } = req.body;

        User.findOne({ username: username}, (error, user) => {
            if(user) {
                bcrypt.compare(password, user.password, (error, same) => {
                    if(same) {
                        req.session.userId = user._id;
                        res.redirect('/');
                    }
                    else { res.redirect('/users/login'); }
                });
            }
        })
    });
    
});
