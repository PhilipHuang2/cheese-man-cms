// Inquirer Selection
// view all departments
/**
 * similar to a get request
 * MUST USE PROMISES
 * Select * from department
 */
// view all roles
/**
 * Simlar to get request
 * MUST USE PROMISES
 * SELECT role.title, role.id, department.name, role.salary from role innner join department ON department.id = role.id
 */
// view all employees
/**
 * similar to a get request
 * MUST USE Promises
 * Select employee.id, employee.first_name, employee.last_name,
 * role.title, department.name, department.salary, MANAGER 
 * from employee inner join role inner join department
 * 
 * this select uses two inner joins
 * MANAGER is from manger_id which is a reference to another row in employee
 */
// add a department
/**
 * INSERT into DEPARTMENT (name) 
 * VALUES (inputName)
 * DEPARTMENT.id is an autoincrement primary key field
 */
// add a role
/**
 * INSERT into ROLE (name, salary, department)
 * VALUES(inputName, inputSalary,inputDepartment)
 * name = text, salary = number
 * department should be pulled from the datbase
 * select name from department or something
 */
// add an employee
/**
 * INSERT into EMPLOYEE (first_name, last_name, role, manager)
 * first and last name are inserted by user
 * should use inserted data from database
 * for role and manager
 * for manager you can choose empty or any of the current employee
 */
// update an employee role
/**
 * UPDATE EMPLOYEE SET ROLE = newRole
 * WHERE id = selectedEmployee
 * once again select a employee for a checkList
 *  role is a blind checklist from ROLES
 * id can be from a names given a
 * select id, first,last from EMPLOYEE select
 */