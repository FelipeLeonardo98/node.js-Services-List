// Settings 
const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
// ORM Sequelize Settings
const Job = require('./models/Job');
const sequelize = require('./models/dbConnection');
const Usuario = require('./models/Usuario');
// Route setting
const admin = require('./routes/admin');
// Extension for date/timezone (for table Job)
const moment = require('moment');

//Template Engine Settings: Handlebars
app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    helpers:
    {
        formatDate: (date) => {
            return moment(date).format('DD/MM/YYYY');
        }
    }
}));
app.set('view engine', 'handlebars');
//Body-Parser Settings
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Public
app.use(express.static(path.join(__dirname, 'public')));

//Admin Route
app.use('/admin', admin);

// Routes
app.get('/', (req, res) => {
    res.render('login');
})

app.post('/login', async (req, res) => {
    // var inUsername = req.body.username;
    // var inPassword = req.body.password;
    const { username, password } = req.body;
    //put inputs into vars
    var errors = [];

    const userLogin = await Usuario.findOne({ where: { NM_LOGIN: username, CD_PASSWORD: password } });
    if (userLogin === null) {
        console.log('"Hold on! Username or password are wrongs..."');
        errors.push({ message: "Hold on! Username or password are wrongs..." });
        res.render('login', { errors: errors });
        //render for give parameters to view login
    } else if (userLogin.NM_LOGIN === userLogin.NM_LOGIN && userLogin.CD_PASSWORD === 'passadmin') {
        console.log(userLogin instanceof Usuario); // true
        res.redirect('/admin');
    } else if (userLogin.NM_LOGIN === 'Ireis' && userLogin.CD_PASSWORD === 'passpadrao') {
        console.log(userLogin instanceof Usuario); // true
        res.redirect('/list');
    }
})

app.get("/list", (req, res) => {
    Job.findAll({ order: [['id', 'DESC']] }).then(function (jobs) {
        const context = {
            jobsContext: jobs.map(job => {
                return {
                    id: job.id,
                    Job: job.Job,
                    Describe: job.Describe,
                    Value: job.Value,
                    createdAt: job.createdAt
                };
            })
        };
        res.render('home', { jobs: context.jobsContext });
    }).catch((fail) => {
        res.send("Sorry, we asked apologizes, by error " + fail);
    })
})


// Creating server
const DOOR = 8081;
app.listen(DOOR, () => {
    console.log("Server is running on " + DOOR + " door ");
})

app.get("/", (req, res) => {
    res.send("Server is running on " + DOOR + " door");
})




/*
app.post('/admin/added', function (req, res) {
    var messageRegister = [];
    Job.create({
        Job: req.body.registerJob,
        Describe: req.body.registerDescribe,
        Value: req.body.registerValue
    }).then(function () {
        messageRegister.push({ message: "Post registered with successfully!" });
        res.render('./admin/register', { messageRegister: messageRegister });
    }).catch(function (fail) {
        messageRegister.push({ message: "Ops, a fail has been ocurred... " + fail });
        res.render('./admin/register', { messageRegister: messageRegister });
    })
}) */

// Tests made with route /login
/*
app.post('/login', (req, res) => {
    var inUsername = req.body.username;
    var inPassword = req.body.password;
    //put inputs into vars
    var errors = [];
    if (inUsername == "felipe" && inPassword == "admin") {
        res.redirect('/admin');
    } else if (inUsername == "izabeli" && inPassword == "padrao") {
        res.redirect('/list');
    } else {
        errors.push({ message: "Hold on! Username or password are wrongs..." });
        res.render('login', { errors: errors });
        //render for give parameters to view login
    }


}) */