drop table if exists item;
create table item (
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