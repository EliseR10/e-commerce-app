/*Create a table */
CREATE TABLE friends (
  id INTEGER,
  name TEXT,
  birthday DATE
);

/*Add data*/
INSERT INTO friends (id, name, birthday)
VALUES (1, 'Ororo Munroe', '1940-05-30');

INSERT INTO friends (id, name, birthday)
VALUES (2, 'Simone', '1990-01-26');
/*If you put the value one below the others, it works but it doesn't put the titles of columns on each name'*/
INSERT INTO friends (id, name, birthday)
VALUES (3, 'Gill', '1969-04-21');

/*Make sure the data has been added*/
SELECT * FROM friends;

/*Update one of the friend's name*/
UPDATE friends
SET name = 'Storm'
WHERE id = 1;

/*Add a new column named email*/
ALTER TABLE friends
ADD COLUMN email TEXT;

/*update data for the email columns*/
UPDATE friends
SET email = 'storm@codecademy.com'
WHERE id = 1;

UPDATE friends
SET email = 'simone.houghton@example.com'
WHERE id = 2;

UPDATE friends
SET email = 'gill.mchanon@example.com'
WHERE id = 3;

SELECT * FROM friends;

/*remove Storm from the list*/
DELETE FROM friends
WHERE id = 1;

SELECT * FROM friends;