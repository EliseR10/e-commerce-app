ALTER TABLE order_items
DROP CONSTRAINT order_items_orders_id_fkey,
ADD CONSTRAINT order_items_orders_id_fkey FOREIGN KEY (orders_id) REFERENCES orders(id) ON DELETE CASCADE;