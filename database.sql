CREATE TABLE users (
	id serial primary key,
	first_name varchar(30) NOT NULL,
	last_name varchar(30) NOT NULL,
	employee_id numeric(5) NOT NULL,
	username varchar(100) NOT NULL UNIQUE,
  password varchar(120) NOT NULL,
	user_type varchar(10)
);


CREATE TABLE locations (
	id serial primary key,
	account_id numeric(10) NOT NULL,
	address varchar(50) NOT NULL,
	city varchar(20) NOT NULL,
	state varchar(2) NOT NULL,
	zip numeric(5) NOT NULL,
	icon varchar(30) NOT NULL,
	latitude decimal(10,5),
	longitude decimal(10,5),
	status varchar(10) NOT NULL,
	route_id numeric(10),
	trash_status varchar(15),
	trashdisplaystatus varchar(20)
);


CREATE TABLE trashlog (
	id serial primary key,
	account_id numeric(10) NOT NULL,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	trash_status varchar(15)
);


/* this dumps the account_id and trash_status from the locations database to the trashlog database */
-- INSERT INTO trashlog (account_id, trash_status)
-- SELECT account_id, trash_status FROM locations
-- WHERE route_id = $1;
