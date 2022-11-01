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
const {showDepartments} = require('./function.js');


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

const main = () => {
    inquirer
    .prompt(mainMenu)
    .then((answers)=>{
        // if the user selects quit then end the function
        if(answers.action == "Quit")
            return;
        else{
            console.log(`The user has selected the "${answers.action}" action.`);
            if(answers.action == "View all departments"){
                showDepartments();
            }
            main();
        }
    })

};


main();