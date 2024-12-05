ALTER TABLE orders
ADD CONSTRAINT orders_customers_id_fkey
FOREIGN KEY (customers_id) REFERENCES account(customers_id)
ON DELETE CASCADE;
