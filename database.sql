CREATE TABLE users (
	id serial primary key,
	first_name varchar(30) NOT NULL,
	last_name varchar(30) NOT NULL,
	employee_id number(5) NOT NULL,
	username varchar(40) NOT NULL,
	passwordHash binary(64) NOT NULL,
	-- salt --, Not sure if I need this?
	);
