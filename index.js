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
        choices: choices,
        loop: true
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

async function showEmployees(db){
    const employee = await db.execute(`select employee_info.first_name, 
    employee_info.last_name, 
    employee_info.job_title, 
    employee_info.department, 
    employee_info.salary, 
    manager.first_name as manager_first_name, 
    manager.last_name as manager_last_name 
    FROM 
    (select employee.id as employee_id, 
            employee.first_name, 
            employee.last_name, 
            role.title as job_title, 
            department.name as department, 
            role.salary,
            employee.manager_id
    FROM employee 
    left join ( role, department) 
    ON (role.id = employee.role_id AND role.department_id = department.id))as employee_info 
    Left JOIN employee AS manager 
    ON employee_info.manager_id = manager.id`)
    console.table(employee[0]);
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
            case "View all Employees":
                await showEmployees(db);
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