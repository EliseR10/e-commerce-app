/*Write a query to return the size of the table*/
SELECT pg_size_pretty(pg_table_size('sensors.observations')) as table_size; 

/*Write a query that returns the size of each indexes*/
SELECT pg_size_pretty(pg_total_relation_size('sensors.observations_pkey')) as index_1_size,
pg_size_pretty(pg_total_relation_size('sensors.observations_location_id_datetime_idx')) as index_2_size;

/*Returns the table's data, indexes and total relation size as three separate columns: 
Result: table_size: 1192 kB index_size: 1160 kB	total_size: 2352 kB*/
SELECT pg_size_pretty(pg_table_size('sensors.observations')) as table_size,
pg_size_pretty(pg_indexes_size('sensors.observations')) as index_size,
pg_size_pretty(pg_total_relation_size('sensors.observations')) as total_size;

/*Update the value of distance to feet*/
UPDATE sensors.observations
SET distance = (distance * 3.281)
WHERE TRUE;
/*This WHERE clause is a condition that is always true. It means that the UPDATE will apply to every row in the table sensors.observations, updating all rows without any filtering.*/

/*Check again the size and indexes of the table. They are much bigger now: table_size: 2344kB index_size: 2232 kB total_size: 4576 kB*/
SELECT pg_size_pretty(pg_table_size('sensors.observations')) as table_size,
pg_size_pretty(pg_indexes_size('sensors.observations')) as index_size,
pg_size_pretty(pg_total_relation_size('sensors.observations')) as total_size;

/*Run vacuum on this table*/
VACUUM sensors.observations;

/*Check for the effect/size changes 2352kB*/
SELECT pg_size_pretty(pg_table_size('sensors.observations')) as table_size;

/*Copy paste. This will add another 1000 rows to the table*/
\COPY sensors.observations (id, datetime, location_id, duration, distance, category) FROM './additional_obs_types.csv' WITH DELIMITER ',' CSV HEADER;

/*Check the size now after vacuum and updating. It is the same as we used the vacuumed row to update the table with the new data 2352kB*/
SELECT pg_size_pretty(pg_table_size('sensors.observations')) as table_size;

/*Use full vacuum to return any excess space*/
VACUUM FULL sensors.observations;

/*Check again the size. 1272kB*/
SELECT pg_size_pretty(pg_table_size('sensors.observations')) as table_size;

/*Write a query that delete all cameras at a location. Here the * is not required*/
DELETE FROM sensors.observations WHERE location_id > 24;

/*Check the size of the table's data. 1272kb*/
SELECT pg_size_pretty(pg_table_size('sensors.observations')) as table_size;

/*Use truncate to clear all values from the table*/
TRUNCATE sensors.observations;

/*Copy paste. This will load the values from the original and supplemental into the table*/
\COPY sensors.observations (id, datetime, location_id, duration, distance, category) FROM './original_obs_types.csv' WITH DELIMITER ',' CSV HEADER;

\COPY sensors.observations (id, datetime, location_id, duration, distance, category) FROM './additional_obs_types.csv' WITH DELIMITER ',' CSV HEADER;

/*Check again the size and indexes of the table. They are much bigger now: table_size: 1296kB index_size: 1296kB total_size: 2592kB*/
SELECT pg_size_pretty(pg_table_size('sensors.observations')) as table_size,
pg_size_pretty(pg_indexes_size('sensors.observations')) as index_size,
pg_size_pretty(pg_total_relation_size('sensors.observations')) as total_size;