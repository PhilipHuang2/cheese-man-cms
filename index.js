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

async function showDepartments(){
    const db = await mysql.createConnection(
        {
            host:'localhost',
            user:'root',
            database:'cheese_man_db',
            Promise:bluebird
        }
    );
    await db.query("Select name as department_name from department",(err,result)=>{
        if(err)
            console.log(err);
        else{
            console.log("went into the promise");
            console.table(result);
        }
    });
}

function main(){
    inquirer
    .prompt(mainMenu)
    .then((answers)=>{
        // if the user selects quit then end the function
        if(answers.action == "Quit")
            return;
        else{
            console.log(`The user has selected the "${answers.action}" action.\n`);
            if(answers.action == "View all departments"){
                showDepartments();
            }
            main();
        }
    })

};


main();