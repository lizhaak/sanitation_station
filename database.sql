CREATE TABLE users (
	id serial primary key,
	first_name varchar(30) NOT NULL,
	last_name varchar(30) NOT NULL,
	employee_id number(5) NOT NULL,
	username varchar(30) NOT NULL,
	passwordHash binary(64) NOT NULL,
	-- salt --, Not sure if I need this?
	status varchar(10),
);


	CREATE TABLE locations (
		id serial primary key,
		account_id numeric(10) NOT NULL,
		address varchar(50) NOT NULL,
		city varchar(20) NOT NULL,
		state varchar(2) NOT NULL,
		zip numeric(5) NOT NULL,
		icon varchar(30) NOT NULL,
		status varchar(10) NOT NULL
	);
