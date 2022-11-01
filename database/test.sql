select title as job_title, role.id as role_id, department.name as department, salary from role inner join department on role.department_id = department.id;


select title as job_title, department.name as department, salary from role inner join department on role.department_id = department.id;

-- only case where employee returns given results
select employee.id as employee_id, employee.first_name, employee.last_name, managers.first_name as manager_first_name, managers.last_name as manager_last_name from employee left join employee as managers on managers.id = employee.manager_id;

select * from employee;

-- Doesn't allow for The managers to have a Department and Salary and Job Title
select employee.id as employee_id, 
        employee.first_name, 
        employee.last_name, 
        role.title as job_title, 
        department.name as department, 
        role.salary,
        managers.first_name as manager_first_name,
        managers.last_name as manager_last_name 
FROM employee 
left join ( role, department, employee as managers) 
ON (role.id = employee.role_id AND role.department_id = department.id AND managers.id = employee.manager_id);

-- removed the manager join
select employee.id as employee_id, 
        employee.first_name, 
        employee.last_name, 
        role.title as job_title, 
        department.name as department, 
        role.salary
FROM employee 
left join ( role, department) 
ON (role.id = employee.role_id AND role.department_id = department.id);

-- SHOW ALL EMPLOYEE SQL Call
select employee_info.first_name, 
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
ON employee_info.manager_id = manager.id;