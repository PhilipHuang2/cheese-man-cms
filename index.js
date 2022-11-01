//Attack Plan
//Run main function
// Where it is a recursive loop
// where two things will happen
// either you select a function to go into
// or quit
// if you select a function
// a switch case
// will decide what subfunction to call
// if press quit
//the quit the function
//import modules
const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const bluebird = require('bluebird');
// const { showDepartments} = require('./function.js');



//outside array initialization for easier configuration and view
const choices = [
    "View all departments",
    "View all roles",
    "View all Employees",
    "Add a department",
    "Add a role",
    "Add an employee",
    "Update an employee role",
    "Quit"
];

const mainMenu =[
    {
        type: "list",
        name: "action",
        message: "What would you like to do",
        choices: choices
    }
];

async function showDepartments(db){
    const departments = await db.execute("Select id as department_id, name as department_name from department");
    // how the hell to access the data in  promise

    console.table(departments[0]);
}

async function showRoles(db){
    const departments = await db.execute("select title as job_title, role.id as role_id, department.name as department, salary from role inner join department on role.department_id = department.id");
    console.table(departments[0]);
}

async function main(){
    try {
        const {action} = await inquirer.prompt(mainMenu);
        if(action == "Quit")
            process.exit(0);

        const db = await mysql.createConnection(
            {
                host:'localhost',
                user:'root',
                password: "password",
                database:'cheese_man_db',
                Promise:bluebird
            }
        );
        console.log(`The user has selected the "${action}" action.\n`);
        switch(action){
            case "View all departments":
                await showDepartments(db);
                break;
            case "View all roles":
                await showRoles(db);
                break;
        }   
        db.end();
        main();

    } catch(err) {
        console.log("Ugh!")
        console.log(err);
    }
};


main();