const {Sequelize} = require('sequelize');


const sequelize = new Sequelize("nodesql", "root", "", {
    host: "localhost",
    dialect: "mysql"
});

sequelize.authenticate().then(() => {
    console.log("Database sudah tersambung");
}).catch((error) => {
    console.log(`Gagal terhubung ke database, error: ${error}`)
});

module.exports = {
    sequelize
}