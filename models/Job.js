//getting all configurations of access to const db
const db = require('./dbConnection');

//Testing connection
db.sequelize.authenticate().then(() => {
    console.log("Database was connected with sucess!")
}).catch((fail) => {
    console.log("Attempt of connection with database failed, because: " + fail)
})

// Creating model (table): "Jobs"
const Job = db.sequelize.define('Jobs', {
    Job:
    {
        type: db.Sequelize.STRING
    },
    Describe:
    {
        type: db.Sequelize.STRING
    },
    Value:
    {
        type: db.Sequelize.DOUBLE
    }
})

// For create table into mySQL database
//Job.sync({ force: true });

// export for use outside
module.exports = Job;

