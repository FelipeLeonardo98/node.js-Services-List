//getting all configurations of access to const db
const db = require('./dbConnection');

//Testing connection
db.sequelize.authenticate().then(() => {
    console.log("Database was connected with sucess!")
}).catch((fail) => {
    console.log("Attempt of connection with database failed, because: " + fail)
})

// Creating model (table): "Jobs"
const Usuario = db.sequelize.define('Usuarios', {
    NM_LOGIN:
    {
        type: db.Sequelize.STRING
    },
    CD_PASSWORD:
    {
        type: db.Sequelize.STRING
    }
})

// For create table into mySQL database
//Usuario.sync({ force: true });

// export for use outside
module.exports = Usuario;

