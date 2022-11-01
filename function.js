const mysql = require('mysql2/promise');
// const table = require('console.table');

var db = await mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: "password",
    database: "cheese_man_db"
    },
    console.log(`Connected to the cheese_man_db database.`)
);

async function showDepartments(db){
    await db.query("Select name as department_name from department",(err,result)=>{
        if(err)
            console.log(err);
        else{

            console.table(result);
        }
    });
}

showDepartments();

module.exports = { showDepartments};
