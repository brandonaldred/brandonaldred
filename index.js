const express = require('express');
const app = new express();

const path = require('path');
app.use(express.static('public'));

const ejs = require('ejs');
app.set('view engine', 'ejs');

const mongoose = require('mongoose');
const Project = require('./models/project');
mongoose.connect('mongoDbURI', { useNewUrlParser: true });

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

let user = 0;
const toShow = 5;

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

let port = process.env.PORT;

app.listen(port, () => {
    console.log('running');

    app.get('/', async (req, res) => {
        const type = 'All';
        let p = req.query.p;
        let next = true;
        if(!p) { p = 1; }
        const list = await Project.find({ });
        const pages = Math.ceil(list.length / toShow);
        let display = [(list.length-1) - (p - 1) * toShow, list.length - p * toShow];
        if (p == pages ) { display[1] = 0; next = false; }
        let projects = [];
        for (let i = display[0]; i >= display[1]; i--) { projects.push(list[i]); }
        res.render('index', { projects, months, p, next, type });
    });

    app.get('/about', (req, res) => {
        res.render('about');
    });

    app.get('/:type', async (req, res) => {
        const type = req.params.type;
        let p = req.query.p;
        let next = true;
        if(!p) { p = 1; }
        console.log(type);
        const list = await Project.find({ type: type });
        const pages = Math.ceil(list.length / toShow);
        let display = [(list.length-1) - (p - 1) * toShow, list.length - p * toShow];
        if (p == pages ) { display[1] = 0; next = false; }
        let projects = [];
        for (let i = display[0]; i >= display[1]; i--) { projects.push(list[i]); }
        
        res.render('index', { projects, months, p, next, type })
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
        const type = req.params.id
        const project = await Project.findById(type);
        res.render('project', { project, months, type });
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
