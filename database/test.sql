select title as job_title, role.id as role_id, department.name as department, salary from role inner join department on role.department_id = department.id;