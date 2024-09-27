/*the database has only one superuser. Write a query that allows you to determine the name of that role.*/
SELECT rolname
FROM pg_roles
WHERE rolsuper = true;

/*what are the names of the other users in the database?*/
SELECT * FROM pg_roles;

/*Check the role that you're current using'*/
SELECT current_user;

/*create a login role without superuser permissions*/
CREATE ROLE abc_open_data WITH LOGIN;

/*Create a non-superuser group role and include members*/
CREATE ROLE publishers WITH NOLOGIN ROLE abc_open_data;

/*grant usage on this schema to publishers - you have to precise it is a schema, not a table*/
GRANT USAGE ON SCHEMA analytics TO publishers;

/*grant publishers the ability to select on all existing tables in analytics*/
GRANT SELECT ON ALL TABLES IN SCHEMA analytics TO publishers;

/*Check the PostgreSQL has recorded the changes to the schema permissions we just added*/
SELECT * FROM information_schema.table_privileges WHERE grantee = 'publishers';

/*set your role to a specific user to confirm that we have the ability to select on a table through inheritance from a group role*/
SET ROLE abc_open_data;
SELECT * FROM analytics.downloads limit 10;

SET role ccuser;

/*select from a table to see sample rows*/
SELECT * FROM directory.datasets LIMIT 5;

/*grant usage on this schema to publishers - you have to precise it is a schema, not a table*/
GRANT USAGE ON SCHEMA directory TO publishers;

/*grant publishers the ability to select on all columns of directory apart from one*/
GRANT SELECT (id, create_date, publisher, hosting_path, src_size) ON directory.datasets TO publishers;

/*test your granting code*/
SET ROLE abc_open_data;
SELECT id, publisher, hosting_path FROM directory.datasets;

SET role ccuser;

/*create and enable policy saying that the current_user must be the publisher of the dataset to select*/
CREATE POLICY emp_rls_policy ON analytics.downloads FOR SELECT TO publishers USING (publisher = current_user);

ALTER TABLE analytics.downloads ENABLE ROW LEVEL SECURITY;

SELECT * FROM analytics.downloads LIMIT 5;

SET ROLE abc_open_data;
SELECT * FROM analytics.downloads LIMIT 5;