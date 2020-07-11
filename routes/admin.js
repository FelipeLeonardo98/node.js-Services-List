// Settings
const express = require('express');
// For creat an object router
const router = express.Router();
// Objects ORM
const Job = require('../models/Job');
//const sequelize = require('./models/dbConnection');
// body-parser
const bodyParser = require('body-parser');




router.get('/', (req, res) => {
    Job.findAll({ order: [['id', 'DESC']] }).then(function (jobs) {
        // Filtrando os dados antes de mandar para View
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
        // console.log(context)
        res.render("./admin/home", { jobs: context.jobsContext });
    }).catch((fail) => {
        res.send("Sorry, we asked apologizes, by error: " + fail);
    })

})

router.get('/register', (req, res) => {
    res.render('./admin/register')
})

router.post('/added', (req, res) => {
    var messageRegister = [];
    Job.create({
        Job: req.body.registerJob,
        Describe: req.body.registerDescribe,
        Value: req.body.registerValue
    }).then(function () {
        messageRegister.push({ message: "Job registered with successfully!" });
        res.render('../views/admin/register', { messageRegister: messageRegister });
    }).catch(function (fail) {
        messageRegister.push({ message: "Ops, a fail has been ocurred... " + fail });
        res.render('../views/admin/register', { messageRegister: messageRegister });
    })
})
router.get('/update/:id', async (req, res) => {
    // res.render('./admin/formUpdate', { id: req.params.id });
    const selectedJob = await Job.findOne({ where: { id: req.params.id } });
    // Filtrando os dados antes de mandar para View
    //res.json(selectedJob);
    res.render("./admin/formUpdate", { id: selectedJob.id, job: selectedJob.Job, describe: selectedJob.Describe, value: selectedJob.Value });
    //console.log(selectedJob);
})

router.post('/updatingSuccess', (req, res) => {
    var messageUpdate = [];

    Job.update(
        {
            Job: req.body.updateJob,
            Describe: req.body.updateDescribe,
            Value: req.body.updateValue
        },
        { where: { 'id': req.body.updateCode } }).then(function () {
            messageUpdate.push({
                message: "Job updated with success!"
            });
            res.render('../views/admin/formUpdate', { messageUpdate });
        }).catch(function (fail) {
            messageUpdate.push({ message: "We asked apologizes, by error: " + fail });
            res.render('../views/admin/formUpdate', { messageUpdate })
        })
    //  res.send(" " + req.body.updateCode + " " + req.body.updateJob + " " + req.body.updateDescribe + " " + req.body.updateValue);

})



router.get('/deleted/:id', (req, res) => {
    Job.destroy({ where: { 'id': req.params.id } }).then(() => {
        res.redirect('/admin/');
    }).catch((fail) => {
        res.send("Warning! Not was possible to delete the job with id: "
            + req.params.id + " because: " + fail);
    })
    // res.send(req.params.id);
})



module.exports = router;
