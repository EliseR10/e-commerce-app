SELECT * FROM customers LIMIT 10;
SELECT * FROM orders LIMIT 10;
SELECT * FROM books LIMIT 10;

/*Check your indexes*/
SELECT * FROM pg_Indexes WHERE tablename = 'customers';
SELECT * FROM pg_Indexes WHERE tablename = 'orders';
SELECT * FROM pg_Indexes WHERE tablename = 'books';

/*Analyze without an index 
Planning time: 0.021 ms // Execution time: 13.089 ms*/
EXPLAIN ANALYZE SELECT * FROM orders WHERE quantity > 18;

/*Build an index to improve search time*/
CREATE INDEX orders_quantity_idx ON orders (quantity);

/*Analyze again to check if it is quicker or not
Planning time: 0.153 ms // Execution time: 4.662 ms*/
EXPLAIN ANALYZE SELECT * FROM orders WHERE quantity > 18;

/*Create a primary key and automatically an index*/
  /*analyze first*/
EXPLAIN ANALYZE SELECT * FROM customers WHERE customer_id < 100;

  /*create the primary key*/
ALTER TABLE customers
ADD CONSTRAINT customers_pkey
PRIMARY KEY (customer_id);

  /*analyze again*/
EXPLAIN ANALYZE SELECT * FROM customers WHERE customer_id < 100;

/*Put in order the customer_id*/
CLUSTER customers USING customers_pkey;
  /*verify your work*/
SELECT * FROM customers LIMIT 10;

/*Build a multicolumn index*/
CREATE INDEX customer_id_book_id_idx ON orders (customer_id, book_id);
  /*checking my work*/
SELECT * FROM pg_Indexes WHERE tablename = 'orders';

/*Drop your previous index and recreate it with quantity*/
DROP INDEX IF EXISTS customer_id_book_id_idx;
EXPLAIN ANALYZE SELECT * FROM customers WHERE customer_id < 100;
CREATE INDEX customer_id_book_id_quantity_idx ON orders (customer_id, book_id, quantity);
EXPLAIN ANALYZE SELECT * FROM customers WHERE customer_id < 100;

/*Create a multicolumn with author and title in the book table*/
EXPLAIN ANALYZE SELECT * FROM books WHERE author = 'Rohl Dalh';
CREATE INDEX title_author_idx ON books (title, author);
EXPLAIN ANALYZE SELECT * FROM books WHERE author = 'Rohl Dalh';

EXPLAIN ANALYZE SELECT * FROM orders WHERE quantity * price_base >= 100;

/*create an index to make the query above quicker.
Here, you need double parentheses around the logic for PostgreSQL to know you want the results of the equation to be the index instead of the two distinct columns.*/
CREATE INDEX orders_total_price_idx ON orders ((quantity * price_base));

EXPLAIN ANALYZE SELECT * FROM orders WHERE quantity * price_base >= 100;

/*have a "report" of indexes you have in your file*/
SELECT *
FROM pg_indexes
WHERE tablename IN ('customers', 'books', 'orders')
ORDER BY tablename, indexname;