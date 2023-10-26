drop table if exists item;

create TABLE IF NOT exists item (
	id uuid PRIMARY KEY default gen_random_uuid(),
	title text,
	conditionID uuid,
	categoryID uuid,
	images text[],
	latitude float,
	longitude float,
	userID uuid,
	description text,
	price integer default 0,
	createdDate timestamp default NOW()
);

create TABLE IF NOT exists item (
	id uuid PRIMARY KEY default gen_random_uuid(),
	title text,
	conditionID uuid,
	categoryID uuid,
	images text[],
	latitude float,
	longitude float,
	userID uuid,
	description text,
	price integer default 0,
	createdDate timestamp default NOW()
);

drop table if exists "user";
create table if not exists "user" (
	id uuid PRIMARY KEY default gen_random_uuid(),
	firstName text,
	lastName text,
	username text,
	email text,
	passwordHash text,
	createdDate timestamp default NOW()
)

drop table if exists "category"
create table if not exists category (
	id uuid primary key default gen_random_uuid(),
	categoryName text,
	parentCategoryName text,
	categoryLevel int
)
