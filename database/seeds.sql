INSERT INTO department(name)
VALUES
("Cheese"),
("Curding"),
("Processing");

INSERT INTO role(department_id, title, salary)
VALUES
(1, "Master of Cheese", 10000),
(1, "Cheese Graterer", 4500),
(1, "Cow Whisperer", 5000),
(2, "THE BIG ONE", 8000),
(2, "Spooker", 4700),
(3, "Master Lineman", 7000),
(3, "One of many hands", 3000),
(3, "Yes Man", 1000);

INSERT INTO employee(role_id, manager_id, first_name, last_name)
VALUES
(1,null, "Paul", "Jackson"),
(4,null, "Jefferson", "Jefferson"),
(6,null, "Hilde", "Maponos"),
(2,1, "Indrani", "Gessica"),
(2,1, "Lyuben", "Faisal"),
(3,1, "Rina", "Darragh"),
(3,1, "Mellony", "Aloysius"),
(3,1, "Debbi", "Caoilfhionn"),
(5,2, "Logan", "Emmanuel"),
(5,2, "Pearle", "Clemens"),
(7,3, "Gladwin", "Filip"),
(7,3, "Kenae", "Ida"),
(8,3, "Turlough", "Caprice"),
(8,3, "Finn", "Doireann");

 

