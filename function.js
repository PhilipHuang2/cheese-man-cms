const mysql = require('mysql2');
// const table = require('console.table');

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: "password",
    database: "cheese_man_db"
    },
    console.log(`Connected to the cheese_man_db database.`)
);

function showDepartments(){
    db.query("Select name as department_name from department",(err,result)=>{
        if(err)
            console.log(err);
        else{

            console.table(result);
        }
    });
}

showDepartments();

module.exports = {showDepartments};
