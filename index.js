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

async function addDepartment(db){
    const {department} = await inquirer.prompt({
        name:"department",
        message:"Please add a new department.",
    });
    await db.execute(`INSERT INTO department(name) VALUES("${department}")`);
}

async function addRole(db){
    const data = await db.execute("SELECT * from department");
    const departments = data[0].map((element)=>element.name);
    const {name,salary, department } = await inquirer.prompt([{
        name:"name",
        message:"Please add a new role"
        },
        {
            name:"salary",
            type: "input",
            message: "please enter the salary this role has",
            validate(answer){
                if(isNaN(answer))
                    return "This is not a valid salary";
                return true;
            }
        },
        {
            name: "department",
            type: "list",
            choices: departments,
            message: "Please choose the department this role belongs to.",
            filter(answer){
                for(let i = 0; i < data[0].length;i++)
                {
                    if(data[0][i].name == answer)
                        return data[0][i].id;
                }
            }
        }]);
    db.execute(`INSERT INTO ROLE(department_id, title, salary) VALUES("${department}","${name}","${salary}")`);
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
            case "Add a department":
                await addDepartment(db);
                break;
            case "Add a role":
                await addRole(db);
                break;
            case "Add an employee":
                break;
            case "Update an employee role":
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