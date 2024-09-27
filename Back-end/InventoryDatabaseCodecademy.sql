SELECT * FROM parts LIMIT 10;

/*alter the column so that each value inserted is unique and not empty*/
ALTER TABLE parts
ALTER COLUMN code SET NOT NULL;

ALTER TABLE parts
ADD UNIQUE (code);

/*The parts table is missing values in the description column. Alter the table so that all rows have a value for description.
This will ensure that all rows have a value for description*/
UPDATE parts
SET description = 'None Available'
WHERE description IS NULL;

/*Update each row with a different value*/
/*First, create a table that will store the descriptions*/
CREATE TABLE part_descriptions (
  id integer PRIMARY KEY,
  description text
);
/*Fill the intermediate table with the descriptions for empty rows in parts*/
INSERT INTO part_descriptions
VALUES 
  (1,'5V resistor'),
  (2, '3V resistor');

/*Update the values in the original table using an UPDATE statement while joining the original table with the table with descriptions*/
UPDATE parts
SET description = part_descriptions.description FROM part_descriptions
WHERE part_descriptions.id = parts.id
AND parts.description IS NULL;

/*add a constraint on parts to ensure that all values in description are filled and non-empty*/
ALTER TABLE parts
ALTER COLUMN description SET NOT NULL;

/*test your constraint*/
INSERT INTO parts (id, description, code, manufacturer_id)
VALUES (
  54,
  'New parts coming from New-York', 
  'V1-009',
  9
);

/*check that reorder_options are both not null*/
ALTER TABLE reorder_options
ALTER COLUMN price_usd SET NOT NULL;

ALTER TABLE reorder_options
ALTER COLUMN quantity SET NOT NULL;

/*ensure that price_usd and quanity are both positive by using one check only*/
ALTER TABLE reorder_options
ADD CHECK (price_usd > 0 AND quantity > 0);

/*add a constraint to limit price per unit to be within a range*/
ALTER TABLE reorder_options
ADD CHECK (price_usd/quantity > 0.02 AND price_usd/quantity < 25);

/*Form a relationship between parts and reorder_options*/
ALTER TABLE parts
ADD PRIMARY KEY (id);

ALTER TABLE reorder_options
ADD FOREIGN KEY (part_id)
REFERENCES parts (id);

SELECT constraint_name, table_name, column_name
FROM information_schema.key_column_usage
WHERE table_name = 'reorder_options';

/*ensure that quantity in location's table is greater than 0'*/
ALTER TABLE locations
ADD CHECK (qty > 0);

/*Ensure that only one row is inserted for each combination - no duplicate */
ALTER TABLE locations
ADD UNIQUE (part_id, location);

/*ensure that only valid parts are entered into locations*/
ALTER TABLE locations
ADD FOREIGN KEY (part_id) REFERENCES parts (id); 

/*ensure all parts in parts have a valid manufacturer. Forms a relationship between parts and manufacturers*/
ALTER TABLE parts
ADD FOREIGN KEY (manufacturer_id) REFERENCES manufacturers (id);

/*create a new manufacturer*/
INSERT INTO manufacturers
VALUES (
  11,
  'Pip-NNC Industrial'
);

/*update the manufacturer in parts*/
UPDATE parts
SET manufacturer_id = 11
WHERE manufacturer_id = 1 or manufacturer_id = 2;
/*id of the manufacturers that you want to udpate*/

SELECT * from manufacturers;