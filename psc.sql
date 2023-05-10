create table users (
	id varchar(50) not null,
	username varchar(255),
	created_at timestamp default current_timestamp not null ,
	primary key (id)
);
create table messages (
	id varchar(50) not null,
	text text,
	opened boolean default false,
	created_at timestamp default current_timestamp not null,
	user_id varchar(50),
	primary key (id)
);