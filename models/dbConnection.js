//Setting Sequelize
const Sequelize = require('sequelize');
// Object of  Database connection 
const sequelize = new Sequelize('db_nodeJobs', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

// export for use outside
module.exports =
{
    //Object of general ORM
    Sequelize: Sequelize,
    //Object of connection values
    sequelize: sequelize
}
